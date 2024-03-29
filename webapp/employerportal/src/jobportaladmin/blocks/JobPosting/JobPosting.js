import React, {Component} from 'react';
import './JobPosting.css';
import 'react-phone-input-2/lib/style.css';
import $ from 'jquery';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PreviewModal from '../PreviewModal/PreviewModal.js';
import Axios from 'axios';
import Swal from 'sweetalert2';
import CKEditor from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import PhoneInput from 'react-phone-input-2';
import Moment from "moment";
import { WithContext as ReactTags } from 'react-tag-input';
import PlacesAutocomplete, {
        geocodeByAddress,
        getLatLng
} from "react-places-autocomplete";
import { connect }        from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../common/actions/index';

class JobPosting extends Component {

    constructor(props) {
        super(props);

        this.state = {
            jobTitle                    :   "",
            industryList                :   [],
            functionalArea 				: 	"",
            functionalarea_id           :   "",
            functionalArealist          :   [],
            subFunctionalArea 			: 	"",
            subfunctionalarea_id        :   "",
            subFunctionalArealist       :   [],
            jobRole                     :   "",
            jobrole_id                  :   "",
            jobRoleArray                :   [],
            gender                      :   "Male Only",
            workFromHome                :   false,
            jobType                     :   "",
            jobtype_id                  :   "",
            jobTypeArray                :   [],
            jobTime                     :   "",
            jobtime_id                  :   "",
            jobTimeArray                :   [],
            jobCategory                 :   "",
            jobcategory_id              :   "",
            jobCategoryArray            :   [],
            positions                   :   "",
            jobDesc                     :   "",
            lastDateOfAppl              :   "",
            contactPersonName           :   "",
            contactPersonEmail          :   "",
            contactPersonPhone          :   "",
            address                     :   "",
            area                        :   "",
            cityVillage                 :   "",
            district                    :   "",
            districtArray               :   [],
            states                      :   "",
            stateArray                  :   [],
            stateCode                   :   "",
            country                     :   "",
            countryCode                 :   "",
            pincode                     :   "",
            pincodeExists               :   true,

            minSalary                   :   "",
            minSalPeriod                :   "",
            maxSalary                   :   "",
            maxSalPeriod                :   "",

            minEducation                :   "",
            minExperience               :   "",

            primarySkills               :   [],
            minPrimExp                  :   "",
            priSkillsArray              :   [],
            priSkillsArraylist          :   [],
            
            secondarySkills             :   [],
            minSecExp                   :   "",
            secSkillsArray              :   [],
            secSkillsArraylist          :   [],
            
            otherSkills                 :   [],
            minOtherExp                 :   "",
            otherSkillsArray            :   [],

            preferredSkills             :   "",
            preferredSkillsArray        :   [],
            
            otherSkillsArraylist        :   [],
            preferredSkillsArraylist    :   [],

            primarySkillTags            :   [],
            primarySkillSuggestions     :   [],
            
            secondarySkillTags          :   [],
            secondarySkillSuggestions   :   [],
            
            otherSkillTags              :   [],
            otherSkillSuggestions       :   [],
            
            preferredSkillTags             :   [],
            preferredSkillSuggestions      :   [],

            
            submitBtnText               :   "SUBMIT"
        }

        this.reactTags = React.createRef();
        
        this.handleDelete   = this.handleDelete.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.handleDrag     = this.handleDrag.bind(this);
        this.handleTagClick = this.handleTagClick.bind(this);

    }

    componentDidMount() {
        this.getStates();

        Axios.get("/api/functionalareamaster/get/list")
            .then(response => {
                    this.setState({
                        functionalArealist: response.data
                    });
            })
            .catch(error => {
                Swal.fire("Error while getting List data", error.message, 'error');
            })

        Axios.get("/api/subfunctionalareamaster/get/list")
            .then(response => {
                this.setState({
                    subFunctionalArealist: response.data
                });
            })
            .catch(error => {
                Swal.fire("Error while getting List data", error.message, 'error');
            })

        Axios.get("/api/jobrolemaster/get/list")
            .then(response => {
                this.setState({
                    jobRoleArray: response.data
                });
            })
            .catch(error => {
                Swal.fire("Error while getting List data", error.message, 'error');
            })    

        Axios.get("/api/jobtypemaster/get/list")
            .then(response => {
                this.setState({
                    jobTypeArray: response.data
                });
            })
            .catch(error => {
                Swal.fire("Error while getting List data", error.message, 'error');
            })

        Axios.get("/api/JobTimeMaster/get/list")
            .then(response => {
                this.setState({
                    jobTimeArray: response.data
                });
                /*console.log("jobTimeArray", this.state.jobTimeArray);*/
            })
            .catch(error => {
                Swal.fire("Error while getting List data", error.message, 'error');
            })

        Axios.get("/api/jobcategorymaster/get/list")
            .then(response => {
                this.setState({
                    jobCategoryArray: response.data
                });
                /*console.log("jobCategoryArray", this.state.jobCategoryArray);*/
            })
            .catch(error => {
                Swal.fire("Error while getting List data", error.message, 'error');
            })

        Axios.get("/api/skillmaster/get/list")
            .then(response => {
                var primarySkillSuggestions =  [];
                response.data.map((elem,index)=>{
                    primarySkillSuggestions.push({id:elem._id,text:elem.skill})
                })
                this.setState({
                    primarySkillSuggestions   : primarySkillSuggestions,
                    secondarySkillSuggestions : primarySkillSuggestions,
                    otherSkillSuggestions     : primarySkillSuggestions,
                    preferredSkillSuggestions    : primarySkillSuggestions
                });

            })
            .catch(error => {
                Swal.fire("Error while getting List data", error.message, 'error');
            })
        if (this.props.match.params.job_id) {
        let job_id = this.props.match.params.job_id;

            Axios.get("/api/jobs/get/one/" + job_id)
                .then(response => {
                    console.log("response.data : ", response.data);
                    this.setState({
                        job_id                  :   job_id,
                        jobTitle                :   response.data.jobsData[0].jobBasicInfo.jobTitle,
                        industry_id             :   response.data.jobsData[0].jobBasicInfo.industry_id,
                        functionalarea_id       :   response.data.jobsData[0].jobBasicInfo.functionalarea_id,
                        subfunctionalarea_id    :   response.data.jobsData[0].jobBasicInfo.subfunctionalarea_id,
                        jobrole_id              :   response.data.jobsData[0].jobBasicInfo.jobrole_id,
                        gender                  :   response.data.jobsData[0].jobBasicInfo.gender,
                        workFromHome            :   response.data.jobsData[0].jobBasicInfo.workFromHome,
                        jobtype_id              :   response.data.jobsData[0].jobBasicInfo.jobtype_id,
                        jobtime_id              :   response.data.jobsData[0].jobBasicInfo.jobtime_id,
                        jobcategory_id          :   response.data.jobsData[0].jobBasicInfo.jobcategory_id,
                        positions               :   response.data.jobsData[0].jobBasicInfo.positions,
                        jobDesc                 :   response.data.jobsData[0].jobBasicInfo.jobDesc,
                        lastDateOfAppl          :   response.data.jobsData[0].jobBasicInfo.lastDateOfAppl ? Moment(response.data.jobsData[0].jobBasicInfo.lastDateOfAppl).format("YYYY-MM-DD") : "",
                        contactPersonName       :   response.data.jobsData[0].jobBasicInfo.contactPersonName,
                        contactPersonEmail      :   response.data.jobsData[0].jobBasicInfo.contactPersonEmail,
                        contactPersonPhone      :   response.data.jobsData[0].jobBasicInfo.contactPersonPhone,

                        address                 :   response.data.jobsData[0].location.address,
                        area                    :   response.data.jobsData[0].location.area,
                        cityVillage             :   response.data.jobsData[0].location.cityVillage,
                        district                :   response.data.jobsData[0].location.district,
                        states                  :   response.data.jobsData[0].location.state,
                        stateCode               :   response.data.jobsData[0].location.stateCode,
                        country                 :   response.data.jobsData[0].location.country,
                        countryCode             :   response.data.jobsData[0].location.countryCode,
                        pincode                 :   response.data.jobsData[0].location.pincode,

                        minSalary               :   response.data.jobsData[0].ctcOffered.minSalary,
                        minSalPeriod            :   response.data.jobsData[0].ctcOffered.minSalPeriod,
                        maxSalary               :   response.data.jobsData[0].ctcOffered.maxSalary,
                        maxSalPeriod            :   response.data.jobsData[0].ctcOffered.maxSalPeriod,

                        minEducation            :   response.data.jobsData[0].eligibility.minEducation,
                        minExperience           :   response.data.jobsData[0].eligibility.minExperience,

                        minPrimExp              :   response.data.jobsData[0].requiredSkills.minPrimExp,
                        minSecExp               :   response.data.jobsData[0].requiredSkills.minSecExp,
                        minOtherExp             :   response.data.jobsData[0].requiredSkills.minOtherExp,
                        submitBtnText           :   "UPDATE"
                    })

                    if (response.data.jobsData[0].jobBasicInfo.workFromHome === true) {
                        document.getElementById("workFromHome").checked = true;
                    } else {
                        document.getElementById("workFromHome").checked = false;
                    }

                    var functionalArea = this.state.functionalArealist.filter((data,index)=>{
                        if (data._id == this.state.functionalarea_id) { return data}
                    })
                    var subFunctionalArea = this.state.subFunctionalArealist.filter((data,index)=>{
                        if (data._id == this.state.subfunctionalarea_id) { return data}
                    })
                    var jobRole = this.state.jobRoleArray.filter((data,index)=>{
                        if (data._id == this.state.jobrole_id) { return data}
                    })
                    var jobType = this.state.jobTypeArray.filter((data,index)=>{
                        if (data._id == this.state.jobtype_id) { return data}
                    })
                    var jobTime = this.state.jobTimeArray.filter((data,index)=>{
                        if (data._id == this.state.jobtime_id) { return data}
                    })
                    var jobCategory = this.state.jobCategoryArray.filter((data,index)=>{
                        if (data._id == this.state.jobcategory_id) { return data}
                    })
                    var primarySkillTags = [];
                    var secondarySkillTags = [];
                    var otherSkillTags = [];
                    var preferredSkillTags = [];


                    this.state.primarySkillSuggestions.map((skill,index)=>{
                        response.data.jobsData[0].requiredSkills.primarySkills.map((data,ind)=>{
                            if (skill.id == data.skill_id) {
                                primarySkillTags.push({ id : skill.id, text : skill.text })
                            }
                        })
                    })
                    this.state.secondarySkillSuggestions.map((skill,index)=>{
                        response.data.jobsData[0].requiredSkills.secondarySkills.map((data,ind)=>{
                            if (skill.id == data.skill_id) {
                                secondarySkillTags.push({ id : skill.id, text : skill.text })
                            }
                        })
                    })
                    this.state.otherSkillSuggestions.map((skill,index)=>{
                        response.data.jobsData[0].requiredSkills.otherSkills.map((data,ind)=>{
                            if (skill.id == data.skill_id) {
                                otherSkillTags.push({ id : skill.id, text : skill.text })
                            }
                        })
                    })
                    this.state.preferredSkillSuggestions.map((skill,index)=>{
                        response.data.jobsData[0].requiredSkills.preferredSkills.map((data,ind)=>{
                            if (skill.id == data.skill_id) {
                                preferredSkillTags.push({ id : skill.id, text : skill.text })
                            }
                        })
                    })

                    this.setState({ functionalArea      : functionalArea[0].functionalArea, 
                                    subFunctionalArea   : subFunctionalArea[0].subfunctionalArea,
                                    jobRole             : jobRole[0].jobRole,
                                    jobType             : jobType[0].jobType,
                                    jobTime             : jobTime[0].jobTime,
                                    jobCategory         : jobCategory[0].jobCategory,
                                    primarySkillTags    : primarySkillTags,
                                    secondarySkillTags  : secondarySkillTags,
                                    otherSkillTags      : otherSkillTags,
                                    preferredSkillTags  : preferredSkillTags
                    }) 
                    
                })

                .catch(error => {
                    Swal.fire("Some error occured while updating job data", error.message, "error");
                })
        }

        

    }

    validateForm = () => {
        var status = true;
        var tempEmail = this.state.contactPersonEmail.trim(); // value of field with whitespace trimmed off
        var emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/;
        var illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]]/;

        if (this.state.jobTitle.length <= 0) {
            document.getElementById("jobTitleError").innerHTML = "Enter Job Title";
            status = false;
        } else {
            document.getElementById("jobTitleError").innerHTML = "";
            status = true;
        }
        if (this.state.address.length <= 0) {
            document.getElementById("addressError").innerHTML = "Enter Job Location";
            status = false;
        } else {
            document.getElementById("addressError").innerHTML = "";
            status = true;
        }
        if (this.state.states.length <= 0) {
            document.getElementById("statesError").innerHTML = "Select State";
            status = false;
        } else {
            document.getElementById("statesError").innerHTML = "";
            status = true;
        }
        if (this.state.cityVillage.length <= 0) {
            document.getElementById("cityVillageError").innerHTML = "Enter City";
            status = false;
        } else {
            document.getElementById("cityVillageError").innerHTML = "";
            status = true;
        }
        if (this.state.district.length <= 0) {
            document.getElementById("districtError").innerHTML = "Enter District";
            status = false;
        } else {
            document.getElementById("districtError").innerHTML = "";
            status = true;
        }
        /*if (this.state.pincode.length <= 0) {
            document.getElementById("pincodeError").innerHTML = "Enter Pincode";
            status = false;
        } else {
            document.getElementById("pincodeError").innerHTML = "";
            status = true;
        }*/
        if (this.state.functionalarea_id.length <= 0) {
            document.getElementById("functionalAreaError").innerHTML = "Select or enter Functional Area";
            status = false;
        } else {
            document.getElementById("functionalAreaError").innerHTML = "";
            status = true;
        }
        if (this.state.subfunctionalarea_id.length <= 0) {
            document.getElementById("subFunctionalAreaError").innerHTML = "Select or enter Sub-Functional Area";
            status = false;
        } else {
            document.getElementById("subFunctionalAreaError").innerHTML = "";
            status = true;
        }
        if (this.state.jobRole.length <= 0) {
            document.getElementById("jobRoleError").innerHTML = "Please enter Job Role";
            status = false;
        } else {
            document.getElementById("jobRoleError").innerHTML = "";
            status = true;
        }
        if (this.state.contactPersonName.length <= 0) {
            document.getElementById("contactPersonNameError").innerHTML = "Please enter contact person name";
            status = false;
        } else {
            document.getElementById("contactPersonNameError").innerHTML = "";
            status = true;
        }
        
        if(this.state.contactPersonEmail.length <=0 ){
            document.getElementById("contactPersonEmailError").innerHTML=  "Please enter your Email";  
            status=false; 
        }else if (
            !emailFilter.test(tempEmail)) { //test email for illegal characters
            document.getElementById('contactPersonEmailError').innerHTML = "Please enter a valid email address.";
        } else if (this.state.contactPersonEmail.match(illegalChars)) {
            document.getElementById('contactPersonEmailError').innerHTML = "Email contains invalid characters.";
        }else{
            document.getElementById("contactPersonEmailError").innerHTML = ""; 
            status = true;
        }

        if (this.state.contactPersonPhone.length <= 0) {
            document.getElementById("contactPersonPhoneError").innerHTML = "Please enter phone number";
            status = false;
        } else{
            document.getElementById("contactPersonPhoneError").innerHTML = ""; 
            status = true;
        }
        return status;
    }
    getStates() {
        Axios.get("http://locations2.iassureit.com/api/states/get/list/IN").then((response) => {
                this.setState({
                    stateArray: response.data
                })
                document.getElementById('Statedata').val(this.state.states);
            })

            .catch((error) => {

            })
    }

    handleChange = (event) => {
        var name = event.currentTarget.name;
        var value = event.currentTarget.value;
        this.setState({
            [name]: value
        });
    }

    setGender(event) {
        event.preventDefault();
        var id = event.currentTarget.id;
        this.setState({
            gender: id,
        })
       /* if(this.state.gender === "Male Only"){
                                
                                this.setState ({"<i className='fa fa-male'></i>"});
                            
                            }else{
                                
                                this.setState ({"<i className='fa fa-female'></i>"});
                                                                    
                            }*/
    }

    handleSubmit = (event) => {
        event.preventDefault();
        if (this.validateForm()) {
            var formValues = {
                user_id                 :   this.props.userDetails.user_id,
                company_id              :   this.props.userDetails.company_id,
                jobTitle                :   this.state.jobTitle,
                industry_id             :   this.props.userDetails.industry_id,
                functionalArea          :   this.state.functionalArea,
                functionalarea_id       :   this.state.functionalarea_id,
                subFunctionalArea       :   this.state.subFunctionalArea,
                subfunctionalarea_id    :   this.state.subfunctionalarea_id,
                jobRole                 :   this.state.jobRole,
                jobrole_id              :   this.state.jobrole_id,
                gender                  :   this.state.gender,
                workFromHome            :   this.state.workFromHome,
                jobType                 :   this.state.jobType,
                jobtype_id              :   this.state.jobtype_id,
                jobTime                 :   this.state.jobTime,
                jobtime_id              :   this.state.jobtime_id,
                jobCategory             :   this.state.jobCategory,
                jobcategory_id          :   this.state.jobcategory_id,
                positions               :   this.state.positions,
                jobDesc                 :   this.state.jobDesc,
                lastDateOfAppl          :   this.state.lastDateOfAppl,
                contactPersonName       :   this.state.contactPersonName,
                contactPersonEmail      :   this.state.contactPersonEmail,
                contactPersonPhone      :   this.state.contactPersonPhone,

                address                 :   this.state.address,
                area                    :   this.state.area,
                cityVillage             :   this.state.cityVillage,
                district                :   this.state.district,
                states                  :   this.state.states,
                stateCode               :   this.state.stateCode,
                country                 :   this.state.country,
                countryCode             :   this.state.countryCode,
                pincode                 :   this.state.pincode,

                minSalary               :   this.state.minSalary,
                minSalPeriod            :   this.state.minSalPeriod,
                maxSalary               :   this.state.maxSalary,
                maxSalPeriod            :   this.state.maxSalPeriod,

                minEducation            :   this.state.minEducation,
                minExperience           :   this.state.minExperience,

                primarySkillTags        :   this.state.primarySkillTags,
                minPrimExp              :   this.state.minPrimExp,
                secondarySkillTags      :   this.state.secondarySkillTags,
                minSecExp               :   this.state.minSecExp,
                otherSkillTags          :   this.state.otherSkillTags,
                minOtherExp             :   this.state.minOtherExp,
                preferredSkillTags      :   this.state.preferredSkillTags,

            };

            console.log("formValues :", formValues);

            if (this.props.match.params.job_id) {
                formValues.job_id = this.state.job_id;
                this.updateData(formValues);
            } else {
                this.insertData(formValues);
            }
        }
    }

    insertData(formValues) {
        Axios.post("/api/jobs/post", formValues)

            .then(response => {
                if (response.data.created) {
                    let job_id = response.data.jobsData._id;

                    Swal.fire("Congrats", "Your Data is Submitted Successfully", "success");
                    this.setState({
                        jobTitle                :   "",
                        functionalarea_id       :   "",
                        subfunctionalarea_id    :   "",
                        jobrole_id              :   "",
                        gender                  :   "Male Only",
                        workFromHome            :   false,
                        jobtype_id              :   "",
                        jobtime_id              :   "",
                        jobcategory_id          :   "",
                        positions               :   "",
                        jobDesc                 :   "",
                        lastDateOfAppl          :   "",
                        contactPersonName       :   "",
                        contactPersonEmail      :   "",
                        contactPersonPhone      :   "",

                        address                 :   "",
                        area                    :   "",
                        cityVillage             :   "",
                        district                :   "",
                        states                  :   "",
                        stateCode               :   "",
                        country                 :   "",
                        countryCode             :   "",
                        pincode                 :   "",

                        minSalary               :   "",
                        minSalPeriod            :   "",
                        maxSalary               :   "",
                        maxSalPeriod            :   "",
                        minEducation            :   "",
                        minExperience           :   "",

                        primarySkills           :   "",
                        minPrimExp              :   "",
                        secondarySkills         :   "",
                        minSecExp               :   "",
                        otherSkills             :   "",
                        minOtherExp             :   "",
                        preferredSkills            :   "",
                    });

                    this.props.history.push("/job-profile/" + job_id);
                }
            })

            .catch(error => {
                console.log(error);
                Swal.fire("Submit Error!", error.message, 'error');
            })
    }

    updateData(formValues) {
        Axios.patch("/api/jobs/update", formValues)
            .then(response => {
                console.log("formValues :", formValues);
                if (response.data.message === "Job details updated Successfully!") {
                    console.log("response.data : ", response.data);
                    Swal.fire("Congrats!", "your profile updated successfully!", "success");
                    this.props.history.push("/job-profile/" + this.state.job_id);
                }
            })
            .catch(error => {
                console.log(error);
                Swal.fire("Update Error!", error.message, 'error');
            })
    }

    onEditorChange(evt) {
        this.setState({
            jobDesc: evt.editor.getData()
        });
    }

    setWorkFromHome(event) {
        this.setState({
            workFromHome: event.target.checked
        });
    }

    keyPressNumber = (e) => {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 189]) !== -1 ||
            // Allow: Ctrl+A, Command+A
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode === 86 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
            // Allow: home, end, left, right, down, up
            (e.keyCode >= 35 && e.keyCode <= 40) || e.keyCode === 189 || e.keyCode === 32) { // let it happen, don't do anything return; } // Ensure that it is a number and stop the keypress if ((e.shiftKey || (e.keyCode < 48 || e.keyCode> 58)) && (e.keyCode < 96 || e.keyCode> 105 || e.keyCode === 190 || e.keyCode === 46)) {
            e.preventDefault();
        }
    }

    camelCase(str) {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }

    handleChangeState(event) {
        var designation = document.getElementById("states");
        var stateCode = designation.options[designation.selectedIndex].getAttribute("statecode");
        this.setState({
            [event.target.name]: event.target.value,
            stateCode: stateCode
        });
    }

    handleChangePlaces = address => {
        this.setState({
            address: address
        });
    };

    handleSelect = address => {

        geocodeByAddress(address)
            .then((results) => {
                console.log(results)
                for (var i = 0; i < results[0].address_components.length; i++) {
                    for (var b = 0; b < results[0].address_components[i].types.length; b++) {
                        switch (results[0].address_components[i].types[b]) {
                            case 'sublocality_level_1':
                                var area = results[0].address_components[i].long_name;
                                break;
                            case 'sublocality_level_2':
                                area = results[0].address_components[i].long_name;
                                break;
                            case 'locality':
                                var city = results[0].address_components[i].long_name;
                                break;
                            case 'administrative_area_level_1':
                                var state = results[0].address_components[i].long_name;
                                var stateCode = results[0].address_components[i].short_name;
                                break;
                            case 'administrative_area_level_2':
                                var district = results[0].address_components[i].long_name;
                                break;
                            case 'country':
                                var country = results[0].address_components[i].long_name;
                                var countryCode = results[0].address_components[i].short_name;
                                break;
                            case 'postal_code':
                                var pincode = results[0].address_components[i].long_name;
                                break;
                            default:
                                break;
                        }
                    }
                }

                console.log('states==>', state)

                this.setState({
                    area            :   area,
                    city            :   city,
                    district        :   district,
                    states          :   state,
                    country         :   country,
                    pincode         :   pincode,
                    stateCode       :   stateCode,
                    countryCode     :   countryCode
                })
            })

            .catch(error => console.error('Error', error));

        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => this.setState({
                'latLng': latLng
            }))
            .catch(error => console.error('Error', error));

        this.setState({
            address: address
        });
    };

    handleDelete(i) {
        const {
            tags
        } = this.state;
        this.setState({
            tags: tags.filter((tag, index) => index !== i),
        });
    }

    handleAddition(tag) {
        this.setState(state => ({
            tags: [...state.tags, tag]
        }));
    }

    handleDrag(tag, currPos, newPos) {
        const tags = [...this.state.tags];
        const newTags = tags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({
            tags: newTags
        });
    }

    handleTagClick(index) {
        console.log('The tag at index ' + index + ' was clicked');
    }
 
  	

    onprimarySkillAddition (tag) {
        if (tag.id == tag.text) {
            tag.id = "" 
        }
    	this.setState(state => ({ primarySkillTags: [...state.primarySkillTags, tag] }));
  	}

    onprimarySkillClick(index) {
        console.log('The tag at index ' + index + ' was clicked');
    }

    onprimarySkillDrag(tag, currPos, newPos) {
        const primarySkillTags = [...this.state.primarySkillTags];
        const newTags = primarySkillTags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ primarySkillTags: newTags });
    }

    onprimarySkillDelete (i) {
        const { primarySkillTags } = this.state;
        this.setState({
          primarySkillTags: primarySkillTags.filter((tag, index) => index !== i),
        });
    }
 	
    
    onsecondarySkillAddition (tag) {  
        if (tag.id == tag.text) {
            tag.id = "" 
        }
        this.setState(state => ({ secondarySkillTags: [...state.secondarySkillTags, tag] }));
    }

    onsecondarySkillClick(index) {
        console.log('The tag at index ' + index + ' was clicked');
    }

    onsecondarySkillDrag(tag, currPos, newPos) {
        const secondarySkillTags = [...this.state.secondarySkillTags];
        const newTags = secondarySkillTags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ secondarySkillTags: newTags });
    }

    onsecondarySkillDelete (i) {
        const { secondarySkillTags } = this.state;
        this.setState({
          secondarySkillTags: secondarySkillTags.filter((tag, index) => index !== i),
        });
	}

    

    onOtherSkillAddition (tag) {
        if (tag.id == tag.text) {
            tag.id = "" 
        }
        
        this.setState(state => ({ otherSkillTags: [...state.otherSkillTags, tag] }));
    }

    onOtherSkillClick(index) {
        console.log('The tag at index ' + index + ' was clicked');
    }

    onOtherSkillDrag(tag, currPos, newPos) {
        const otherSkillTags = [...this.state.otherSkillTags];
        const newTags = otherSkillTags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ otherSkillTags: newTags });
    }

    onOtherSkillDelete (i) {
        const { otherSkillTags } = this.state;
        this.setState({
          otherSkillTags: otherSkillTags.filter((tag, index) => index !== i),
        });
    }


    onPreferredAddition (tag) {
        if (tag.id == tag.text) {
            tag.id = "" 
        }
        this.setState(state => ({ preferredSkillTags: [...state.preferredSkillTags, tag] }));
    }

    onPreferredClick(index) {
        console.log('The tag at index ' + index + ' was clicked');
    }

    onPreferredDrag(tag, currPos, newPos) {
        const preferredSkillTags = [...this.state.preferredSkillTags];
        const newTags = preferredSkillTags.slice();

        newTags.splice(currPos, 1);
        newTags.splice(newPos, 0, tag);

        // re-render
        this.setState({ preferredSkillTags: newTags });
    }

    onPreferredDelete (i) {
        const { preferredSkillTags } = this.state;
        this.setState({
          preferredSkillTags: preferredSkillTags.filter((tag, index) => index !== i),
        });
    }

    
    onChangeFunctionalArea(event){
        const {name,value} = event.target;
        this.setState({ [name]:value });  
        
        var functionalarea_id;
        if (document.querySelector('#functionalArea option[value="' + value + '"]')) {
            functionalarea_id = document.querySelector('#functionalArea option[value="' + value + '"]').getAttribute("data-value")
        }else{ functionalarea_id = "" }

        this.setState({ functionalarea_id : functionalarea_id },()=>{
            console.log(this.state)
        });  
        
    }	

    onChangeSubFunctionalArea(event){
        const {name,value} = event.target;
        this.setState({ [name]:value });  
        
        var subfunctionalarea_id;
        if (document.querySelector('#subFunctionalArea option[value="' + value + '"]')) {
            subfunctionalarea_id = document.querySelector('#subFunctionalArea option[value="' + value + '"]').getAttribute("data-value")
        }else{ subfunctionalarea_id = "" }

        this.setState({ subfunctionalarea_id : subfunctionalarea_id },()=>{
            console.log(this.state)
        });  
    }

    onChangeRole(event){
        const {name,value} = event.target;
        this.setState({ [name]:value });  
        
        var jobrole_id;
        if (document.querySelector('#jobRole option[value="' + value + '"]')) {
            jobrole_id = document.querySelector('#jobRole option[value="' + value + '"]').getAttribute("data-value")
        }else{ jobrole_id = "" }

        this.setState({ jobrole_id : jobrole_id },()=>{
        });  
        
    }

    onChangeJobType(event){
        const {name,value} = event.target;
        this.setState({ [name]:value });  
        
        var jobtype_id;
        if (document.querySelector('#jobType option[value="' + value + '"]')) {
            jobtype_id = document.querySelector('#jobType option[value="' + value + '"]').getAttribute("data-value")
        }else{ jobtype_id = "" }

        this.setState({ jobtype_id : jobtype_id },()=>{
            console.log(this.state)
        });  
        
    }

    onChangeJobTime(event){
        const {name,value} = event.target;
        this.setState({ [name]:value });  
        
        var jobtime_id;
        if (document.querySelector('#jobTime option[value="' + value + '"]')) {
            jobtime_id = document.querySelector('#jobTime option[value="' + value + '"]').getAttribute("data-value")
        }else{ jobtime_id = "" }

        this.setState({ jobtime_id : jobtime_id },()=>{
            console.log(this.state)
        });  
        
    }

    onChangeJobCategory(event){
        const {name,value} = event.target;
        this.setState({ [name]:value });  
        
        var jobcategory_id;
        if (document.querySelector('#jobCategory option[value="' + value + '"]')) {
            jobcategory_id = document.querySelector('#jobCategory option[value="' + value + '"]').getAttribute("data-value")
        }else{ jobcategory_id = "" }

        this.setState({ jobcategory_id : jobcategory_id },()=>{
            console.log(this.state)
        });  
    }


render(){	
		const searchOptions =   { componentRestrictions: {country: "in"} }		
		const KeyCodes = {
		  comma: 188,
		  enter: 13,
		};

		const delimiters = [KeyCodes.comma, KeyCodes.enter];
	return(
				<div className="pageWrapper addJobBackgroundColor container-fluid">
					<div className="row">
						<div className="col-lg-10 col-lg-offset-1 addJobForm pageWrapperBorder borderColor">
							<div className="col-lg-10 col-lg-offset-1 mainFormSection">
								<div className="addJobFormHeading col-lg-12"> Post A Job <div className="addJobFormHr col-lg-12"></div> </div>
								
								<div className="addJobMainHead col-lg-12">
									<i className="fa fa-info"></i> 
									<div className="labelLeftPadding"> Basic Info </div>
								</div>
								
                                <form id="addJob" autoComplete="off">
									<div className="col-lg-12 addJobFieldRow text-left">
										<div className="row">
											<div className="col-lg-6">
												<div className="row">
													<label htmlFor="jobTitle" className="addjobformLable col-lg-12" aria-label="Whats up!">
														Job Title
														<span className="asterisk"> &#42; </span>
                                                        <div href="#" data-tip data-for='jobTitleTooltip' className="pull-right">
                                                            <i title="Please enter job title" className="fa fa-question-circle"></i>
                                                        </div>
													</label>
												</div>
												<div className="input-group">
													<span className="input-group-addon addJobFormField"><i className="fa fa-briefcase"></i> </span> 
													<input type="text" className="form-control addJobFormField" name="jobTitle" id="jobTitle" maxLength="50" value={this.state.jobTitle} onChange={this.handleChange}/>
												</div>
												<span id="jobTitleError" className="errorMsgJobPost"></span>
											</div>
											
											<div className="col-lg-6">
												<div className="row">
													<label htmlFor="address" className="addjobformLable col-lg-12"> Job Location <span className="asterisk">&#42;</span> </label>
												</div>	
												<div className="input-group">
													<span className="input-group-addon addJobFormField">
														<FontAwesomeIcon className="addJobLocationIcon" icon={['fas', 'map-marker-alt']} />
													</span> 
													<PlacesAutocomplete
			                                        	value 		  	=	{this.state.address}
			                                        	onChange 	  	=	{this.handleChangePlaces}
			                                        	onSelect 	  	=	{this.handleSelect}
			                                        	searchOptions	=	{searchOptions}>
				                                        
				                                        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => 	(
					                                          	<div>
						                                            <input maxLength="200"
						                                            	{...getInputProps({
										                                            		placeholder: 'Search Address ...',
										                                                	className: 'location-search-input col-lg-12 form-control errorinputText',
										                                                	id:"address",
										                                                	name:"address"
						                                              					})
						                                            	}
						                                            />
						                                            
						                                            <div className={this.state.address ? "autocomplete-dropdown-container SearchListContainer" : ""}>
						                                            	{loading && <div>Loading...</div>}
						                                            	{suggestions.map(suggestion => {
														                                                	const className = suggestion.active
														                                                  		? 'suggestion-item--active'
														                                                  		: 'suggestion-item';
														                                                	// inline style for demonstration purpose
														                                                	const style = suggestion.active
														                                                  		? { backgroundColor: '#fafafa', cursor: 'pointer' }
														                                                  		: { backgroundColor: '#ffffff', cursor: 'pointer' };
						                                                
															                                                return (
																	                                                	<div
																	                                                    	{...getSuggestionItemProps(suggestion, {
																											                                                      		className,
																											                                                      		style,
																	                                                    	}							)          }
																	                                                	>
															                                                    		<span> {suggestion.description} </span>
															        													</div>
															                                    					);
																										}
																						)
						                                            	}
						                                            </div>
					                                          	</div>
														)}
		                                      		</PlacesAutocomplete>
												</div>
                                                <span id="addressError" className="errorMsgJobPost"></span>
											</div>
										</div>
									</div>

									<div className="col-lg-12 addJobFieldRow text-left">
										<div className="row">
											<div className="col-lg-3">
                                                <div className="row">
												    <label htmlFor="states" className="addjobformLable col-lg-12"> State <span className="asterisk">&#42;</span> </label>
                                                </div>
												<div className="input-group"> 
                                                    <input type="text" className="form-control addJobFormField addJobState" ref="states" id="states" name="states" value={this.state.states} onChange={this.handleChange}/>
													
												</div>
                                                <span id="statesError" className="errorMsgJobPost"></span>	
											</div>	
											
											<div className="col-lg-3">
												<div className="row">
													<label className="addjobformLable col-lg-12"> City <span className="asterisk">&#42;</span> </label>
												</div>	
												<div className="input-group"> 
													<input type="text" className="form-control addJobFormField addJobState" ref="cityVillage" id="cityVillage" name="cityVillage" maxLength="50" value={this.state.cityVillage} onChange={this.handleChange}/>
												</div>
                                                <span id="cityVillageError" className="errorMsgJobPost"></span>
											</div>
											
											<div className="col-lg-3">
												<div className="row">
													<label className="addjobformLable col-lg-12"> District <span className="asterisk">&#42;</span> </label>
												</div>
												<div className="input-group"> 
													<input type="text" className="form-control addJobFormField addJobState" ref="district" id="district" name="district" maxLength="50" value={this.state.district} onChange={this.handleChange}/>
												</div>
                                                <span id="districtError" className="errorMsgJobPost"></span>
											</div>
											
											<div className="col-lg-3">
												<div className="row">
													<label className="addjobformLable col-lg-12"> Pincode <span className="asterisk">&#42;</span> </label>
												</div>
												<div className="input-group"> 
													<input type="text" className="form-control addJobFormField addJobState" ref="pincode" id="pincode" name="pincode" maxLength="50" value={this.state.pincode} onChange={this.keyPressNumber.bind(this)}/>
												</div>
                                                <span id="pincodeError" className="errorMsgJobPost"></span>
											</div>
										</div>
									</div>
									

									<div className="form-group col-lg-12 addJobFieldRow text-left">
										<div className="row">
											<div className="col-lg-6">
												<label htmlFor="functionalArea" className="addjobformLable"> Functional Area <span className="asterisk">&#42;</span> </label>
												<div className="input-group">
													<span className="input-group-addon addJobFormField"><i className="fa fa-briefcase"></i></span> 
														<input type="text" list="functionalArea" className="form-control addJobFormField" refs="functionalArea" 
                                                         name="functionalArea" id="selectFunctionalArea" maxLength="100" value={this.state.functionalArea} data-value={this.state.functionalarea_id}
														onChange={this.onChangeFunctionalArea.bind(this)} />
														<datalist name="functionalArea" id="functionalArea" className="functionalArealist" >
														    {this.state.functionalArealist.map((item, key) =>
														        <option key={key} value={item.functionalArea} data-value={item._id}/>
														    )}
														</datalist>
												</div>
                                                <span id="functionalAreaError" className="errorMsgJobPost"></span>
											</div>			
											
											<div className="col-lg-6">
												<label htmlFor="subFunctionalArea" className="addjobformLable"> Sub-Functional Area <span className="asterisk">&#42;</span> </label>
												<div className="input-group">
													<span className="input-group-addon addJobFormField"><FontAwesomeIcon icon={['fas', 'briefcase']} /></span> 
                                                        <input type="text" list="subFunctionalArea" className="form-control addJobFormField" refs="subFunctionalArea"
                                                         id="selectSubFunctionalArea" maxLength="100" value={this.state.subFunctionalArea} name="subFunctionalArea"
                                                        onChange={this.onChangeSubFunctionalArea.bind(this)} />
                                                        <datalist name="subFunctionalArea" id="subFunctionalArea" className="subFunctionalArealist" >
                                                            {this.state.subFunctionalArealist.map((item, key) =>
                                                                <option key={key} value={item.subfunctionalArea} data-value={item._id}/>
                                                            )}
                                                        </datalist>
												</div>
                                                <span id="subFunctionalAreaError" className="errorMsgJobPost"></span>
											</div>
										</div>
									</div>
									
									<div className="form-group col-lg-12 text-left">
										<div className="row">
											<div className="col-lg-6">
												<div className="row">
													<label htmlFor="jobRole" className="addjobformLable col-lg-12"> Role <span className="asterisk">&#42;</span>
														<div href="#" data-tip data-for='jobTitleTooltip' className="pull-right">
															<i title="Please enter job role" className="fa fa-question-circle"></i>
														</div>
													</label>
												</div>
												<div className="input-group">
													<span className="input-group-addon addJobFormField"><FontAwesomeIcon icon={['fas', 'briefcase']} /></span> 
                                                        <div className="input-group col-lg-12">
                                                            <input type="text" list="jobRole" className="form-control addJobFormField" refs="jobRole" id="selectrole" maxLength="50" value={this.state.jobRole} name="jobRole"
                                                            onChange={this.onChangeRole.bind(this)} />
                                                            <datalist name="jobRole" id="jobRole" className="jobRoleArray" >
                                                                {this.state.jobRoleArray.map((item, key) =>
                                                                    <option key={key} value={item.jobRole} data-value={item._id}/>
                                                                )}
                                                            </datalist>
                                                        </div>
												</div>
												<span id="jobRoleError" className="errorMsgJobPost"></span>
											</div>
											
											<div className="col-lg-6">
												<label htmlFor="gender" className="addJobGenderTitle"> Who Can Apply </label>
												<div className="input-group addJobGenderFeildWrapper">
													<div className={this.state.gender==="Male Only"? "addJobGenderField col-lg-4 addJobGenderActive" : "addJobGenderField col-lg-4" }  id="Male Only" name="gender" value="Male Only" onClick={this.setGender.bind(this)}>
														<div className="row">
															Male Only
														</div>
													</div>
													<div className={this.state.gender==="Female Only"? "addJobGenderField col-lg-4 addJobGenderActive" : "addJobGenderField col-lg-4" } id="Female Only" name="gender" value="Female Only" onClick={this.setGender.bind(this)}>
														<div className="row">
															Female Only
														</div>
													</div>
													<div className={this.state.gender==="Both (Male & Female)"? "addJobGenderField col-lg-4 addJobGenderActive" : "addJobGenderField col-lg-4" } id="Both (Male & Female)" name="gender" value="Both (Male & Female)"  onClick={this.setGender.bind(this)}>
														<div className="row">
															Both (Male & Female)
														</div>
													</div>			
												</div>
											</div>
										</div>
									</div>
									
									<div className="col-lg-3 text-left">
										<label htmlFor="workFromHome" className="containerWfh">
											Work From Home
	                                        <input type="checkbox" name="workFromHome" id="workFromHome" value={this.state.workFromHome} onChange={this.setWorkFromHome.bind(this)} />
	                                        <span className="checkmark2"></span>
	                            		</label>
									</div>
									
									<div className="col-lg-12 addJobFieldRow text-left">
										<div className="row">
											<div className="col-lg-4">
												<label htmlFor="jobType" className="addjobformLable"> Job Type </label>
												<div className="input-group col-lg-12">
													<span className="input-group-addon addJobFormField"><i className="fa fa-briefcase"></i> </span> 
														<input type="text" list="jobType" className="form-control addJobFormField" refs="jobType" id="selectjobType" maxLength="50" value={this.state.jobType} name="jobType"
                                                        onChange={this.onChangeJobType.bind(this)} />
                                                        <datalist name="jobType" id="jobType" className="jobTypeArray" >
                                                            {this.state.jobTypeArray.map((item, key) =>
                                                                <option key={key} value={item.jobType} data-value={item._id}/>
                                                            )}
                                                        </datalist>
												</div>
											</div>
											
											<div className="col-lg-4">
												<label htmlFor="jobTime" className="addjobformLable"> Job Time </label>
												<div className="input-group">
													<span className="input-group-addon addJobFormField"><FontAwesomeIcon icon={['fas', 'business-time']} /></span> 
													   <input type="text" list="jobTime" className="form-control addJobFormField" refs="jobTime" id="selectJobTime" maxLength="50" value={this.state.jobTime} name="jobTime"
                                                        onChange={this.onChangeJobTime.bind(this)} />
                                                        <datalist name="jobTime" id="jobTime" className="jobTimeArray" >
                                                            {this.state.jobTimeArray.map((item, key) =>
                                                              <option key={key} value={item.jobTime} data-value={item._id}/>
                                                            )}
                                                        </datalist>
												</div>
											</div>
											
											<div className="col-lg-4">
												<label htmlFor="jobCategory" className="addjobformLable"> Job Category </label>
												<div className="input-group">
													<span className="input-group-addon addJobFormField"><i className="fa fa-list-alt"></i></span> 
													   <input type="text" list="jobCategory" className="form-control addJobFormField" refs="jobCategory" id="selectjobCategory" maxLength="50" value={this.state.jobCategory} name="jobCategory"
                                                        onChange={this.onChangeJobCategory.bind(this)} />
                                                        <datalist name="jobCategory" id="jobCategory" className="jobCategoryArray" >
                                                            {this.state.jobCategoryArray.map((item, key) =>
                                                              <option key={key} value={item.jobCategory} data-value={item._id}/>
                                                            )}
                                                        </datalist>
												</div>
											</div>
										</div>
									</div>

									<div className="col-lg-12 addJobFieldRow text-left">
										<div className="row">
											<div className="col-lg-4">
												<div className="row">
													<label htmlFor="positions" className="addjobformLable col-lg-12"> No. Of Positions </label>
												</div>
												<div className="input-group">
													<span className="input-group-addon addJobFormField"><i className="fa fa-users"></i></span> 
													<input type="text" className="form-control addJobFormField" name="positions" id="positions" maxLength="50" value={this.state.positions} onChange={this.handleChange}/>
												</div>
											</div>
											
											<div className="col-lg-4 democlass">
												<label htmlFor="lastDateOfAppl" className="addjobformLable"> Last Date of Application </label>
												<div className="input-group">
													<span className="input-group-addon addJobFormField"><i className="fa fa-calendar"></i></span> 
													<input type="date" className="form-control addJobFormField" name="lastDateOfAppl" id="lastDateOfAppl" value={this.state.lastDateOfAppl} onChange={this.handleChange}/>
												</div>
											</div>
										</div>	
									</div>

									<div className="col-lg-12 addJobFieldRow"> <div className="addJobFormHr col-lg-12"></div> </div>	
									
									<div className="addJobSubHead addJobSubHeadSalary col-lg-12">
										<i className="fa fa-rupee salaryIcon"></i>
										<div className="labelLeftPadding"> Salary </div>
									</div>
									
									<div className="col-lg-12 addJobFieldRow text-left">
										<div className="row">
											<div className="col-lg-6">
												<div className="row row-no-gutters">
													<div className="col-lg-8">
														<label htmlFor="minSalary" className="addjobformLable"> Minimum Salary <i className="fa fa-rupee"></i> </label>
														<div className="input-group">
															<span className="input-group-addon addJobFormField"> <i className="fa fa-rupee addJobrupee"></i> </span> 
															<input type="text" className="form-control addJobFormField" name="minSalary" id="minSalary" maxLength="50" value={this.state.minSalary} onChange={this.handleChange}/>
														</div>
													</div>
													
													<div className="col-lg-4">
														<label htmlFor="minSalPeriod" className="addjobformLable"> &nbsp; </label>
														<select className="form-control addJobFormField minSalaryDropdown" name="minSalPeriod" id="minSalPeriod" value={this.state.minSalPeriod} onChange={this.handleChange}>
															<option hidden> -- Select -- </option>
															<option> Per Month </option>
															<option> Per Year  </option>
													    </select>
													</div>
												</div>
											</div>
											
											<div className="col-lg-6">
												<div className="row row-no-gutters">
													<div className="col-lg-8">
														<label htmlFor="maxSalary" className="addjobformLable"> Maximum Salary <i className="fa fa-rupee"></i> </label>
														<div className="input-group">
															<span className="input-group-addon addJobFormField"><i className="fa fa-rupee addJobrupee"></i> </span> 
															<input type="text" className="form-control addJobFormField" name="maxSalary" id="maxSalary" maxLength="50" value={this.state.maxSalary} onChange={this.handleChange}/>
														</div>
													</div>
													
													<div className="col-lg-4">
														<label htmlFor="maxSalPeriod" className="addjobformLable"> &nbsp; </label>
														<select className="form-control addJobFormField maxSalaryDropdown" name="maxSalPeriod" id="maxSalPeriod" value={this.state.maxSalPeriod} onChange={this.handleChange}>
															<option hidden> -- Select -- </option>
															<option> Per Month </option>
															<option> Per Year  </option>
													    </select>
													</div>
												</div>
											</div>
										</div>
									</div>

									<div className="col-lg-12 addJobFieldRow"> <div className="addJobFormHr col-lg-12"> </div> </div>
									
									<div className="col-lg-12 addJobSubHead">
										<i className="fa fa-book"></i>
										<div className="labelLeftPadding"> Required Education & Experience </div>
									</div>
									
									<div className="col-lg-12 addJobFieldRow text-left">
										<div className="row">
											<div className="col-lg-6">
												<label htmlFor="minEducation" className="addjobformLable"> Minimum Education Required </label>
												<div className="input-group">
													<span className="input-group-addon addJobFormField"> <i className="fa fa-graduation-cap"></i> </span> 
													<input type="text" className="form-control addJobFormField" name="minEducation" id="minEducation" maxLength="50" value={this.state.minEducation} onChange={this.handleChange}/>
												</div>
											</div>
											
											<div className="col-lg-6">
												<label htmlFor="minExperience" className="addjobformLable"> Minimum Overall Experience </label>
												<div className="input-group">
													<span className="input-group-addon addJobFormField"> <i className="fa fa-history"></i> </span> 
													<input type="text" className="form-control addJobFormField" name="minExperience" id="minExperience" maxLength="50" value={this.state.minExperience} onChange={this.handleChange}/>
												</div>
											</div>
										</div>
									</div>
									
									<div className="col-lg-12 addJobFieldRow"> <div className="addJobFormHr col-lg-12"> </div> </div>
									
									<div className="col-lg-12 addJobSubHead addJobSubHeadSkills">
										<i className='fa fa-cog'> </i> 
										<div className="labelLeftPadding"> Expected Skills </div>
									</div>
									
									<div className="col-lg-12 addJobFieldRow text-left">
										<div className="row">
											<div className="col-lg-8 primarySkillsField">
												<label htmlFor="primarySkills" className="addjobformLable"> Primary Skills </label>
												<div className="input-group col-lg-12">
													<span className="input-group-addon addJobFormField"> <i className='fa fa-cog'></i> </span>
														<ReactTags
													        //ref={this.reactTags}
													        tags={this.state.primarySkillTags}
													        suggestions={this.state.primarySkillSuggestions}
													        delimiters={delimiters}
													        handleDelete={this.onprimarySkillDelete.bind(this)}
													        handleAddition={this.onprimarySkillAddition.bind(this)}
													        handleDrag={this.onprimarySkillDrag.bind(this)}
          													handleTagClick={this.onprimarySkillClick.bind(this)} />
													</div>
											</div>
											
											<div className="col-lg-4">
												<label htmlFor="minPrimExp" className="addjobformLable"> Min. Experience Req. </label>
												<div className="input-group">
													<span className="input-group-addon addJobFormField"> <i className="fa fa-bar-chart"></i> </span> 
													<input type="text" className="form-control addJobFormField" name="minPrimExp" id="minPrimExp" maxLength="50" value={this.state.minPrimExp} onChange={this.handleChange}/>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-12 addJobFieldRow text-left">
										<div className="row">
											<div className="col-lg-8 secondarySkillsField">
												<label htmlFor="secondarySkills" className="addjobformLable"> Secondary Skills </label>
												<div className="input-group col-lg-12">
													<span className="input-group-addon addJobFormField"> <i className='fa fa-cog'></i> </span>
														<ReactTags
                                                            tags={this.state.secondarySkillTags}
                                                            suggestions={this.state.secondarySkillSuggestions}
                                                            delimiters={delimiters}
                                                            handleDelete={this.onsecondarySkillDelete.bind(this)}
                                                            handleAddition={this.onsecondarySkillAddition.bind(this)}
                                                            handleDrag={this.onsecondarySkillDrag.bind(this)}
                                                            handleTagClick={this.onsecondarySkillClick.bind(this)}
                                                            />
												</div>
											</div>
											
											<div className="col-lg-4">
												<label htmlFor="minSecExp" className="addjobformLable"> Min. Experience Req. </label>
												<div className="input-group">
													<span className="input-group-addon addJobFormField"> <i className="fa fa-bar-chart"></i> </span> 
													<input type="text" className="form-control addJobFormField" name="minSecExp" id="minSecExp" maxLength="50" value={this.state.minSecExp} onChange={this.handleChange}/>
												</div>
											</div>
										</div>
									</div>
									<div className="col-lg-12 addJobFieldRow text-left">
										<div className="row">
											<div className="col-lg-8 otherSkillsField">
												<label htmlFor="otherSkills" className="addjobformLable"> Other Skills </label>
												<div className="input-group col-lg-12">
													<span className="input-group-addon addJobFormField"> <i className='fa fa-cog'></i> </span>
														<ReactTags
                                                            tags={this.state.otherSkillTags}
                                                            suggestions={this.state.otherSkillSuggestions}
                                                            delimiters={delimiters}
                                                            handleDelete={this.onOtherSkillDelete.bind(this)}
                                                            handleAddition={this.onOtherSkillAddition.bind(this)}
                                                            handleDrag={this.onOtherSkillDrag.bind(this)}
                                                            handleTagClick={this.onOtherSkillClick.bind(this)}
                                                            />
												</div>
											</div>
											
											<div className="col-lg-4">
												<label htmlFor="minOtherExp" className="addjobformLable"> Min. Experience Req. </label>
												<div className="input-group">
													<span className="input-group-addon addJobFormField"> <i className="fa fa-bar-chart"></i> </span> 
													<input type="text" className="form-control addJobFormField" name="minOtherExp" id="minOtherExp" maxLength="50" value={this.state.minOtherExp} onChange={this.handleChange}/>
												</div>
											</div>
										</div>
									</div>
									
									<div className="col-lg-12 addJobFieldRow text-left">
										<label htmlFor="preferredSkills" className="addjobformLable"> Preferred Skills but not mandatory </label>
										<div className="input-group col-lg-12 preferredSkillsField">
											<span className="input-group-addon addJobFormField"> <i className='fa fa-cog'></i> </span>
												<ReactTags
                                                    tags={this.state.preferredSkillTags}
                                                    suggestions={this.state.preferredSkillSuggestions}
                                                    delimiters={delimiters}
                                                    handleDelete={this.onPreferredDelete.bind(this)}
                                                    handleAddition={this.onPreferredAddition.bind(this)}
                                                    handleDrag={this.onPreferredDrag.bind(this)}
                                                    handleTagClick={this.onPreferredClick.bind(this)}
                                                    />
										</div>
									</div>
									
									<div className="col-lg-12 addJobFieldRow"> <div className="addJobFormHr col-lg-12"> </div> </div>
									
									<div className="addJobMainHead col-lg-12">
										<i className="fa fa-info"> </i> 
										<div className="labelLeftPadding"> Contact Info </div>
									</div>
									<div className="col-lg-12 addJobFieldRow text-left">
										<div className="row">
											<div className="col-lg-4">
												<label htmlFor="contactPersonName" className="addjobformLable"> Contact Person <span className="asterisk">&#42;</span> </label>
												<div className="input-group">
													<span className="input-group-addon addJobFormField"> <i className="fa fa-user"> </i> </span> 
													<input type="text" className="form-control addJobFormField" name="contactPersonName" id="contactPersonName" maxLength="100" value={this.state.contactPersonName} onChange={this.handleChange}/>
												</div>
												<span id="contactPersonNameError" className="errorMsgJobPost"> </span>
											</div>
											
											<div className="col-lg-4">
												<label htmlFor="contactPersonEmail" className="addjobformLable"> Email <span className="asterisk">&#42;</span> </label>
												<div className="input-group">
													<span className="input-group-addon addJobFormField"> <i className="fa fa-envelope-o"> </i> </span> 
													<input type="text" className="form-control addJobFormField" name="contactPersonEmail" id="contactPersonEmail" maxLength="50" value={this.state.contactPersonEmail} onChange={this.handleChange}/>
												</div>
												<span id="contactPersonEmailError" className="errorMsgJobPost"> </span>
											</div>
											
											<div className="col-lg-4">
												<label htmlFor="contactPersonPhone" className="addjobformLable"> Phone Number <span className="asterisk">&#42;</span> </label>
												<PhoneInput
													className = "input-group-addon addJobFormField form-control" 
													country   = {'in'}
													id 		  = "contactPersonPhone"
													value 	  = {this.state.contactPersonPhone}
													onChange  = {contactPersonPhone => this.setState({ contactPersonPhone })}
												/>
												<span id="contactPersonPhoneError" className="errorMsgJobPost"></span>
											</div>
										</div>
									</div>

									<div className="col-lg-12 addJobFieldRow"> <div className="addJobFormHr col-lg-12"> </div> </div>

									<div className="addJobSubHead col-lg-12">
										<i className="fa fa-briefcase"> </i>
										<div className="labelLeftPadding"> Job Description </div>
									</div>
									
									<div className="description text-left col-lg-12">
										<div className="form-group">
									      <label htmlFor="jobDesc" className="addjobformLable jobDesc"> Describe the responsibilities of this job, required work experience, skills, or education. </label>
									      	<div> 
	                    						<CKEditor
											        editor  	= 	{ClassicEditor}
											        data 		= 	{this.state.jobDesc}
											        id 			= 	"jobDesc"
											        onInit		=	{ editor =>	{}}
											        onChange 	=	{(event, editor) => {this.setState({ jobDesc: editor.getData() });} }
											        
											        onBlur		=	{ 	
											        					editor 	=> 	{
											            								console.log( 'Blur.', editor );
											          								} 	
											          				}
											        
											        onFocus		=	{ 	
											        					editor 	=> {
											            								console.log( 'Focus.', editor );
											          								} 
											          				}
										        />	
										    </div> 
									    </div>
									</div>																														
									
									<div className="col-lg-7 col-lg-offset-5 pull-right">
										<button type="button" data-toggle="modal" data-target="#robust" data-dismiss="modal" className="btn addJobFormField addJobPreviewBtn"> 
											PREVIEW 
										</button>

										<PreviewModal jobInfo = {this.state} />

										<button className="btn buttonYellow addJobSubmitBtn"  onClick={this.handleSubmit}> {this.state.submitBtnText} </button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			);
}
}
const mapStateToProps = (state)=>{
    return {
        userDetails     : state.userDetails,
    }
}
const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 
export default connect(mapStateToProps, mapDispatchToProps)(JobPosting)
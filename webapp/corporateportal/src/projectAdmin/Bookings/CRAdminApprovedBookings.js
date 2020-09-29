import React, { Component } from 'react';
import $                    from 'jquery';
import axios                from 'axios';
import _                    from 'underscore';
import moment                   from 'moment';

import EmployeeDetails        from './components/EmployeeDetails.js';
import TripDetails            from './components/TripDetails.js';
import CarDetails             from './components/CarDetails.js';
import EstimatedCost          from './components/EstimatedCost.js';
import ManagerApproval        from './components/ManagerApproval.js';
import TimeAgo from 'timeago-react';

import swal                 from 'sweetalert';
import 'bootstrap/js/tab.js';

class CRAdminApprovedBookings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookingData: [],
            id:"",
            empID:"",
            tripArray:[],
            category  :"",
            brand:"",
            model:"",
            capacity:"",
            bookingCount:"",
            bookingNumber:"",
            showData:"",
            status:"Select Status",
            showDetails:false
            // managerId:""
        };
        
        this.handleChange = this.handleChange.bind(this);
        // this.handleChangehandleStatusChange = this.handleStatusChange.bind(this);
        this.ShowForm = this.ShowForm.bind(this);
        this.camelCase = this.camelCase.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const name = target.name;

        this.setState({
            [name]: event.target.value
        });
    }

    componentDidMount() {
        this.setState({corporate_id:localStorage.getItem("company_Id")})
        this.getData()
    }

    componentWillReceiveProps(nextProps){ 
    this.getData()
    }

    getData(){
        var formValues={
            corporate_id:localStorage.getItem("company_Id")
            }
         axios.post("/api/bookingmaster/get/allCRBookingForAdmin",formValues)
        .then((response) => {
            this.setState({'bookingData':response.data,
                showDetails:true,
                bookingCount:response.data.length,
            })
            document.getElementById(response.data[0]._id).classList.add("selectedBooking")
            this.setState({id:response.data[0]._id,
                bookingNumber:response.data[0].bookingId,
                empID :response.data[0].employeeId,
                estimatedCost :response.data[0].estimatedCost,
                status :response.data[0].statusValue,
                managerID:response.data[0].managerID1,
                approvalRequired:response.data[0].approvalRequired,
                bookingDate:moment(response.data[0].createdAt).format('DD/MM/YYYY') },()=>{  
                    axios.get('/api/bookingmaster/get/booking/'+this.state.id)
                    .then((response) => {
                        axios.get("/api/categorymaster/get/one/"+response.data.data[0].vehicleCategoryId)
                        .then((res) => {
                            this.setState({
                              category  :res.data.category,
                            },()=>{
                                var array = {
                                  from    : response.data.data[0].from.address,
                                  fromAddress1    : response.data.data[0].from.address1,
                                  fromPincode    : response.data.data[0].from.pincode,
                                  toAddress1    : response.data.data[0].to.address1,
                                  toPincode    : response.data.data[0].to.pincode,
                                  pickupDate : response.data.data[0].pickupDate,
                                  pickupTime : response.data.data[0].pickupTime,
                                  returnDate : response.data.data[0].returnDate,
                                  to         : response.data.data[0].to.address,
                                  returnTime : response.data.data[0].returnTime,
                                  bookingType : response.data.data[0].tripType,
                                  purposeOfTravel: purpose,
                                  instructions  :response.data.data[0].specialInstruction,
                                  selectedVehicle  :this.state.category,
                                  stopArr : response.data.data[0].intermediateStops,
                                  reasonForSelectingVehicle  :response.data.data[0].reasonForSelectingVehicle,
                                }

                                this.setState({tripArray:array})
                            })
                        })
                        .catch((error) => {
                            console.log('error: ',error)
                        })
                        if(response.data.data[0].purposeOfTravel == "Other"){
                            var purpose = response.data.data[0].purposeOfTravelOther
                          }else{
                            var purpose = response.data.data[0].purposeOfTravel
                          }
                        var array = {
                          from    : response.data.data[0].from.address,
                          fromAddress1    : response.data.data[0].from.address1,
                          fromPincode    : response.data.data[0].from.pincode,
                          toAddress1    : response.data.data[0].to.address1,
                          toPincode    : response.data.data[0].to.pincode,
                          pickupDate : response.data.data[0].pickupDate,
                          pickupTime : response.data.data[0].pickupTime,
                          returnDate : response.data.data[0].returnDate,
                          to         : response.data.data[0].to.address,
                          returnTime : response.data.data[0].returnTime,
                          bookingType : response.data.data[0].tripType,
                          purposeOfTravel: purpose,
                          instructions  :response.data.data[0].specialInstruction,
                          reasonForSelectingVehicle  :response.data.data[0].reasonForSelectingVehicle,
                          selectedVehicle  :this.state.category,
                          stopArr : response.data.data[0].intermediateStops,
                          brand:this.state.brand,
                          model:this.state.model,
                          capacity:this.state.capacity,
                        }
                        this.setState({'tripArray':array,status:response.data.data[0].statusValue})
                         document.getElementById(response.data[0]._id).classList.add("selectedBooking")
                    })
                    .catch((error) =>{

                    })
                });

           
        })
        .catch((error) =>{
            console.log("ERROR : ", error); 
        })
    }

    /*handleStatusChange(event) {
        const target = event.target;
        this.setState({
            status: event.target.value,
            bookingNumber:"",
            id:""
        },()=>{
                this.getBookingData(this.state.status)
            });
    }
    */
    
    camelCase(str) {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    }
    
    ShowForm(event) {
        event.preventDefault();
        var data = $(event.currentTarget).attr('id');
        var empId = $(event.currentTarget).attr('name');
        var bookingNum = $(event.currentTarget).attr('Number');
        var cost = $(event.currentTarget).attr('cost');
        var date = $(event.currentTarget).attr('dateAttr');
        var managerID = $(event.currentTarget).attr('managerID');
        var approvalRequired = $(event.currentTarget).attr('approvalRequired');
        this.setState({ id: data,
                        empID:empId, 
                        bookingNumber:bookingNum , 
                        estimatedCost:cost,
                        bookingDate:moment(date).format('DD/MM/YYYY'),managerID:managerID,approvalRequired:approvalRequired });

        $('.commonSup').show()
        $('.selected').removeClass('selectedBooking');
        $(event.currentTarget).addClass('selectedBooking');

        axios.get('/api/bookingmaster/get/booking/'+data)
            .then((response) => {
                axios.get("/api/categorymaster/get/one/"+response.data.data[0].vehicleCategoryId)
                    .then((res) => {
                        this.setState({
                          category  :res.data.category,
                        })
                    })
                    .catch((error) => {
                        console.log('error: ',error)
                    })
                if(response.data.data[0].purposeOfTravel == "Other"){
                    var purpose = response.data.data[0].purposeOfTravelOther
                  }else{
                    var purpose = response.data.data[0].purposeOfTravel
                  }
                var array = {
                  from    : response.data.data[0].from.address,
                  fromAddress1    : response.data.data[0].from.address1,
                  fromPincode    : response.data.data[0].from.pincode,
                  toAddress1    : response.data.data[0].to.address1,
                  toPincode    : response.data.data[0].to.pincode,
                  pickupDate : response.data.data[0].pickupDate,
                  pickupTime : response.data.data[0].pickupTime,
                  returnDate : response.data.data[0].returnDate,
                  to         : response.data.data[0].to.address,
                  returnTime : response.data.data[0].returnTime,
                  bookingType : response.data.data[0].tripType,
                  purposeOfTravel: purpose,
                  instructions  :response.data.data[0].specialInstruction,
                  selectedVehicle  :this.state.category,
                  stopArr : response.data.data[0].intermediateStops,
                  reasonForSelectingVehicle  :response.data.data[0].reasonForSelectingVehicle,
                  brand:this.state.brand,
                  model:this.state.model,
                  capacity:this.state.capacity,
                }
                this.setState({'tripArray':array,status:response.data.data[0].statusValue ,showDetails:true})
                document.getElementById(response.data[0]._id).classList.add("selectedBooking")
            })
            .catch((error) =>{

            })

    }

    
    render() {
        return (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                <div className="row">
                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOPadding">
                        <section className="content">
                            <div className="pageContent col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                <div className="box-header with-border col-lg-12 col-md-12 col-xs-12 col-sm-12 NOpadding-right">
                                    <h4 className="weighttitle col-lg-11 col-md-11 col-xs-11 col-sm-11 NOpadding-right"><span className="">Pending CR Approval Bookings</span></h4>
                                </div>
                                <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 ">
                                    <div className="col-lg-12 col-md-12 col-xs-12 col-sm-12 frmMargin">
                                        <h5 className="col-lg-6 col-md-6 col-sm-11 col-xs-12">Total Records :&nbsp;&nbsp;<b>{this.state.bookingCount?this.state.bookingCount:"0"}</b></h5>
                                       {/*  <h5 className="col-lg-6 col-md-6 col-sm-11 col-xs-12">Filtered Records :&nbsp;&nbsp;<b>{this.state.bookingData.length}</b></h5>
                                       <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 NOpadding  input-group inputBox-main">
                                            <select onChange={this.handleStatusChange.bind(this)} value={this.state.status} id="status" ref="status" name="status" className="form-control selectStyle">
                                                <option value="Select Status" disabled>Select Status</option>
                                                <option value="All">All</option>
                                                <option value="New">New</option>
                                                <option value="Manager Approved">Approved</option>
                                                <option value="Manager Rejected">Rejected</option>
                                                <option value="Cancelled By User">Cancelled By User</option>
                                            </select>
                                        </div>
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 borderBottomSO"></div>
                                    */}</div>
                                </div>
                               
                                {this.state.bookingData && this.state.bookingData.length > 0 ?
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-6 scrollbar" id="style-2">
                                        <div className="borderlist12">
                                            {
                                                this.state.bookingData.map((data, index) => {
                                                    return (
                                                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 booking_Container cursorStyle selected activeEmployee" key={index} onClick={this.ShowForm.bind(this)} Number={data.bookingId} dateAttr={data.createdAt} cost={data.estimatedCost} name={data.employeeId} approvalRequired={this.state.approvalRequired} managerID={data.managerID1} id={data._id}>
                                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 topBox">
                                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 pull-left nopadding">Booking Number: {data.bookingId}</div>  
                                                            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 pull-right textRight nopadding">
                                                            <TimeAgo className="tripType col-lg-12"
                                                                        datetime={data.createdAt} 
                                                                        locale='vi'
                                                                      />
                                                            </div>
                                                          </div>
                                                          <div className="col-lg-3 col-md-2 col-sm-12 col-xs-12">
                                                              <img className="profileImg" src={data.person[0] && data.person[0].profilePhoto ? data.person[0].profilePhoto : "/images/userIcon.jpg"}/>
                                                          </div>
                                                          <div className="col-lg-9 col-md-9 col-sm-12 col-xs-12 nopadding">
                                                            <label className="nopadding tripType col-lg-12"><b>{data.person[0].firstName+' '+data.person[0].lastName+' (Emp ID: '+(data.person[0].employeeId ? data.person[0].employeeId : 'Guest')+')'}</b></label>
                                                            <label className="nopadding tripType col-lg-12">{data.person[0].contactNo}</label>
                                                            <label className="nopadding tripType col-lg-12">{data.from.city} To {data.to.city}</label>
                                                          </div> 
                                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                            <label className="nopadding tripType col-lg-12">{moment(data.pickupDate).format('LL')} To {moment(data.returnDate).format('LL')}</label>
                                                          </div>
                                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                                                            <label className="tripType col-lg-6 col-md-6 col-sm-12 col-xs-12 pull-left nopadding">Est. Cost {data.estimatedCost}</label>
                                                            <label className="tripType col-lg-6 col-md-6 col-sm-12 col-xs-12 pull-right textRight nopadding">{data.category[0].category}</label>
                                                          </div>
                                                          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 btmBox">
                                                            <span className={data.statusValue == 'New'? "label label-primary pull-right statusStyle" : data.statusValue == 'Manager Approved' ? "label label-success pull-right statusStyle":data.statusValue == 'Manager Rejected' ? "label label-danger pull-right statusStyle":data.statusValue == 'Change Request' ? "label label-warning pull-right statusStyle": "label label-info pull-right statusStyle"}>{data.statusValue}</span>
                                                          </div> 
                                                        </div>
                                                    );
                                                })
                                            }
                                        </div>
                                    </div>
                                    :
                                    <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 text-align-center">
                                        <h5>No Data Found</h5>
                                    </div>
                                }
                                { 
                                this.state.showDetails ?
                                    <div>
                                    {
                                    this.state.id && this.state.bookingData && this.state.bookingData.length > 0 ?
                                    <div className="col-lg-6 col-md-6 col-sm-6 col-xs-12 pickupType nopadding commonSup" id={this.state.id}>
                                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                                        <ul className="col-lg-3"><li>Booking ID</li><li> #{this.state.bookingNumber}</li></ul>
                                        <h5 className="col-lg-6 titleBooking">Booking Details</h5>
                                        <ul className="col-lg-3"><li>Booking Date</li><li> {this.state.bookingDate}</li></ul>
                                       </div>
                                       <div className="col-lg-12 borderDiv"></div>
                                       <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                                       <EmployeeDetails personID={this.state.empID} managerID={this.state.managerID} approvalRequired={this.state.approvalRequired} />                   
                                      </div>
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding" >
                                        <TripDetails personID={this.state.empID} tripData={this.state.tripArray} />                    
                                      </div>
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding" >
                                        <CarDetails personID={this.state.empID} tripData={this.state.tripArray}/>                    
                                      </div>
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                                        <EstimatedCost personID={this.state.empID} cost={this.state.estimatedCost} />                    
                                      </div>
                                      <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 nopadding">
                                        <ManagerApproval personID={localStorage.getItem("user_ID")} status={this.state.status} bookingId={this.state.id} getData={this.getData.bind(this)} />                    
                                      </div>
                                    </div>
                                    :
                                    null
                                    }
                                    </div>
                                    :
                                    null
                                }
                            </div>
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}
export default CRAdminApprovedBookings;
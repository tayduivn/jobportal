import React, { Component } from 'react';
import $ from "jquery";
import jQuery from 'jquery';
import 'jquery-validation';
import PhoneInput from 'react-phone-input-2';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/modal.js';
import 'bootstrap/js/tab.js';
import 'font-awesome/css/font-awesome.min.css';
import './SignUp.css';
import swal from 'sweetalert';
import axios from 'axios';

class SignUp extends Component {

	constructor() {
		super();
		this.state = {
			checkUserExists: 0,
			loggedIn: false,
			employerID : "",
			formerrors: {
				firstNameV: "",
				lastNameV: "",
				mobileV: "",
				emailIDV: "",
			},
			employerArray : [],
			vendor_Id : "",
			currentCompany :"",
	      	firstName  : "",
	      	lastName   : "",
	      	password   : "",
	      	confirmPassword   : "",
	      	emailAddress      : "",
	      	mobileNumber      : "",
		}
		this.handleChange = this.handleChange.bind(this);
	}
	componentWillMount() {

	}
	componentDidMount() {
		
		$(".checkUserExistsError").hide();
		//==============
		axios.get('/api/entitymaster/get/employer')
		.then((response) => {
			console.log('entitymaster==',response.data)

			this.setState({
		        	employerArray : response.data
		        })
		})
		.catch((error) => {
		})
	}
	validateForm=()=>{
    var status = true;
    var tempEmail = this.state.emailAddress.trim(); // value of field with whitespace trimmed off
    var emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/;
    var illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]]/;
    var phoneno = /^\d{10}$/;

    if(this.state.firstName<=0)  {
      document.getElementById("firstNameError").innerHTML=  
      "Please enter valid Name";  
      status=false; 
    }
    else if(this.state.firstName.match(illegalChars)){
      document.getElementById("firstNameError").innerHTML=  
      "Please enter valid name";  
      status=false; 
    }
    else{
      document.getElementById("firstNameError").innerHTML=  
       ""; 
      status = true;
    }

    if(this.state.lastName<=0)  {
      document.getElementById("lastNameError").innerHTML=  
      "Please enter valid Name";  
      status=false; 
    }
    else if(this.state.lastName.match(illegalChars)){
      document.getElementById("lastNameError").innerHTML=  
      "Please enter valid name";  
      status=false; 
    }
    else{
      document.getElementById("lastNameError").innerHTML=  
       ""; 
      status = true;
    }

    if(this.state.emailAddress.length<=0){
      document.getElementById("emailAddressError").innerHTML=  
      "Please enter your Email";  
      status=false; 
    }else if (
      !emailFilter.test(tempEmail)) { //test email for illegal characters
          document.getElementById('emailAddressError').innerHTML = "Please enter a valid email address.";
      } else if (this.state.emailAddress.match(illegalChars)) {
          document.getElementById('emailAddressError').innerHTML = "Email contains invalid characters.";
      }else{
      document.getElementById("emailAddressError").innerHTML=
      ""; 
      status = true;
    }

    if(this.state.mobileNumber.match(phoneno)){
      document.getElementById("mobileNumberError").innerHTML=  
      ""; 
      status = true;
      
    }else{
      document.getElementById("mobileNumberError").innerHTML=  
      "Please enter valid Mobile Number";  
      status=false; 
    }

    if(this.state.password.length<=0){
      document.getElementById("passwordError").innerHTML=  
      "Please enter Password";  
      status=false; 
    }

    if(this.state.password.length<8){
      document.getElementById("passwordError").innerHTML=  
      "Please enter atleast 8 characters";  
      status=false; 
    }
    else{
      document.getElementById("passwordError").innerHTML=  
      ""; 
      status = true;
    }

    if(this.state.confirmPassword.length<=0){
      document.getElementById("confirmPasswordError").innerHTML=  
      "Please enter Confirm Password";  
      status=false; 
    }

    if(this.state.confirmPassword.length<8){
      document.getElementById("confirmPasswordError").innerHTML=  
      "Please enter atleast 8 characters";  
      status=false; 
    }
    else{
      document.getElementById("confirmPasswordError").innerHTML=  
      ""; 
      status = true;
    }

    if ((this.state.password) != (this.state.confirmPassword)){
      document.getElementById("passwordError").innerHTML=  
      "Passwords do not match";  
      document.getElementById("confirmPasswordError").innerHTML=  
      "Passwords do not match"; 
      status=false; 
    }

    return status;
  } 
	usersignup(event) {
		event.preventDefault();
		var status =  this.validateForm();

	    if(status == true){
			var auth = {
				username 		: "EMAIL",
				firstname		: this.state.firstName,
				lastname		: this.state.lastName,
				mobNumber		: (this.state.mobileNumber).replace("-", ""),
				email			: this.state.emailAddress,
				pwd				: this.state.password,
				companyID		: this.state.employerID,
				companyName	: this.state.employerName,
				role			: 'candidate',
				status			: 'unverified',
				"emailSubject"	: "Email Verification", 
				"emailContent"  : "As part of our registration process, we screen every new profile to ensure its credibility by validating email provided by user. While screening the profile, we verify that details put in by user are correct and genuine.",
			}

			
		console.log('auth sign=======',auth)

			axios.post('/api/auth/post/signup/user/otp', auth)
				.then((response) => {
					console.log("signup res===",response.data)
					if(response.data.message == 'USER_CREATED'){
						swal('Great, Information submitted successfully and OTP is sent to your registered Email.');
						localStorage.setItem('previousUrl' ,'signup');
						this.props.history.push("/confirm-otp/" + response.data.ID);
					}else{
						swal(response.data.message);
					}	
				})
				.catch((error) => {
					
				})
		}

	}
	Closepagealert(event) {
		event.preventDefault();
		$(".toast-error").html('');
		$(".toast-success").html('');
		$(".toast-info").html('');
		$(".toast-warning").html('');
		$(".toast-error").removeClass('toast');
		$(".toast-success").removeClass('toast');
		$(".toast-info").removeClass('toast');
		$(".toast-warning").removeClass('toast');
	}

	checkUserExists(event) {
		if (event.target.value != '') {
			axios.get('/get/checkUserExists/' + event.target.value)
				.then((response) => {

					if (response.data.length > 0) {
						$(".checkUserExistsError").show();
						$('.button3').attr('disabled', 'disabled');
						this.setState({ checkUserExists: 1 })

					} else {
						$(".checkUserExistsError").hide();
						$('.button3').removeAttr('disabled');
						this.setState({ checkUserExists: 0 })
					}
				})
				.catch(function (error) {
				})
		} else {
			$(".checkUserExistsError").hide();
		}
	}

	handleChange(event) {
		// var dropDown = this.refs.dropDown.value;
		// console.log("dropDown",dropDown);
		this.setState({
			[event.target.name]: event.target.value
		});
		
	}
	handleChange1(event){
		var comId = event.target.value
		console.log('comId==',comId)
		axios.get('/api/entitymaster/getCompany/'+comId)
		.then((response) => {
			console.log('employerName==',response.data)

			this.setState({
		        	employerID : comId,
		        	employerName : response.data.employerName,
		        	vendor_Id : response.data._id,
		        })
		})
		.catch((error) => {
		})
		
	}
	acceptcondition(event) {
		var conditionaccept = event.target.value;
		if (conditionaccept == "acceptedconditions") {
			$(".acceptinput").removeAttr('disabled');
		} else {
			$(".acceptinput").addAttr('disabled');
		}
	}

	showModal() {
		$(".modalbg").css("display", "block");
	}
	hideModal() {
		$(".modalbg").css("display", "none");
	}
	
	showSignPass() {
		$('.showPwd').toggleClass('showPwd1');
		$('.hidePwd').toggleClass('hidePwd1');
		return $('.inputTextPass').attr('type', 'text');
	}
	hideSignPass() {
		$('.showPwd').toggleClass('showPwd1');
		$('.hidePwd').toggleClass('hidePwd1');
		return $('.inputTextPass').attr('type', 'password');
	}
	proceed() {

	}
	render() {
		return (
			<section className="container-fluid registrationFormWrapper">
                <div className="registrationForm col-lg-4 col-lg-offset-4">
                  <form>

                    <div className="signUpTitle col-lg-12">Sign Up
                    </div>

                    <hr className="registrationHr"/>

                   
                    {/*<div className="form-group col-lg-12">
                        <div className="input-group">
                        <span className="input-group-addon registrationInputIcon1"><i className="fa fa-envelope"></i></span>
                        <select className="form-control col-lg-12 registrationInputBox registrationCompany" id="currentCompany" name="currentCompany" value={this.state.currentCompany} onChange={this.handleChange1.bind(this)}>
                        <option className="registrationInputBox">Enter your Company </option>
                            {
                        this.state.employerArray.length ? 
                        this.state.employerArray.map((elem,index)=>{
                          return(<option value={elem._id}>{elem.companyName}</option>)
                        }):
                         null
                      }
                         </select>                      
                        </div>
                    </div>*/}


                    <div className="col-lg-12 form-group" >
                        <div className="input-group">
                            <span className="input-group-addon registrationInputIcon"><i className="fa fa-user"></i></span>
                            <input type="text" id="firstName" name="firstName" placeholder="First Name" value={this.state.firstName} onChange={this.handleChange.bind(this)} className="form-control registrationInputBox"/>
                        </div>
                         <span id="firstNameError" className="errorMsg"></span>
                    </div>

                    <div className="col-lg-12 form-group" >
                        <div className="input-group">
                            <span className="input-group-addon registrationInputIcon"><i className="fa fa-user"></i></span>
                            <input type="text" id="lastName" name="lastName" placeholder="Last Name" value={this.state.lastName} onChange={this.handleChange.bind(this)} className="form-control registrationInputBox"/>
                        </div>
                         <span id="lastNameError" className="errorMsg"></span>
                    </div>

                   
                    <div className="col-lg-12 form-group" >
                        <div className="input-group">
                            <span className="input-group-addon registrationInputIcon1"><i className="fa fa-envelope"></i></span>
                            <input type="email" id="emailAddress" name="emailAddress" placeholder="Email Address" value={this.state.emailAddress} onChange={this.handleChange.bind(this)} className="form-control registrationInputBox"/>
                        </div>
                         <span id="emailAddressError" className="errorMsg"></span>
                    </div>

                    <div className="col-lg-12 form-group" >
                        <div className="input-group">
                            <span className="input-group-addon registrationInputIcon"><i className="fa fa-mobile"></i></span>
                            <input type="tel" id="mobileNumber" name="mobileNumber" placeholder="Mobile Number" value={this.state.mobileNumber} onChange={this.handleChange.bind(this)} className="form-control registrationInputBox"/>
                        </div>
                         <span id="mobileNumberError" className="errorMsg"></span>
                    </div>

                     <div className="col-lg-12 form-group" >
                        <div className="input-group">
                            <span className="input-group-addon registrationInputIcon"><i className="fa fa-lock"></i></span>
                            <input type="password" id="password" name="password" placeholder="Password" value={this.state.password} onChange={this.handleChange.bind(this)} className="form-control registrationInputBox"/>
                        </div>
                         <span id="passwordError" className="errorMsg"></span>
                    </div>

                    <div className="col-lg-12 form-group" >
                        <div className="input-group">
                            <span className="input-group-addon registrationInputIcon"><i className="fa fa-lock"></i></span>
                            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" value={this.state.confirmPassword} onChange={this.handleChange.bind(this)} className="form-control registrationInputBox"/>
                        </div>
                         <span id="confirmPasswordError" className="errorMsg"></span>
                    </div>


                    <div className="col-lg-12 buttonWrapper">
                   <button className="btn col-lg-12 buttonSignUp" onClick={this.usersignup.bind(this)}>Sign Up</button>
                  </div>

                  <div className="col-lg-12 registrationLinks">
                        <a className="alreadyAccount" href="/login"><u>Already have an Account?Sign In</u></a>
                      </div>

                </form>
              </div>
         </section>
		);
	}
}
export default SignUp;
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch,Link,location } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginForm.css';
import $ from 'jquery';
import axios from 'axios';
import jQuery from 'jquery';
import 'jquery-validation';
import swal from 'sweetalert';
import { connect }        from 'react-redux';
import { bindActionCreators } from 'redux';
import  * as mapActionCreator from '../../jobportaladmin/Common/actions/index';

class Login extends Component {

  constructor() {
    super();
    this.state = {
      btnLoading: false,
      loggedIn: false,
      auth: {
        email: '',
        pwd: '',
      },
      messageData: {
        "type": "",
      }
    }
  }
  validateForm=()=>{
    var status = true;
    // var tempEmail = this.state.email.trim(); // value of field with whitespace trimmed off
    //   var emailFilter = /^[^@]+@[^@.]+\.[^@]*\w\w$/;
       var illegalChars = /[\(\)\<\>\,\;\:\\\"\[\]]/;
       var phoneno = /^\d{10}$/;

    if(this.state.loginusername.match(phoneno)){
      document.getElementById("loginusernameError").innerHTML=  
      ""; 
      status = true;
      
    }else{
      document.getElementById("loginusernameError").innerHTML=  
      "Please enter valid Mobile Number";  
      status=false; 
    }
    if(this.state.password.length<=0){
      document.getElementById("passwordError").innerHTML=  
      "Please enter Password";  
      status=false; 
    }
    else{
      document.getElementById("passwordError").innerHTML=  
      ""; 
      status = true;
    }

    return status;
  } 
  componentDidMount() {

    
  }
  handleChange(event){
      var fieldValue=event.currentTarget.value;
      // console.log("fieldValue",fieldValue);
       var fieldKey=event.currentTarget.name;
       console.log("fieldKey",fieldKey);
      this.setState({
        [fieldKey]:fieldValue
      });    
  }

  
  userlogin(event) {
      event.preventDefault();
      var auth = {
        email: this.refs.loginusername.value,
        password: this.refs.loginpassword.value,
        role: "admin"
      }
      var status =  this.validateForm();
      if (status) {
      
        this.setState({ btnLoading: true });
        axios.post('/api/auth/post/login', auth)
          .then((response) => {
            console.log("response login",response);
            if (response.data.ID) {
              this.setState({ btnLoading: false });
              var userDetails = {
                loggedIn    : true,
                firstName: response.data.userDetails.firstName,
                lastName: response.data.userDetails.lastName,
                email: response.data.userDetails.email,
                phone: response.data.userDetails.phone,
                //companyID : parseInt(response.data.userDetails.companyID),
                pincode: response.data.userDetails.pincode,
                user_id: response.data.userDetails.user_id,
                roles: response.data.userDetails.roles,
                token: response.data.userDetails.token,
              }
             
              localStorage.setItem("token", response.data.token);
              localStorage.setItem("user_ID", response.data.ID);
              localStorage.setItem("roles", response.data.roles);
              //localStorage.setItem("companyID", response.data.userDetails.companyID);
              localStorage.setItem('userDetails', JSON.stringify(userDetails));
              
              this.setState({
                loggedIn: true
              }, () => {
                var {mapAction} = this.props;
                mapAction.setUserDetails(userDetails);
                this.props.history.push('/')
                window.location.reload();

              })
            } else if (response.data.message === "USER_BLOCK") {
              swal({
                text: "You are blocked by admin. Please contact Admin."
              });
              
            } else if (response.data.message === "NOT_REGISTER") {
              swal({
                text: "This Email ID is not registered. Please try again."
              });
             
            } else if (response.data.message === "INVALID_PASSWORD") {
              swal({
                text: "You have entered wrong password. Please try again."
              });
              
            } else if (response.data.message === "USER_UNVERIFIED") {
              swal({
                text: "You have not verified your account. Please verify your account."
              })
                .then((value) => {
                  var emailText = {
                    "emailSubject": "Email Verification",
                    "emailContent": "As part of our registration process, we screen every new profile to ensure its credibility by validating email provided by user. While screening the profile, we verify that details put in by user are correct and genuine.",
                  }
                  axios.patch('/api/auth/patch/setsendemailotpusingEmail/' + this.refs.loginusername.value, emailText)
                    .then((response) => {
                      swal("We send you a Verification Code to your registered email. Please verify your account.");
                      this.props.history.push("/confirm-otp/" + response.data.userID);
                    })
                    .catch((error) => {
                      swal(" Failed to sent OTP");
                    })
                });
            }
          })
          .catch((error) => {
            console.log("error", error);
            swal({
              text: "Please enter valid Email ID and Password"
            })
            this.setState({ btnLoading: false });
            // document.getElementById("logInBtn").value = 'Sign In';
            // if (localStorage !== null) {
            // }
          });

      }
  }
    
  showSignPass() {
    $('.showPwd').toggleClass('showPwd1');
    $('.hidePwd').toggleClass('hidePwd1');
    return $('#loginpassword').attr('type', 'text');
  }
  hideSignPass() {
    $('.showPwd').toggleClass('showPwd1');
    $('.hidePwd').toggleClass('hidePwd1');
    return $('#loginpassword').attr('type', 'password');
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
  render() {
    return (
      <div className="loginFormOuter col-lg-12">
            

            <div className="loginFormInner col-lg-4 col-lg-offset-4">
              <form>
                <div className="signInTitle col-lg-12">Sign In
                </div>                
                <div className="col-lg-12 form-group loginFormGroup" >
                  <div className="input-group">
                    <span className="loginInputIcon1 input-group-addon "><i className="fa fa-mobile"></i></span>
                    <input type="tel" id="loginusername" name="loginusername" placeholder="Email Id" value={this.state.loginusername} ref="loginusername" onChange={this.handleChange.bind(this)} className="form-control loginInputBox"/>
                  </div>
                  <span id="loginusernameError" className="errorMsg"></span>
                </div>

                <div className="col-lg-12 form-group" >
                  <div className="input-group">
                    <span className="input-group-addon loginInputIcon2"><i className="fa fa-lock"></i></span>
                    <input type="password" id="password" name="password" placeholder="Password" value={this.state.password} ref="loginpassword" onChange={this.handleChange.bind(this)} className="form-control loginInputBox"/>
                    <span className="input-group-addon loginInputIcon3"><i className="fa fa-eye" onClick={this.showSignPass.bind(this)}></i></span>
                  </div>
                  <span id="passwordError" className="errorMsg"></span>
                </div>

                <div className="col-lg-12 buttonWrapper">
                 <button className="btn col-lg-12 buttonSignIn" onClick={this.userlogin.bind(this)}>Sign In</button>
                </div>

                <div className="col-lg-12 loginLinks">
                  <div className="row">
                    
                    <div className="col-lg-12">
                      <a className="loginForgotPassword" href="/forgot-password"><u>Forgot Password?</u></a>
                    </div>
                  </div>  
                </div>
              </form>
            </div>
          </div>
    );
  }
}

const mapStateToProps = (state)=>{
  return {
    userDetails   : state.userDetails,
  }
};

const mapDispatchToProps = (dispatch) => ({
  mapAction :  bindActionCreators(mapActionCreator, dispatch)
}) 

export default connect(mapStateToProps, mapDispatchToProps)(Login);


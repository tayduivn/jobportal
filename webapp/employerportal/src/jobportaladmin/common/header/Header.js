import React,{Component} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Header.css';

class Header extends Component{
  constructor(props){
    super(props);
    this.state={
      profileDisplay  : "none",
      asideDisplay  : "none",
      notificationDisplay  : "none",
    }
  }
  profileInfo(event){

    if(this.state.profileDisplay==="none"){
  
      this.setState({
      profileDisplay  : "block",
      })
    }
    else{
      this.setState({
      profileDisplay  : "none",
      })
    }
  }
  asideBar(event){

    if(this.state.asideDisplay==="none"){
  
      this.setState({
      asideDisplay  : "block",
      })
    }
    else{
      this.setState({
      asideDisplay  : "none",
      })
    }
  }
  notificationBar(event){

    if(this.state.notificationDisplay==="none"){
  
      this.setState({
      notificationDisplay  : "block",
      })
    }
    else{
      this.setState({
      notificationDisplay  : "none",
      })
    }
  }
  logout() {
        var token = localStorage.removeItem("token");
        //alert()
        if (token !== null && token !== "undefined") {
            this.setState({
                loggedIn: false
            })
        }
        window.location.href = "/";
        //this.props.history.push("/")
  }
  render(){
    return(
        

        <div className="headerWrapper col-lg-12">
          <div className="row">
            <div className="headerLogoWrapper col-lg-8">
              <a href="/"><img src="/images/1.png" alt="ijobs logo"/></a>
            </div>
            <div className="headerMenuWrapper col-lg-4">
              <div className="row"> 
                <div className="headerJobWrapper">
                  <div className="headerJob">
                    <i className="fa fa-user"></i>Post Job 
                  </div>
                </div>
                <div className="headerBellWrapper ">
                  <i className="fa fa-bell-o " onClick={this.notificationBar.bind(this)}></i>
                  <div className="headerBellbadge">1</div>
                  <div className="notificationBox" id="notificationBox" style={{display:this.state.notificationDisplay}}>
                    <div className="notificationCount col-lg-12">
                      15 Notification
                    </div>
                    <div className="notificationMessege col-lg-12">
                      <FontAwesomeIcon icon="envelope" />
                      <span className="notificationMessegeText">4 New Messages</span>
                      <span className="MessagesTime pull-right">2 Mins</span>
                    </div>
                    <div className="notificationMessege col-lg-12">
                      <FontAwesomeIcon icon="users" />
                      <span className="notificationMessegeText">8 job Request</span>
                      <span className="MessagesTime pull-right">2 Hours</span>
                    </div>
                    <div className="notificationMessege col-lg-12">
                      <FontAwesomeIcon icon="file-alt" />
                      <span className="notificationMessegeText">3 New Reports</span>
                      <span className="MessagesTime pull-right">2 Days</span>
                    </div>
                    <div className="notificationCount col-lg-12">
                      See All Notifications
                    </div>
                  </div>
                </div>
                <div className="headerProfileWrapper ">
                  <div className="headerProfileInfo">
                    <span className="headerProfileName">
                      Hello, John doe
                    </span>
                    <img className="headerProfileImg" src='/images/profilelogo.jpeg' alt="logo" onClick={this.profileInfo.bind(this)} />
                    <i className="fa fa-caret-down profileDownArrow" onClick={this.profileInfo.bind(this)}></i>
                  </div>
                  <div className="signOutToggel" id="signOutToggel" style={{display:this.state.profileDisplay}}>
                    <div className="signOutToggelProfileImg">
                      <img src='/images/profilelogo.jpeg' alt="logo"  />
                    </div>
                    <div className="signOutToggelProfileName">
                      Hello, John doe
                    </div>
                    <div className="signOutToggelButtons">
                      <div className="col-lg-5 pull-left">
                        <div className="row">
                          <a href="/profile" className="whitelink"><div className="signOutButton">Profile</div></a>
                        </div>
                      </div>
                      
                      <div className="col-lg-5 pull-right">
                        <div className="row">
                          <div className="signOutButton" onClick={this.logout.bind(this)}>Sign Out</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="headerToggelWrapper ">
                  <div className="headerToggel" onClick={this.asideBar.bind(this)}>
                    <FontAwesomeIcon icon="align-right" />
                  </div>
                </div>
                <div className="barsToggel pull-right" id="barsToggel" style={{display:this.state.asideDisplay}}>
                  <div className="notificationMessege col-lg-12">
                    <FontAwesomeIcon icon="bag" />
                    <span className="notificationMessegeText">Jobs</span>
                  </div>
                  <div className="notificationMessege col-lg-12">
                     
                      <span className="notificationMessegeText">Recruiters</span>
                  </div>
                  <div className="notificationMessege col-lg-12">
                      <FontAwesomeIcon icon="mobile" />
                      <span className="notificationMessegeText">Companies</span>
                  </div>
                  <div className="notificationMessege col-lg-12">
                      <FontAwesomeIcon icon="mobile" />
                      <span className="notificationMessegeText">Employer Login</span>
                  </div>                    
                  <div className="notificationMessege col-lg-12">
                      <FontAwesomeIcon icon="sign-out-alt" />
                      <span className="notificationMessegeText">Sign Out</span>
                  </div>
                </div>
                
              </div>

            </div>
          </div>
        </div>



      );
  }
}

export default Header;
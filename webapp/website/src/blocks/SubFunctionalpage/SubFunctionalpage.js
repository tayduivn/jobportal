import React, { Component } from 'react';
import India from '../../maps/India/India.js';
import SubFunctionalAreawiseJobs from '../SubFunctionalAreawiseJobs/SubFunctionalAreawiseJobs.js';
import IndustrywiseJobs from '../IndustrywiseJobs/IndustrywiseJobs.js';
import LeftSideFilters from '../LeftSideFilters/LeftSideFilters.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './SubFunctionalpage.css';

export default class SubFunctionalPage extends Component {

  constructor(props){
    super(props);
    this.state={
      leftDrawerDisplay  : "-350px",
      arrowToggle: false  
    }
  }

  leftDrawerInfo(event){

    if(this.state.leftDrawerDisplay==="-350px"){
  
      this.setState({
      leftDrawerDisplay  : "0px",
      arrowToggle: true
      
      })
    }
    else{
      this.setState({
      leftDrawerDisplay  : "-350px",
      arrowToggle:false
      })
    }
  }

  render() {
    return (
      <div className="ViewBodyWrapper container-fluid">
        
          <div className="filterDiv col-lg-12">

            <div className="row">
              <div className="filterButton" onClick={this.leftDrawerInfo.bind(this)}>
                <i className="fa fa-filter filtersIcon" ></i>
                <i className={this.state.arrowToggle ? "fa fa-arrow-left arrowIcon" : "fa fa-arrow-right arrowIcon"} 
                              value={this.state.arrowToggle}></i>

              </div>
            </div>
          </div>

          <div className="col-lg-3">
            <div className='row'>
                <div className="viewWrapper col-lg-4">
                  <div className='row'>
                    <ul className="nav nav-pills">
                      <li className="viewDiv active"><a data-toggle="pill" href="#mapwise"> Map <br/> View</a></li>
                      <li className="viewDiv"><a data-toggle="pill" href="#functionwise">Functional <br/> View</a></li>
                      <li className="viewDiv"><a data-toggle="pill" href="#industrywise">Industrial <br/> View</a></li>
                    </ul>
                  </div>  
                </div>

                <div className="filterWrapper col-lg-8" style={{left:this.state.leftDrawerDisplay}}>
                  <div className='row'>
                    <LeftSideFilters />
                  </div>
                </div>
            </div>
          </div>

          <div className="col-lg-9">
            <div className="tab-content">
              <div id="mapwise" className="tab-pane fade in active">
                <India />
              </div>

              <div id="functionwise" className="tab-pane fade">
                <SubFunctionalAreawiseJobs />
              </div>

              <div id="industrywise" className="tab-pane fade">
                <IndustrywiseJobs />
              </div>
            </div>
          </div>
         
      </div>
    );
  }
}

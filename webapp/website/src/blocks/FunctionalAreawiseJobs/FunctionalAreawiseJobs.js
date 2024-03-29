import React, {Component} from 'react';
import Axios                from 'axios';
import Swal                 from 'sweetalert2';
import './FunctionalAreawiseJobs.css';

export default class FunctionalAreawiseJobs extends Component{


  render(){

    return(
            <div className="row"> 
                <section className="col-lg-12 AllJobsWrapper">
                    <div className="row">
                        {
                            this.props.functionalJobs.length > 0
                            ?
                                this.props.functionalJobs.map((elem,index)=>{
                                    console.log("functionalJobselements",elem.functionalarea[0]);
                                    return(
                                        <div className="col-lg-3 AllJobsRow">
                                            <div className="col-lg-12 AllJobsBlock">
                                                <div className="AllJobsBlockImg">
                                                  <img src={elem.functionalarea[0].iconUrl} alt="FunctionJobsImg" className="FunctionalJobsPng"/>
                                                </div>

                                                <div className="AllJobsBlockName">
                                                    {elem.functionalarea[0].functionalArea}
                                                </div>

                                                <div className="AllJobsBlockNumber">
                                                    {elem.count}
                                                </div>
                                            </div>   
                                        </div>
                                    );
                                })
                            :
                            null
                        }
                    </div>                  
                </section>
            </div>
        );
    }
}
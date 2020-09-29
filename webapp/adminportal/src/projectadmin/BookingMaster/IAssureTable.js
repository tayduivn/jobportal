import React, { Component }       	from 'react';
import {Route, withRouter} 			from 'react-router-dom';
import swal                     	from 'sweetalert';
import axios 						from 'axios';
import $ 							from 'jquery';
import jQuery 						from 'jquery';
import moment                   from 'moment';
import BookingProfile 			from './BookingProfile.js'

import 'jquery-validation';
import './IAssureTable.css';
var sum = 0;
class IAssureTable extends Component {
	constructor(props){
		super(props);
		this.state = {
		    "dataCount" 				: props && props.dataCount ? props.dataCount : [],
		    "tableData" 				: props && props.tableData ? props.tableData : [],
		    "vendorData" 				: [],
		    "tableHeading"				: props && props.tableHeading ? props.tableHeading : {},
		    "twoLevelHeader" 			: props && props.twoLevelHeader ? props.twoLevelHeader : {},
		    "tableObjects" 				: props && props.tableObjects ? props.tableObjects : {},		    
		    "reA" 						: /[^a-zA-Z]/g,
		    "reN" 						: /[^0-9]/g,
		    "sort" 	  					: true,
		    "examMasterData2" 			: '',
		    "activeClass" 				: 'activeCircle',
		    "paginationArray" 			: [],
		    "startRange" 				: 0,
		    "limitRange" 				: 10,
		    "activeClass" 				: 'activeCircle', 		    
		    "normalData" 				: true,
		    "callPage" 					: true,
		    "pageCount" 				: 0,
		    "valI" 						: 1	,
		    "vendor" 					: "Select Vendor",
		    "showDiv" 					: false,
		    "id" 						:"",
		    "token" 						:"",
		}
	}
	componentDidMount() {
      $("html,body").scrollTop(0); 
      this.setState({
      	tableHeading	: this.props.tableHeading,
      	tableData 		: this.props.tableData,
      	dataCount 		: this.props.dataCount,
      });
      this.paginationFunction();
	}
	componentWillReceiveProps(nextProps) {
		if(this.state.callPage  ===  true){
        	this.paginationFunction();
        }
        this.setState({
            tableData	    : nextProps.tableData,
            dataCount 		: nextProps.dataCount,
        })   
    
    }

	// edit(event){
	// 	event.preventDefault();
	// 	$("html,body").scrollTop(0);
	// 	var tableObjects =  this.props.tableObjects;
	// 	var id = (event.target.id).replace(".", "/");;
	// 	this.props.history.push(tableObjects.editUrl+id);
	// }
 //    delete(e){
	//   	e.preventDefault();
	//   	var tableObjects =  this.props.tableObjects;
	// 	let id = (e.target.id).replace(".", "/");
	// 	axios({
	//         method: tableObjects.deleteMethod,
	//         url: tableObjects.apiLink+'/delete/'+id
	//     }).then((response)=> {
	//     	this.props.getData(this.state.startRange, this.state.limitRange);
	// 		swal({
	// 			title : response.data.message,
	// 		  });
	//     }).catch( (error)=> {
	//         console.log('error', error);
	//     });
 //    } 
    sortNumber(key, tableData){
    	var nameA = '';
    	var nameB = '';
    	var reA = /[^a-zA-Z]/g;
		var reN = /[^0-9]/g;
		var aN = 0;
		var bN = 0;
		var sortedData = tableData.sort((a, b)=> {
    		Object.entries(a).map( 
				([key1, value1], i)=> {
					if(key === key1){
						nameA = value1.replace(reA, "");				
					}
				}
			);
			Object.entries(b).map( 
				([key2, value2], i)=> {
					if(key === key2){
						nameB = value2.replace(reA, "");
					}
				}
			);
			if(this.state.sort === true){
				this.setState({
					sort 	  : false
				})
				if (nameA === nameB) {
					Object.entries(a).map( 
						([key1, value1], i)=> {
							if(key === key1){
								aN = parseInt(value1.replace(reN, ""), 10);				
							}
						}
					);
					
					Object.entries(b).map( 
						([key1, value1], i)=> {
							if(key === key1){
								bN = parseInt(value1.replace(reN, ""), 10);					
							}
						}
					);

					if (aN < bN) {
						return -1;
					}
					if (aN > bN) {
						return 1;
					}
					return 0;

				} else {

					if (nameA < nameB) {
						return -1;
					}
					if (nameA > nameB) {
						return 1;
					}
					return 0;
				}
			}else if(this.state.sort === false){
				this.setState({
					sort 	  : true
				})
				if (nameA === nameB) {
					Object.entries(a).map( 
						([key1, value1], i)=> {
							if(key === key1){
								aN = parseInt(value1.replace(reN, ""), 10);			
							}
						}
					);
					
					Object.entries(b).map( 
						([key1, value1], i)=> {
							if(key === key1){
								bN = parseInt(value1.replace(reN, ""), 10);					
							}
						}
					);

					if (aN > bN) {
						return -1;
					}
					if (aN < bN) {
						return 1;
					}
					return 0;

				} else {

					if (nameA > nameB) {
						return -1;
					}
					if (nameA < nameB) {
						return 1;
					}
					return 0;
				}
			}				
		});
		this.setState({
			tableData : sortedData,
		});
    }
    sortString(key, tableData){
    	var nameA = '';
    	var nameB = '';
    	var sortedData = tableData.sort((a, b)=> {
		Object.entries(a).map( 
			([key1, value1], i)=> {
				if(key === key1){
					if(jQuery.type( value1 ) === 'string'){
						nameA = value1.toUpperCase();
					}else{
						nameA = value1;
					}						
				}
			}
		);
		Object.entries(b).map( 
			([key2, value2], i)=> {
				if(key === key2){
					if(jQuery.type( value2 ) === 'string'){
						nameB = value2.toUpperCase();
					}else{
						nameB = value2;
					}	
				}
			}
		);
			if(this.state.sort === true){	
				this.setState({
					sort 	  : false
				})		
				if (nameA < nameB) {
					return -1;
				}
				if (nameA > nameB) {
					return 1;
				}
				return 0;
			}else if(this.state.sort === false){
				this.setState({
					sort 	  : true
				})	
				if (nameA > nameB) {
					return -1;
				}
				if (nameA < nameB) {
					return 1;
				}
				return 0;
			}
		});
		this.setState({
			tableData : sortedData,
		});
    }
    sort(event){
    	event.preventDefault();
    	var key = event.target.getAttribute('id');
    	var tableData = this.state.tableData;
		if(key === 'number'){
			this.sortNumber(key, tableData);
		}else{
			this.sortString(key, tableData);
		}
    }
   	paginationFunction(event){
		var dataLength = this.state.dataCount;
		const maxRowsPerPage = this.state.limitRange;
		var paginationNum = dataLength/maxRowsPerPage;
		var pageCount = Math.ceil(paginationNum) > 20? 20 : Math.ceil(paginationNum);
		this.setState({
			valI : 1,
			pageCount : pageCount,
			// callPage : false
		})
		this.showPagination(1, pageCount);
		
	}
	showPagination(valI, pageCount){
		var paginationArray = [];
		for (var i=valI; i<=pageCount;i++){
			var countNum = this.state.limitRange * i;
			var startRange = countNum - this.state.limitRange;
			if(i === 1){
				var activeClass = 'activeCircle';
			}else{
				activeClass = '';
			}
			paginationArray.push(
				<li key={i} className={"queDataCircle page-link "+activeClass+" parseIntagination"+i} id={countNum+'|'+startRange} onClick={this.getStartEndNum.bind(this)} title={"Click to jump on "+i+ " page"}>{i}</li>
			);
		}
		if(pageCount>=1){				
			this.setState({
				paginationArray : paginationArray,
			},()=>{
			});
		}
		return paginationArray;
	}
	getStartEndNum(event){	
		event.preventDefault();
		var limitRange = $(event.target).attr('id').split('|')[0];
		var limitRange2     = parseInt(limitRange);
		var startRange = parseInt($(event.target).attr('id').split('|')[1]);
		this.props.getData(startRange, limitRange);
		this.setState({
			startRange:startRange,
			limitRange : limitRange2,
			callPage : false
		});
		$('li').removeClass('activeCircle');
		$(event.target).addClass('activeCircle');
		var counter = $(event.target).text();
	}
	setLimit(event){
		event.preventDefault();
		var limitRange = parseInt(this.refs.limitRange.value);
		var startRange = 0;
		this.setState({
			"limitRange":limitRange,
			"startRange":0

		},()=>{
			$('li').removeClass('activeCircle');
			this.paginationFunction();
			if(this.state.normalData === true){
				this.props.getData(startRange, this.state.limitRange);
			}	
			if(this.state.searchData === true){
				this.tableSearch();
			}
		});	
	}
	tableSearch(){
    	var searchText = this.refs.tableSearch.value;
		if(searchText && searchText.length !== 0) {
			this.setState({
				"normalData"  : false,
				"searchData"  : true,
			},()=>{
				this.props.getSearchText(searchText, this.state.startRange, this.state.limitRange);
			});	    	
	    }else{
			this.props.getData(this.state.startRange, this.state.limitRange);
	    }    	 
    }
    showNextPaginationButtons(){
    	var dataLength = this.state.dataCount;
		const maxRowsPerPage = this.state.limitRange;
		var paginationNum = dataLength/maxRowsPerPage;
		var pageCount = Math.ceil(paginationNum);

		var addInValI = this.state.valI+20;
		var addInPageCount = this.state.pageCount+20 > pageCount ? (pageCount) : this.state.pageCount+20;

		this.setState({
			valI 		: addInValI,
			pageCount 	: addInPageCount
		},()=>{

			this.showPagination(this.state.valI, this.state.pageCount);
		})
    }
    showPreviousPaginationButtons(){
    	var dataLength = this.state.dataCount;
		const maxRowsPerPage = this.state.limitRange;
		var paginationNum = dataLength/maxRowsPerPage;
		var pageCount = Math.ceil(paginationNum);

		var subFromValI = this.state.valI-20 < 1 ? 1 : this.state.valI-20;
		// var subFromPageCount = this.state.pageCount-20 < 20 ? 20 : this.state.pageCount-20 ;
		var subFromPageCount = subFromValI+19 ;

		this.setState({
			valI 		: subFromValI,
			pageCount 	: subFromPageCount
		},()=>{

			this.showPagination(this.state.valI, this.state.pageCount);
		})
    }
    showFirstTweentyButtons(){
		this.setState({
			valI 		: 1,
			pageCount 	: 20
		},()=>{
			this.showPagination(this.state.valI, this.state.pageCount);
		})
    }
    showLastTweentyButtons(){
    	var dataLength = this.state.dataCount;
		const maxRowsPerPage = this.state.limitRange;
		var paginationNum = dataLength/maxRowsPerPage;
		var pageCount = Math.ceil(paginationNum);

		this.setState({
			valI 		: pageCount-19,
			pageCount 	: pageCount
		},()=>{
			
			this.showPagination(this.state.valI, this.state.pageCount);
		})
    }

    showModal(event){
    	event.preventDefault();
    	var token = $(event.target).attr('token');
    	var city = $(event.target).attr('city');
    	var lat = $(event.target).attr('lat');
    	var lng = $(event.target).attr('lng');
    	var idVar = '#myModal-'+token
    	$(idVar).show()
    	var id = $(event.target).attr('id');
    	$("html,body").scrollTop(0);
    	this.setState({showDiv:true,id:id,token:token})
    	console.log('city=>',city,lat,lng)
    	axios.get('/api/entitymaster/get/getAllNearbyVendors/'+city+'/'+lat+'/'+lng)
	    .then((res)=>{
	      this.setState({'vendorData':res.data})
	    })
	    .catch((err)=>{console.log('error: ',err)})
    }

    hideModal(event){
    	event.preventDefault();
    	$("html,body").scrollTop(0);
    	this.setState({showDiv:false})
    	var token = $(event.target).attr('token');
    	var idVar = '#myModal-'+token
    	$(idVar).hide()
    	// $('#myModal').hide();
    	$(".modal-backdrop").remove();
    }

    getVendor(event){
    	const target = event.target;
        this.setState({
            vendor: event.target.value,
        });
     //    var formvalues={
	    //   bookingID: id,
	    //   status  : {
	    //                 value      : "Allocated To Vendor",
	    //                 statusBy   : localStorage.getItem("user_ID"),
	    //                 allocatedToVendor : event.target.value,
	    //                 statusAt   : new Date(),
	    //             },
	    // }

	    
	    // axios.patch("/api/bookingmaster/patch/status",formvalues)
	    // .then((response) => {
	    // 	this.setState({
	    // 		showDiv:false,
	    // 		id:""
	    // 		// statusAfterAllocation : true
	    // 	})

	    //     this.props.history.push('/All_Bookings');
	    //     window.location.reload();
	    // })
	    // .catch((error) =>{
	    // 	swal(error)
	    // })
    }

    allocateVendor(event){
    	event.preventDefault();
    	var id = this.state.id;
        var formvalues={
	      bookingID: id,
	      status  : {
	                    value      : "Allocated To Vendor",
	                    statusBy   : localStorage.getItem("user_ID"),
	                    allocatedToVendor : this.state.vendor,
	                    statusAt   : new Date(),
	                },
	    }

	    
	    axios.patch("/api/bookingmaster/patch/status",formvalues)
	    .then((response) => {
	    	this.setState({
	    		showDiv:false,
	    		// id:""
	    		// statusAfterAllocation : true
	    	})
	    	
	    	var token =this.state.token;
	    	var idVar = '#myModal-'+token
	    	$(idVar).hide()
	    	// $('#myModal').hide();
	    	$(".modal-backdrop").remove();
	    	this.props.getData();
	    	// if(token === 'D'){
	    	// 	this.props.getData();
	    	// }else if(token === 'W'){
	    	// 	this.props.getWeeklyData();
	    	// }else if(token === 'M'){
	    	// 	this.props.getMonthlyData();
	    	// }else if(token === 'Y'){
	    	// 	this.props.getYearlyData();
	    	// }else{
	    	// 	this.props.getCustomData();
	    	// }
	    	
		    
	    	axios.get('/api/bookingmaster/get/vendor/'+id)
	    	.then((result)=>{
	    		console.log('result.data.employeeID: ',result.data.employeeID)
	    		this.setState({token:""})
	    		var sendData = {
		          "event": "Event13",
		          "toUser_id": result.data.employeeID,
		          "toUserRole":"employee",
		          "company_id": this.state.vendor,
		          "otherAdminRole":'vendoradmin',
		          "variables": {
		            "VendorName" : result.data.vendorDetails.profile.fullName,
		            "companyName" : result.data.vendorDetails.profile.companyName,
		            "contactNo":result.data.vendorDetails.profile.mobile,
		     		"EmployeeName" : result.data.firstName +' '+result.data.lastName,
	                "EmployeeID" : result.data.employeeId,
		            "BookingID":result.data.bookingId,
		     		"Pickup":result.data.from,
		     		"Drop":result.data.to,
		     		"PickupDate":moment(result.data.pickupDate).format('DD/MM/YYYY'),
		     		"ReturnDate":moment(result.data.returnDate).format('DD/MM/YYYY'),
		          }
            }
          console.log('sendDataToUser==>', sendData)
          axios.post('/api/masternotifications/post/sendNotification', sendData)
          .then((res) => {
          console.log('sendDataToUser in result==>>>', res.data)
          this.setState({
		    		id:"",
		    		vendor:""
		    	})
           // this.props.history.push('/All_Bookings');
	        // window.location.reload();
          })
          .catch((error) => { console.log('notification error: ',error)
          	this.setState({
		    		id:"",
		    		vendor:""
		    	})
           // this.props.history.push('/All_Bookings');
	        // window.location.reload();
      		})
	    	})
	    	.catch((error)=>{console.log(error)})

	    	

	    })
	    .catch((error) =>{
	    	swal(error)
	    })
    }

	render() {
		return (
	       	<div id="tableComponent" className="col-lg-12 col-sm-12 col-md-12 col-xs-12">
				{this.state.tableObjects.paginationApply === true ?
					<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 paddingLeftCss">
						<label className="col-lg-12 col-md-12 col-sm-12 col-xs-12  NOpadding">Data Per Page</label>
						<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">
							<select onChange={this.setLimit.bind(this)} value={this.state.limitRange} id="limitRange" ref="limitRange" name="limitRange" className="col-lg-12 col-md-12 col-sm-6 col-xs-12  noPadding  form-control">
								<option value="Not Selected" disabled>Select Limit</option>
								<option value={10}>10</option>
								<option value={25}>25</option>
								<option value={50}>50</option>
								<option value={100}>100</option>
								<option value={500}>500</option>
							</select>
						</div>
					</div> 
					:
					<div className="col-lg-4 col-md-4 col-sm-12 col-xs-12 NOpadding"></div>    
				}	
	       		{   this.state.tableObjects.searchApply === true ?
					<div className="col-lg-4 col-lg-offset-4 col-md-4 col-md-offset-4 col-xs-12 col-sm-12 marginTop17 NOpadding">
						<label className="col-lg-12 col-md-12 col-sm-12 col-xs-12 NOpadding">Search</label>
						<div className="input-group">
							<input type="text" onChange={this.tableSearch.bind(this)} className="NOpadding-right zzero form-control" ref="tableSearch" id="tableSearch" name="tableSearch"/>
							<span className="input-group-addon"><i className="fa fa-search"></i></span>
						</div>
					</div>	
					:
					null
				}	
	            <div className="col-lg-12 col-sm-12 col-md-12 col-xs-12 NOpadding marginTop17">			            	        
	                <div className="table-responsive">
						<table className="table iAssureITtable-bordered table-striped table-hover">
	                        <thead className="tempTableHeader">	     
		                        <tr className="">
		                            { this.state.twoLevelHeader.apply === true ?
		                            	this.state.twoLevelHeader.firstHeaderData.map((data, index)=>{
		                            		return(
												<th key={index} colSpan={data.mergedColoums} className="umDynamicHeader srpadd textAlignCenter">{data.heading}</th>			
		                            		);		                            		
		                            	})	
		                            	:
		                            	null									
									}
	                            </tr>
	                            <tr className="">
	                           {/*} <th className="umDynamicHeader srpadd textAlignLeft">Sr.No.</th>*/}
		                            { this.state.tableHeading ?
										Object.entries(this.state.tableHeading).map( 
											([key, value], i)=> {
													if(key === 'actions'){
														return(
															<th key={i} className="umDynamicHeader srpadd textAlignLeft">{value}</th>
														);	
													}else{
														return(
															<th key={i} className="umDynamicHeader srpadd textAlignLeft">{value} <span onClick={this.sort.bind(this)} id={key} className="fa fa-sort tableSort"></span></th>
														);	
													}
																							
											}
										) 
										:
										<th className="umDynamicHeader srpadd textAlignLeft"></th>
									}
	                            </tr>
	                        </thead>
	                        <tbody>
	                           { this.state.tableData && this.state.tableData.length > 0 ?
	                           		this.state.tableData.map( 
										(value, i)=> {

											return(
												<tr key={i} className={value.background}>
													{/*<td className="textAlignCenter">{this.state.startRange+1+i}</td>*/}
													{
														Object.entries(value).map( 
															([key, value1], i)=> {
																// console.log('value1', value1);
																var regex = new RegExp(/(<([^>]+)>)/ig);
																var value2 = value1 ;
																// var value2 = value1 ? value1.replace(regex,'') : '';
																var aN = value2;
																// var aN = value2.replace(this.state.reA, "");
																if(aN && $.type( aN ) === 'string'){
																	var textAlign = 'textAlignLeft';
																}else{
																	var bN = value1 ? parseInt(value1, 10) : '';
																	// var bN = value1 ? parseInt(value1.replace(this.state.reN, ""), 10) : '';
																	if(bN){
																		var textAlign = 'textAlignRight';
																	}else{
																		var textAlign = 'textAlignLeft';
																	}
																}
																var found = Object.keys(this.state.tableHeading).filter((k)=> {
																  return k === key;
																});
																if(found.length > 0){
																	if(key !== 'id'){
																		return(<td className={textAlign} key={i}><div className={textAlign} dangerouslySetInnerHTML={{ __html:value1}}></div></td>); 						
																	}
																}																
															}
														)
													}
													{
														this.state.tableHeading.action ?
														<td className="textAlignCenter">
															{value.statusValue === 'Cancelled By User' || value.statusValue === 'Manager Rejected' || value.statusValue === 'New' || value.statusValue === 'Edited' || value.statusValue === 'Edited Manager Rejected' || value.statusValue === 'Change Request' || value.statusValue === 'Cancelled'?
															'NA'
															:
															value.statusValue === 'Manager Approved' || (value.statusValue === 'Edited Manager Approved' && value.vendorName === "") ?
																<button type="button" className="btn btn-info" id={value.id} token={value.token} city={value.fromCity} lat={value.fromlat} lng={value.fromlng} onClick={this.showModal.bind(this)}>Allocate To Vendor</button>
																:
																<div>
																Allocated To <a  title="View vendor profile"  target="_blank" href={"/company-profile/"+(value.vendor_id)}>{value.vendorName}</a> &nbsp; 
																{value.statusValue === 'Cancelled By Vendor' || value.statusValue === 'Vendor Rejected' || value.statusValue === 'PR Admin Edited'|| value.statusValue === 'PR Manager Approved'|| value.statusValue === 'PR Manager Rejected' ?
																<button type="button" className="btn btn-default" id={value.id} token={value.token} city={value.fromCity} lat={value.fromlat} lng={value.fromlng} onClick={this.showModal.bind(this)}>Reallocate</button>
																:
																null
																}
																</div>
															}
															{value.statusValue === "Started From Garage" || value.statusValue === "Reached Pickup Location" || value.statusValue === "Start OTP Verified" || value.statusValue === "Start From Pickup" || value.statusValue === "Reached Destination" || value.statusValue === "End OTP Verified" || value.statusValue === "Reached Drop Location" || value.statusValue === "Reached Garage" || value.statusValue === "Intermediate Stop" ?
															<button type="button" className="btn btn-primary trackingBtn" title="Tracking"  onClick={()=>window.open('tracking/'+value.id, "_blank")}><b>Tracking</b></button>
															:
															null
															}

														
															<div>
															
															<div id={"myModal-"+value.token} className="modal col-lg-12" role="dialog">
															  <div className="modal-dialog">

															    <div className="modal-content">
															      <div className="modal-header modalHeaderStyle">
															        <h3 className="modal-title col-md-10">Allocate to Vendor</h3>
															        <button type="button" className="close close_btn" token={value.token} onClick={this.hideModal.bind(this)}>&times;</button>
															      </div>
															      <div className="modal-body mgnBottom25">
															
															        {this.state.vendorData && this.state.vendorData.length > 0?
															        	<div>
															        	<label className="col-md-12 noPadding" style={{'textAlign':'left'}}>Select the Vendor Name</label>
															        	<select onChange={this.getVendor.bind(this)} value={this.state.vendor} id={value.id} ref="vendor" name="vendor" className="form-control selectStyle">
															        	<option disabled value="Select Vendor">Select Vendor</option>
															        	{this.state.vendorData.map((data,index)=>{
															        		
															        		return(
								                                                <option key={index} value={data._id}>{data.companyName}</option>
								                                                )
															        		
															        	})}
															        	</select>
															        	</div>
															        	:
															        	<p>Sorry, no vendor has been added for this city yet</p>
															        }
															        </div>
															      <div className="modal-footer" style={{'background': '#eee'}}>
															      {this.state.vendorData && this.state.vendorData.length > 0?
															        <button className="col-lg-2 col-md-2 btn btn-primary pull-right marginStyle btnAllocate" token={value.token} id={value.id} onClick={this.allocateVendor.bind(this)}>Allocate</button>
															        :
															        null
															      }
															      </div>
															    </div>
															     
															  </div>
															</div>
															{/*<div id="fade" className="black_overlay"></div>*/}
															
															</div>
															
														</td>
														:
														null
														}
												</tr>
											);										
										}
									) 	
									:
									<tr className="trAdmin"><td colSpan={Object.keys(this.state.tableHeading).length+1} className="noTempData textAlignCenter">No Record Found!</td></tr>               		
								}
	                    </tbody>
	                    </table>
	                    {
	                    	this.state.tableObjects.paginationApply === true ?
		                    	this.state.tableData && this.state.tableData.length > 0 ?
		                    	<div className="col-lg-12 col-md-12 col-sm-12 col-xs-12 paginationAdminWrap">
			                    	<div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
				                    	{ 
					                    		this.state.valI ===  1?                  		
					                    		null
						                    	:
				                    			<div className="btn btn-primary" onClick={this.showFirstTweentyButtons.bind(this)} title="Fast Backward"><i className="fa fa-fast-backward"></i></div>
				                    	}
			                    	</div>
			                    	<div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
				                    	{ 
				                    		this.state.valI ===  1?                  		
					                    	null
					                    	:
					                    	<div className="btn btn-primary" onClick={this.showPreviousPaginationButtons.bind(this)} title="Previous"><i className="fa fa-caret-left"></i></div>
					                    }
				                    </div>
									<ol className="questionNumDiv paginationAdminOES col-lg-8 col-md-8 col-sm-8 col-xs-8 mainExamMinDeviceNoPad">										 
										{this.state.paginationArray}
									</ol>
									<div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
										{
											this.state.pageCount >= Math.ceil(this.state.dataCount/this.state.limitRange) ?
											null
											:
											<div className="btn btn-primary" onClick={this.showNextPaginationButtons.bind(this)} title="Next"><i className="fa fa-caret-right"></i></div>
										}
									</div>
									<div className="col-lg-1 col-md-1 col-sm-1 col-xs-1">
										{
											this.state.pageCount >= (this.state.dataCount/this.state.limitRange) ?
											null
											:
											<div className="btn btn-primary" onClick={this.showLastTweentyButtons.bind(this)} title="Fast Forward"><i className="fa fa-fast-forward"></i></div>
										}
									</div>							
								</div>
								:
								null
							:
							null
	                    }
	                    
	                </div>                        
	            </div>
            </div>
	    );
		
	} 

}

export default withRouter(IAssureTable);
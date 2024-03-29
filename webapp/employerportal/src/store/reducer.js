const initialState = {
	rolewiseAccessToModule 		: false,
	accessToFacility 			: false,
	user_ID 					: localStorage.getItem("user_ID"),
	candidateID 				: localStorage.getItem("candidateID"),
	userDetails 				: localStorage.getItem("userDetails") ?
		{
		loggedIn  	: true,		
		firstName 	: JSON.parse(localStorage.getItem("userDetails")).firstName , 
		lastName  	: JSON.parse(localStorage.getItem("userDetails")).lastName , 
		email 		: JSON.parse(localStorage.getItem("userDetails")).email,
		phone 		: JSON.parse(localStorage.getItem("userDetails")).phone, 
		companyID 	: JSON.parse(localStorage.getItem("userDetails")).companyID,
		company_id 	: JSON.parse(localStorage.getItem("userDetails")).company_id,
		user_id   	: JSON.parse(localStorage.getItem("userDetails")).user_id,
		roles 		: JSON.parse(localStorage.getItem("userDetails")).roles,
		token 		: JSON.parse(localStorage.getItem("userDetails")).token, 
		industry_id : JSON.parse(localStorage.getItem("userDetails")).industry_id
		}
		: {
		loggedIn  	: false,	
		firstName 	: "", 
		lastName  	: "", 
		email 		: "",
		phone 		: "", 
		companyID 	: "",
		company_id 	: "",
		user_id   	: "",
		roles 		: [],
		token 		: "", 
		industry_id : ""
	},
	selector 					: {},
	jobList 					: [],
	candidateSelector 			: {},
	candidateList 				: [],
	applicantsCountList 		: []
}

const reducer = (state = initialState, action) => {
	const newState = {...state}; 
	//Create Global userDetails Variable
	if(action.type === "SET_GLOBAL_USER"){
		newState.userDetails 	= action.userDetails;
	}

	if(action.type === "FETCH_ROLEWISE_ACCESS"){
		newState.rolewiseAccessToModule 	= action.rolewiseAccessToModule;
	}
	if(action.type === "FETCH_ACCESS_FACILITY"){
		newState.accessToFacility 	= action.accessToFacility;
	}
	if(action.type === "SET_USER_DETAILS"){
		newState.userDetails 	= action.userDetails;
	}
	if(action.type === "SET_FILTER_SELECTOR"){
		newState.selector 	= action.selector;
	}
	if(action.type === "SET_CANDIDATE_FILTER_SELECTOR"){
		newState.candidateSelector 	= action.candidateSelector;
	}
	if(action.type === "GET_JOB_LIST"){
		newState.jobList = action.jobList;
	}
	if(action.type === "GET_APPLICANTS_COUNT"){
		newState.applicantsCountList = action.applicantsCountList;
	}
	if(action.type === "GET_CANDIDATE_LIST"){
		newState.candidateList = action.candidateList;
	}
	
	return newState;
}

export default reducer;
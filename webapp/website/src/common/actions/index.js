export const setMapSelectedState = (selectedState )=> ({
      type 			: 'SET_MAP_STATE',
      selectedState : selectedState
});

export const setSelectedModal = (selectedModal )=> ({
      type 			: 'SET_MODAL',
      selectedModal : selectedModal
});
export const setUserID = (userID )=> ({
      type 			: 'SET_USERID',
      userID 		: userID
});
export const setFilter = (selector,filterData )=> ({
      type 			: 'SET_FILTER',
      selector 		: selector,
      filterData 	: filterData
});
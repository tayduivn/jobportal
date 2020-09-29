import React from 'react';
import { 
          View,
          ImageBackground,
        } from 'react-native';
import axios                                                    from 'axios';
import styles                                                   from './styles.js';
import HeaderBar                                                from '../../../layouts/Header/Header.js';
import CarbookingStatusTabView                                   from './CarbookingStatusTabView.js'
import { connect }                                              from 'react-redux';

class BookingStatusView extends React.Component {
constructor(props) {
  super(props);
      this.state = {
    };
  }

  componentDidMount() {
        var booking_Id = this.props.navigation.getParam('booking_Id', 'No Id');
        console.log("booking_Id in view===>",booking_Id);
        this.props.bookinginfo(booking_Id) 
        
}
  render(){
      const { navigation } = this.props;
      const { navigate } = this.props.navigation;

      return(
        <React.Fragment>
          <View style={styles.overlay} />
          <HeaderBar navigation={navigation} showBackBtn={true} headerName={"Booking Status"}/>  
            <CarbookingStatusTabView navigation={navigation}/>  
        </React.Fragment>  
      );
  }

}





const mapStateToProps = (state) => {
  return {
    // selectedVehicle: state.selectedVehicle,
    // purposeofcar: state.purposeofcar,

  }
};

const mapDispatchToProps = (dispatch)=>{
return {
          bookinginfo: (booking_Id) => dispatch({
          booking_Id: booking_Id,
          type : "BOOKING_DETAILS",
      
    })
}
};
export default connect(mapStateToProps,mapDispatchToProps)(BookingStatusView);

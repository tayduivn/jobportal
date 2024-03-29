import React, { Component } from 'react';
import {
    ScrollView,
    Text,
    View,
    Alert, Image, TouchableHighlight
} from 'react-native';
import axios from "axios";
import { connect } from 'react-redux';
import moment from 'moment';
import Tooltip from 'rn-tooltip';
import { Header, Icon, Card } from 'react-native-elements';
import styles from './styles.js';
import HeaderBar from '../../../layouts/Header/Header.js';
import ValidationComponent from "react-native-form-validator";
class Empbookinginfo extends ValidationComponent {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() {
        // console.log("this.booking_Id IN EMP",this.props.bookingid.bookingid);
        this.bookinginformation()
    }
    componentWillReceiveProps(nextprops){
        this.bookinginformation()
    }
    bookinginformation(){
        axios.get('/api/bookingmaster/get/bookingData/' + this.props.bookingid.bookingid)
            .then((response) => {
                const bookingdetails = response.data.data[0]
                console.log('response ==>', bookingdetails);
                console.log('response intermediateStops ==>', bookingdetails.intermediateStops);
                const bookingdets = bookingdetails.intermediateStops
                let intermid = [];
                for (var i = 0; i < bookingdetails.intermediateStops.length; i++) {
                    intermid.push({
                        'address': bookingdets[i].address,
                        'area': bookingdets[i].area,
                        'city': bookingdets[i].city,
                        'country': bookingdets[i].country,
                    });
                }
                this.setState({
                    bookingdetails: bookingdetails,
                    intermid: intermid,
                })
                axios.get('/api/personmaster/get/one/' + bookingdetails.employeeId)
                    .then((response) => {
                        const persondetails = response.data
                        console.log('persondetails ==>', persondetails);
                        this.setState({
                            persondetails: persondetails,
                        })
                    })
                    .catch((error) => { console.log('error: ', error) })
            })
            .catch((error) => { console.log('error: ', error) })
    }
    handleSlideChange = (index) => {
        this.setState({ 'activeIndex': index });
    }

    render() {
        const { navigation } = this.props;
        return (
            <React.Fragment>
                <ScrollView >

                    <Card containerStyle={[styles.sliderView]}>
                        <View style={styles.seat}>
                            <Text style={styles.Bookingdate}> Booking Date: {this.state.bookingdetails ? moment(this.state.bookingdetails.createdAt).format('DD MMM YY') : null} </Text>
                        </View>
                        <View style={styles.emp}>
                            <Text style={styles.Empdetailtitile}>Employee Details </Text>
                        </View>
                        <View style={styles.empdetials}>
                            <View style={styles.empdets}>

                                <Text style={styles.empdetails}>Employee ID  </Text>
                                <Text style={styles.empdetails}>Name  </Text>
                                {/* <Text style={styles.empdetails}>Mobile  </Text> */}
                            </View>
                            <View style={styles.empdatadets}>
                                <Text style={styles.empdetailsdata}> : {this.state.persondetails ? this.state.persondetails.employeeId : null} </Text>
                                <Text style={styles.empdetailsdata}> : {this.state.persondetails ? this.state.persondetails.firstName : null} {this.state.persondetails ? this.state.persondetails.lastName : null} </Text>
                                {/* <Text style={styles.empdetailsdata}> : +91 98223 26361 </Text> */}
                            </View>
                        </View>
                        <View style={styles.emp}>
                            <Text style={styles.Empdetailtitile}>Trip Details </Text>
                        </View>
                        {/* <Text style={styles.tripdetils}>Round Trip </Text> */}

                        <View style={styles.emptripdetials}>
                            <View style={styles.tripdets}>
                                <Text style={styles.emptrip}>From Location  </Text>
                                <Text style={styles.emptrip}>To Location  </Text>
                                <Text style={styles.emptrip}>From Datetime  </Text>
                                <Text style={styles.emptrip}>To DateTime  </Text>
                            </View>
                            <View style={styles.tripdetsdata}>
                                <Tooltip width={200} height={100} withOverlay={true} backgroundColor={"#9151f0"} tooltipText="address" popover={<Text style={{ color: "#fff", }}> {this.state.bookingdetails && this.state.bookingdetails.from ? this.state.bookingdetails.from.address : null} {this.state.bookingdetails && this.state.bookingdetails.from ? this.state.bookingdetails.from.city : null}</Text>}>
                                    <Text numberOfLines={1} style={styles.emptripdata}> : {this.state.bookingdetails && this.state.bookingdetails.from ? this.state.bookingdetails.from.address : null} {this.state.bookingdetails && this.state.bookingdetails.from ? this.state.bookingdetails.from.city : null}</Text>
                                </Tooltip>

                                <Tooltip width={200} height={100} withOverlay={true} backgroundColor={"#9151f0"} tooltipText="address" popover={<Text style={{ color: "#fff", }}> {this.state.bookingdetails && this.state.bookingdetails.to ? this.state.bookingdetails.to.address : null} {this.state.bookingdetails && this.state.bookingdetails.to ? this.state.bookingdetails.to.city : null}</Text>}>
                                    <Text numberOfLines={1} style={styles.emptripdata}> : {this.state.bookingdetails && this.state.bookingdetails.to ? this.state.bookingdetails.to.address : null}  {this.state.bookingdetails && this.state.bookingdetails.to ? this.state.bookingdetails.to.city : null}</Text>
                                </Tooltip>

                                <Tooltip width={200} height={100} withOverlay={true} backgroundColor={"#9151f0"} tooltipText="address" popover={<Text style={{ color: "#fff", }}> {this.state.bookingdetails ? moment(this.state.bookingdetails.pickupDate).format('DD MMM YY') : null}, {this.state.bookingdetails ? moment(this.state.bookingdetails.pickupTime).format('LT') : null}</Text>}>
                                    <Text numberOfLines={1} style={styles.emptripdata}> : {this.state.bookingdetails ? moment(this.state.bookingdetails.pickupDate).format('DD MMM YY') : null}, {this.state.bookingdetails ? moment(this.state.bookingdetails.pickupTime).format('LT') : null} </Text>
                                </Tooltip>

                                <Tooltip width={200} height={100} withOverlay={true} backgroundColor={"#9151f0"} tooltipText="address" popover={<Text style={{ color: "#fff", }}> {this.state.bookingdetails ? moment(this.state.bookingdetails.returnDate).format('DD MMM YY') : null}, {this.state.bookingdetails ? moment(this.state.bookingdetails.returnTime).format('LT') : null}</Text>}>
                                    <Text numberOfLines={1} style={styles.emptripdata}> : {this.state.bookingdetails ? moment(this.state.bookingdetails.returnDate).format('DD MMM YY') : null}, {this.state.bookingdetails ? moment(this.state.bookingdetails.returnTime).format('LT') : null} </Text>
                                </Tooltip>
                            </View>
                        </View>
                        <View style={styles.emp}>
                            <Text style={styles.Empdetailtitile}>Intermediate Stops </Text>
                        </View>
                        <View style={styles.intermidiate}>

                            <View >
                                {
                                    this.state.intermid && this.state.intermid.length > 0 ?
                                        this.state.intermid.map((data, index) => {
                                            return (
                                                <Text numberOfLines={1} style={styles.emptripdata}> {data.address}{data.city}  </Text>
                                            )
                                        })
                                        :
                                        null
                                }
                            </View>
                        </View>

                    </Card>

                </ScrollView>
            </React.Fragment>
        );

    }
}


const mapStateToProps = (state) => {
    return {
        bookingid: state.bookingid,
    }
};
export default connect(mapStateToProps)(Empbookinginfo);
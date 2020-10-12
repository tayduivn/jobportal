import React, { Component } from 'react';
import {
    Text, View, Image, AsyncStorage,
    TouchableOpacity, FlatList,
} from 'react-native';
import axios from "axios";
import { Header, Icon, Card, Button } from 'react-native-elements';
import styles from './style.js';
import moment from 'moment';
import { NavigationActions, StackActions } from 'react-navigation';
import ValidationComponent from "react-native-form-validator";
import { withNavigation } from 'react-navigation';
import TimeAgo from 'react-native-timeago';

class ConfirmBookings extends ValidationComponent {
    navigateScreen = (route) => {
        const navigateAction = StackActions.push({
            routeName: route,
            params: {},
            action: NavigationActions.navigate({ routeName: route }),
        });
        this.props.navigation.dispatch(navigateAction);
    }
    constructor(props) {
        super(props);
        this.state = {
        }
    }
    componentDidMount() {
        AsyncStorage.multiGet(['token', 'user_id'])
            .then((data) => {
                user_id = data[1][1],
                    axios.get('/api/users/get/' + user_id)
                        .then((response) => {
                            const emailid = response.data.email;
                            axios.get("/api/personmaster/get/emailID/" + emailid)
                                .then((response) => {
                                    const managerId = response.data.data[0]._id
                                    // axios.get("/api/bookingmaster/get/allBooking/"+managerId)
                                    // .then((response) => {
                                    //     this.setState({tripdetailswithstatus : response.data})
                                    // })
                                    // .catch((error) =>{})

                                    let bookingdata = {
                                        managerId: managerId,
                                        status: "Manager Accepted"
                                    }
                                    console.log("response.bookingdata", bookingdata);
                                    axios.post('/api/bookingmaster/get/allBookingForManager', bookingdata)
                                        .then((response) => {
                                            console.log("response.allBookingForManager", response.data);
                                            this.setState({
                                                tripdetailswithstatus: response.data
                                            })
                                        })
                                        .catch((error) => { console.log('error: ', error) })

                                })
                                .catch((error) => { console.log("error", error); })
                        })
                        .catch((error) => { })
            });

    }
    bookingdetails(bookingid) {
        console.log("bookingid==>", bookingid);
        this.props.navigation.navigate("ApprovalForm", { bookingid: bookingid });
    }
    _renderlistofcars = ({ item, index }) => {
        const timestamp = item.createdAt;
        return (
            <Card key={index} containerStyle={[styles.sliderView]}>
                <TouchableOpacity onPress={() => { this.bookingdetails({ bookingid: item._id }) }} >
                    <View style={styles.carprice}>
                        <Text style={styles.itemprice}><TimeAgo time={timestamp} hideAgo={true} /> Ago</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 2, paddingVertical: 2 }}>
                        <View style={{ flex: 0.2, paddingHorizontal: 5, paddingVertical: 5, borderRightWidth: 1, borderStyle: "dotted" }}>
                            <View style={{ height: 50, }}>
                                <Image
                                    source={require('../../../images/user.jpg')}
                                    style={[styles.logoImage]}
                                    imageStyle={{ borderRadius: 100 }}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 0.6, paddingHorizontal: 5, paddingVertical: 5, borderRightWidth: 1, borderStyle: 'dotted', borderRightColor: '#333' }}>
                            <View style={{ marginBottom: 0 }}>
                                <Text style={{ fontFamily: 'Montserrat-SemiBold', color: '#666', fontSize: 13 }}>Booking ID: {item.bookingId} </Text>
                                <Text style={{ fontFamily: 'Montserrat-SemiBold', color: '#666', fontSize: 13 }}>{item.person[0].firstName} {item.person[0].lastName}({item.person[0].employeeId})</Text>
                                <Text style={{ fontFamily: "Montserrat-SemiBold", color: '#666', fontSize: 13 }}>{item.from.city} to {item.to.city}   </Text>
                                <Text style={{ fontFamily: "Montserrat-SemiBold", color: '#666', fontSize: 13 }}>{moment(item.pickupDate).format('DD MMM YY')} to {moment(item.returnDate).format('DD MMM YY')}  </Text>
                            </View>

                        </View>
                        <View style={{ flex: 0.3, paddingHorizontal: 5, paddingVertical: 5 }}>
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', color: '#666', fontSize: 12 }}>Estimated Cost</Text>
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', color: '#666', fontSize: 12 }}>Rs {item.estimatedCost}</Text>
                            <Text style={{ fontFamily: 'Montserrat-SemiBold', color: '#666', fontSize: 12 }}>Premium Car</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </Card>
        );
    }

    render() {
        const { navigation } = this.props;
        return (
            <React.Fragment>
                <View style={{ flex: 1, borderWidth: 0, padding: 0, }}>
                {
                    this.state.tripdetailswithstatus == "" ?
                    <View style={{ flex: 0.3, paddingHorizontal: 5, paddingVertical: 5 }}>
                        <Text style={{ fontFamily: 'Montserrat-SemiBold',textAlign:"center", color: '#666', fontSize: 20 }}>No Bookings found</Text>
                    </View>
                :
                    <FlatList
                        data={this.state.tripdetailswithstatus}
                        showsVerticalScrollIndicator={false}
                        renderItem={this._renderlistofcars}
                    />
                }

                </View>
            </React.Fragment>
        );

    }
}
export default withNavigation(ConfirmBookings);
import React, {Component} from 'react';
import {
  ScrollView,
  Text,
  View,
  BackHandler,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Image, TextInput,
  Platform,
  Alert,
  AsyncStorage
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
// import axios from "../../../config/axios.js";
import RootSignup from './RootSignup.js';
import styles from './styles.js';
import { colors, sizes,projectName } from '../../../config/styles.js';
import HeaderBar  from '../../../layouts/Header/Header.js';

const window = Dimensions.get('window');

export default class Login1 extends Component {
  render() {
    const { navigate } = this.props.navigation;
    const { navigation } = this.props;
    return (
      <React.Fragment>
        { projectName === "pipito" ?
            <ImageBackground source={{}}  style={styles.container} resizeMode="cover" >
               <ScrollView >
                <View  style={{ marginTop: 30, alignItems: 'center',}}>
                  <Image
                    style={{ width: "40%",height: 60,marginTop: 10}}
                    source={require('../../../images/pipito.png')}
                  />
                </View>
                <View style={{paddingHorizontal:20}}>
                  <View style={styles.singuproot}>
                    <RootSignup navigation={navigate} />
                  </View>
                </View>
              </ScrollView>
            </ImageBackground>
            :
            <ImageBackground source={{}}  style={styles.container} resizeMode="cover" >
            <View style={{paddingHorizontal:20}}>
              <View style={{paddingVertical:10,backgroundColor:'#fff', borderBottomWidth: 0,
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 1,borderRadius:10}}>
                <RootSignup navigation={navigate} />
              </View>
            </View>
          </ImageBackground>
        }
      </React.Fragment>
    );

  }
}


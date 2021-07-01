import React from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	Alert,
    View,
    ActivityIndicator,
} from "react-native";
import { bindActionCreators } from "redux";
import Button from "react-native-button";
import {CheckBox} from "native-base";
import { connect } from "react-redux";
import { AppIcon, AppStyles } from "../AppStyles";
import { Configuration } from "../Configuration";
import LogoutButton from "../components/LogoutButton";
import * as userActions from "../store/actions/user";
import AsyncStorage from "@react-native-community/async-storage";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import SelectDropdown from "react-native-select-dropdown";
import Spinner from "react-native-loading-spinner-overlay";


const duration = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

class SinglePatientScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeSlide: 0,
			patientCount: 0,
			doctorCount: 0,
            patientHistory: [],
            selectMorning: false,
            selectAfter: false,
            selectNight: false,
            beforemeal: false,
            aftermeal: false,
            advice:"",
            dayTime: [],
            pillName: '',
            duration: '',
            patientId: '',
            spinner: false
		};
    }
        componentDidMount = () => {
            console.log(this.props.navigation.state.params.id);
            const user = this.props.navigation.state.params.id;
    
            this.setState({
                patientId: user,
                //  spinner: true
            });
        };
    
    advice = (value) => {
        let newAdvice = this.state.advice;
        newAdvice = ""
        if(value === 'before meal'){
            this.setState({beforemeal: !this.state.beforemeal, aftermeal: false})
            newAdvice = value;
            this.setState({advice: newAdvice})
        } else if(value === 'after meal') {
            newAdvice=[]
            this.setState({aftermeal: !this.state.aftermeal, beforemeal: false})
            newAdvice = value;
            this.setState({advice: newAdvice})
        }
        console.log(newAdvice)

    }
    dayTime = (value) => {
        let newDayTime = this.state.dayTime;
        if(newDayTime.includes(value)){
            let position = newDayTime.indexOf(value);
            newDayTime.splice(position, 1);
            if(value === 'morning'){
                this.setState({
                    selectMorning: false
                })
            }
            if(value === 'afternoon'){
                this.setState({
                    selectAfter: false
                })
            }
            if(value === 'night'){
                this.setState({
                    selectNight: false
                })
            }
            this.setState({dayTime: newDayTime, value: false})
        } else {
            if(value === 'morning'){
                this.setState({
                    selectMorning: true
                })
            }
            if(value === 'afternoon'){
                this.setState({
                    selectAfter: true
                })
            }
            if(value === 'night'){
                this.setState({
                    selectNight: true
                })
            }
            newDayTime.push(value);

        }
        console.log(newDayTime);
    }

    submit = async () => {
        try {
            this.setState({
                error: null,
                spinner: true,
            });
            const data = {
                patientId: this.state.patientId,
                intakeAdvice: this.state.advice,
                dayTime: this.state.dayTime,
                duration: this.state.duration,
                pillName: this.state.pillName
            }
            console.log(data);
            await this.props.addPillReminder(data);
            this.setState({
                spinner: false,
            });
            this.props.navigation.navigate("Home");
        } catch (err) {
            this.setState({
                spinner: false,
            });
            setTimeout(() => {
                Alert.alert("", err.message, [{ text: "Okay" }]);
            }, 500);
        }
    }

	render() {
		return (
			<ScrollView style={styles.container}>
                <Spinner
						visible={this.state.spinner}
						color="blue"
						customIndicator={<ActivityIndicator size="large" color="blue" />}
					/>
				<Text style={styles.title}>Pill Name</Text>
				<View style={styles.InputContainer}>
					<TextInput
						style={styles.body}
						placeholder="Pill Name"
						onChangeText={(text) => this.setState({ pillName: text })}
						value={this.state.pillName}
						placeholderTextColor={AppStyles.color.grey}
						underlineColorAndroid="transparent"
					/>
				</View>
				<View style={styles.durationContainer}>
					<Text style={styles.title}>Duration</Text>
					<SelectDropdown
						data={duration}
						onSelect={(selectedItem, index) => {
                            this.setState({duration: selectedItem})
						}}
						buttonTextAfterSelection={(selectedItem, index) => {
							// text represented after item is selected
                            // if data array is an array of objects then return selectedItem.property to render after item is selected
                            return selectedItem
                            // 
						}}
						// rowTextForSelection={(item, index) => {
						// 	// text represented for each item in dropdown
						// 	// if data array is an array of objects then return item.property to represent item in dropdown
						// 	return item;
						// }}
						style={{ marginTop: 30 }}
						buttonStyle={{ width: wp("90%"), borderRadius: 20, marginTop: 10 }}
						defaultButtonText="Select Duration"
					/>
				</View>
				<View style={styles.durationContainer}>
					<Text style={styles.title}>Day Time</Text>
					<View style={styles.item}>
                        <CheckBox
							checked={this.state.selectMorning}
							color="#fc5185"
							onPress={() => this.dayTime('morning')}
						/>
						<Text
							style={{
								color: this.state.selectMorning ? "#fc5185" : "gray",
                                fontWeight: this.state.selectMorning ? "bold" : "normal",
                                marginLeft: 20
							}}
						>
							Morning
						</Text>
					</View>
                    <View style={styles.item}>
                        <CheckBox
							checked={this.state.selectAfter}
							color="#fc5185"
							onPress={() => this.dayTime('afternoon')}
						/>
						<Text
							style={{
								color: this.state.selectAfter ? "#fc5185" : "gray",
                                fontWeight: this.state.selectAfter ? "bold" : "normal",
                                marginLeft: 20
							}}
						>
							Afternoon
						</Text>
					</View>
                    <View style={styles.item}>
                        <CheckBox
							checked={this.state.selectNight}
							color="#fc5185"
							onPress={() => this.dayTime('night')}
						/>
						<Text
							style={{
								color: this.state.selectNight ? "#fc5185" : "gray",
                                fontWeight: this.state.selectNight ? "bold" : "normal",
                                marginLeft: 20
							}}
						>
							Night
						</Text>
					</View>
				</View>
                <View style={styles.durationContainer}>
					<Text style={styles.title}>Intake Advice</Text>
					<View style={styles.item}>
                        <CheckBox
							checked={this.state.beforemeal}
							color="#fc5185"
							onPress={() => this.advice('before meal')}
						/>
						<Text
							style={{
								color: this.state.beforemeal ? "#fc5185" : "gray",
                                fontWeight: this.state.beforemeal ? "bold" : "normal",
                                marginLeft: 20
							}}
						>
							Before Meal
						</Text>
					</View>
                    <View style={styles.item}>
                        <CheckBox
							checked={this.state.aftermeal}
							color="#fc5185"
                            // onPress={() => this.setState({ selectMorning: !this.state.selectMorning })}
                            onPress={() => this.advice('after meal')}
						/>
						<Text
							style={{
								color: this.state.aftermeal ? "#fc5185" : "gray",
                                fontWeight: this.state.aftermeal ? "bold" : "normal",
                                marginLeft: 20
							}}
						>
							After Meal
						</Text>
					</View>
				</View>
                <TouchableOpacity onPress={this.submit} style={styles.submit}>
                    <Text style={{color:"white"}}>SUBMIT</Text>
                </TouchableOpacity>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: "white",
		flex: 1,
        padding: Configuration.home.listing_item.offset,
	},
	InputContainer: {
		width: wp("90%"),
		marginTop: 10,
		borderWidth: 1,
		borderStyle: "solid",
		borderColor: AppStyles.color.grey,
        borderRadius: AppStyles.borderRadius.main,

	},
	body: {
		height: 42,
		paddingLeft: 20,
		paddingRight: 20,
		color: AppStyles.color.text,
	},
	title: {
		fontSize: 18,
	},
	duration: {
		width: wp("90%"),
	},
	durationContainer: {
		width: wp("90%"),
		marginTop: 20,
    },
    item:{
        width:"80%",
        backgroundColor:"#fff",
        borderRadius:20,
        padding:10,
        marginBottom:10,
        flexDirection:"row",
      },
      checkBoxTxt:{
        marginLeft:20
      },
      submit:{
        width:"100%",
        backgroundColor:"#fc5185",
        borderRadius:20,
        padding:15,
        alignItems:"center",
        marginTop:40,
        marginBottom: 50
      }
});

const mapStateToProps = (state) => ({
	// user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({
	addPillReminder: bindActionCreators(userActions.addPillReminder, dispatch),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SinglePatientScreen);

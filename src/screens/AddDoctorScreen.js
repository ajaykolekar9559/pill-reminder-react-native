import React from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Alert,
	ActivityIndicator,
	ScrollView,
} from "react-native";
import Button from "react-native-button";
import { AppStyles } from "../AppStyles";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";

import * as userActions from '../store/actions/user';

class AddDoctorScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			spinner: false,
			user: "",
			firstname: "",
			lastname: "",
			//   roles: ["doctor"],
			phone: "",
			password: "",
			email: "",
		};
	}

	componentDidMount = () => {
		console.log(this.props.navigation.state.params.name);
		const user = this.props.navigation.state.params.name;

		this.setState({
			user: user,
			//  spinner: true
		});
	};

	onPress = async () => {
		const { firstname, lastname, phone, email, password } = this.state;
		if (email.length <= 0 || password.length <= 0) {
			alert("Please fill out the required fields.");
			return;
		} else {
			try {
				this.setState({
					error: null,
					spinner: true,
				});
				const data = {
                    firstname: firstname,
                    lastname: lastname,
                    phone: phone,
                    email: email,
                    roles: ["doctor"],
					password: password,
				};
				await this.props.addDoctor(data);
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
		console.log("I AM LOGIN", email, password, firstname, lastname, phone,);
	};

	render() {
		return (
			<ScrollView>
				<View style={styles.container}>
					<Spinner
						visible={this.state.spinner}
						color="blue"
						customIndicator={<ActivityIndicator size="large" color="blue" />}
					/>
					<Text style={[styles.title, styles.leftTitle]}>Add New Doctor</Text>
					<View style={styles.InputContainer}>
						<TextInput
							style={styles.body}
							placeholder="Firstname"
							onChangeText={(text) => this.setState({ firstname: text })}
							value={this.state.firstname}
							placeholderTextColor={AppStyles.color.grey}
							underlineColorAndroid="transparent"
						/>
					</View>
					<View style={styles.InputContainer}>
						<TextInput
							style={styles.body}
							placeholder="Lastname"
							onChangeText={(text) => this.setState({ lastname: text })}
							value={this.state.lastname}
							placeholderTextColor={AppStyles.color.grey}
							underlineColorAndroid="transparent"
						/>
					</View>
					<View style={styles.InputContainer}>
						<TextInput
							style={styles.body}
							placeholder="Phone"
							onChangeText={(text) => this.setState({ phone: text })}
							value={this.state.phone}
							placeholderTextColor={AppStyles.color.grey}
                            underlineColorAndroid="transparent"
                            maxLength={10}
                            minLength={10}
                            keyboardType={'numeric'}
						/>
					</View>
					<View style={styles.InputContainer}>
						<TextInput
							style={styles.body}
							placeholder="E-mail"
							onChangeText={(text) => this.setState({ email: text })}
							value={this.state.email}
							placeholderTextColor={AppStyles.color.grey}
                            underlineColorAndroid="transparent"
						/>
					</View>
					<View style={styles.InputContainer}>
						<TextInput
							style={styles.body}
							secureTextEntry={true}
                            placeholder="Password"
							onChangeText={(text) => this.setState({ password: text })}
							value={this.state.password}
							placeholderTextColor={AppStyles.color.grey}
							underlineColorAndroid="transparent"
						/>
					</View>
					<Button
						containerStyle={styles.loginContainer}
						style={styles.loginText}
						onPress={() => this.onPress()}
					>
						Submit
					</Button>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
	},
	or: {
		color: "black",
		marginTop: 40,
		marginBottom: 10,
	},
	title: {
		fontSize: AppStyles.fontSize.title,
		fontWeight: "bold",
		color: "red",
		marginTop: 20,
		marginBottom: 20,
	},
	leftTitle: {
		alignSelf: "stretch",
		textAlign: "left",
		marginLeft: 20,
	},
	content: {
		paddingLeft: 50,
		paddingRight: 50,
		textAlign: "center",
		fontSize: AppStyles.fontSize.content,
		color: AppStyles.color.text,
	},
	loginContainer: {
		width: AppStyles.buttonWidth.main,
		backgroundColor: "red",
		borderRadius: AppStyles.borderRadius.main,
		padding: 10,
		marginTop: 30,
	},
	loginText: {
		color: AppStyles.color.white,
	},
	placeholder: {
		color: "red",
	},
	InputContainer: {
		width: AppStyles.textInputWidth.main,
		marginTop: 30,
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
	facebookContainer: {
		width: 192,
		backgroundColor: AppStyles.color.facebook,
		borderRadius: AppStyles.borderRadius.main,
		padding: 10,
		marginTop: 30,
	},
	facebookText: {
		color: AppStyles.color.white,
	},
	googleContainer: {
		width: 192,
		height: 48,
		marginTop: 30,
	},
	googleText: {
		color: AppStyles.color.white,
	},
});

const mapStateToProps = (state) => ({
	error: state.error,
});

const mapDispatchToProps = (dispatch) => ({
	addDoctor: bindActionCreators(userActions.addDoctor, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddDoctorScreen);

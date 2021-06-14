import React from "react";
import Button from "react-native-button";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { AppStyles } from "../AppStyles";
import { AsyncStorage, ActivityIndicator } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const patient = require("../../assets/patient.jpeg");

class PatientWelcomeScreen extends React.Component {
	static navigationOptions = {
		header: null,
	};

	constructor(props) {
		super(props);
		this.state = {};
	}

	render() {
		if (this.state.isLoading == true) {
			return (
				<ActivityIndicator
					style={styles.spinner}
					size="large"
					color={AppStyles.color.tint}
				/>
			);
		}
		return (
			<View style={styles.container}>
				<ImageBackground style={styles.image} source={patient}>
					<View style={styles.innerContainer}>
						<Text style={styles.title}>Pill Reminder</Text>
						<Button
							containerStyle={styles.loginContainer}
							style={styles.loginText}
							onPress={() =>
								this.props.navigation.navigate("Login", { name: "Patient" })
							}
						>
							Login
						</Button>
						<Button
							containerStyle={styles.loginContainer}
							style={styles.loginText}
							onPress={() =>
								this.props.navigation.navigate("Signup", { name: "Patient" })
							}
						>
							Signup
						</Button>
						<Button
							containerStyle={styles.signupContainer}
							style={styles.signupText}
							onPress={() => this.props.navigation.navigate("Welcome")}
						>
							Go Back
						</Button>
					</View>
				</ImageBackground>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	logo: {
		width: 200,
		height: 200,
	},
	image: {
		width: wp("100%"),
		height: hp("100%"),
	},
	innerContainer: {
    alignItems: "center",
    justifyContent: 'center',
		height: hp("100%"),
	},
	title: {
		fontSize: AppStyles.fontSize.title,
		fontWeight: "bold",
		color: AppStyles.color.tint,
		marginTop: 20,
		textAlign: "center",
		marginBottom: 20,
		marginLeft: 20,
		marginRight: 20,
	},
	loginContainer: {
		width: AppStyles.buttonWidth.main,
		backgroundColor: AppStyles.color.tint,
		borderRadius: AppStyles.borderRadius.main,
		padding: 10,
		marginTop: 30,
	},
	loginText: {
		color: AppStyles.color.white,
	},
	signupContainer: {
		width: AppStyles.buttonWidth.main,
		backgroundColor: AppStyles.color.white,
		borderRadius: AppStyles.borderRadius.main,
		padding: 8,
		borderWidth: 1,
		borderColor: AppStyles.color.tint,
		marginTop: 15,
	},
	signupText: {
		color: AppStyles.color.tint,
	},
});

export default PatientWelcomeScreen;

import React from "react";
import Button from "react-native-button";
import { Text, View, StyleSheet, ImageBackground } from "react-native";
import { AppStyles } from "../AppStyles";
import { ActivityIndicator } from "react-native";
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const welcome = require("../../assets/welcome.jpeg");

class WelcomeScreen extends React.Component {
	static navigationOptions = {
		header: null,
	};

	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount = async () => {};

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
				<ImageBackground source={welcome} style={styles.image}>
					<View style={styles.contentContainer}>
						<Text style={styles.title}>Pill Reminder</Text>
						<Button
							containerStyle={styles.loginContainer}
							style={styles.loginText}
							onPress={() =>
								this.props.navigation.navigate("Login", { name: "Admin" })
							}
						>
							Admin
						</Button>
						<Button
							containerStyle={styles.loginContainer}
							style={styles.loginText}
							onPress={() =>
								this.props.navigation.navigate("Login", { name: "Doctor" })
							}
						>
							Doctor
						</Button>
						<Button
							containerStyle={styles.loginContainer}
							style={styles.loginText}
							onPress={() =>
								this.props.navigation.navigate("PWelcome", { name: "Patient" })
							}
						>
							Patient
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
		// marginBottom: 150
  },
  contentContainer:{
    justifyContent: "center",
    alignContent: 'center',
    alignItems: 'center',
    height: hp("100%"),
  },
	logo: {
		width: 200,
		height: 200,
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
	image: {
		width: wp("100%"),
		height: hp("100%"),
	},
});

export default WelcomeScreen;

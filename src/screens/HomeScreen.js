import React from "react";
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	Alert,
	View,
} from "react-native";
import { bindActionCreators } from "redux";
import Button from "react-native-button";
import { connect } from "react-redux";
import { AppIcon, AppStyles } from "../AppStyles";
import { Configuration } from "../Configuration";
import LogoutButton from "../components/LogoutButton";
import * as userActions from "../store/actions/user";
import AsyncStorage from "@react-native-community/async-storage";

class HomeScreen extends React.Component {
	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation;
		return {
			headerTitle: "Dashboard",
			headerLeft: null,
			headerRight: <LogoutButton navigation={navigation} />,
		};
	};
	constructor(props) {
		super(props);
		this.state = {
			activeSlide: 0,
			patientCount: 0,
			doctorCount: 0,
			patientHistory: [],
		};
	}

	componentDidMount = async () => {
		try {
			const userName = await AsyncStorage.getItem("role");
			this.setState({
				user: userName,
			});
			let Dresponse;
			let Presponse;
			if (this.state.user === "Admin" || this.state.user === "Doctor") {
				Presponse = await this.props.getPatientCount();
			}

			if (this.state.user === "Admin") {
				Dresponse = await this.props.getDoctorCount();
			}
			if (this.state.user === "Patient") {
				try {
					let response = await this.props.getNotificationHistory();
					this.setState({
						patientHistory: response,
					});
				} catch (err) {
					setTimeout(() => {
						Alert.alert("", err.message, [{ text: "Okay" }]);
					}, 500);
				}
			}
			this.setState({
				patientCount: Presponse ? Presponse.count : 0,
				doctorCount: Dresponse ? Dresponse.count : 0,
			});
		} catch (err) {
			setTimeout(() => {
				Alert.alert("", err.message, [{ text: "Okay" }]);
			}, 500);
		}
	};
	route = () => {
		this.props.navigation.navigate("PatientList");
	};

	render() {
		return (
			<ScrollView style={styles.container}>
				<Text style={styles.title}>
					Welcome {this.state.user ? this.state.user : ""}
				</Text>
				<View
					style={{
						display: "flex",
						flexDirection: this.state.user === "Admin" ? "row" : "column",
						marginTop: 15,
					}}
				>
					{this.state.user === "Doctor" || this.state.user === "Admin" ? (
						<TouchableOpacity
							style={this.state.user === "Admin" ? styles.cardL : styles.card}
						>
							<Text style={styles.cardText}>Patient Count</Text>
							<Text style={styles.cardText}>{this.state.patientCount}</Text>
						</TouchableOpacity>
					) : null}
					{this.state.user === "Doctor" ? (
						<TouchableOpacity style={styles.card} onPress={this.route}>
							<Text style={styles.cardText}>See All Patients</Text>
						</TouchableOpacity>
					) : null}
					{this.state.user === "Admin" ? (
						<View style={styles.cardR}>
							<Text style={styles.cardText}>Doctor Count</Text>
							<Text style={styles.cardText}>{this.state.doctorCount}</Text>
						</View>
					) : null}
				</View>
				{this.state.user === "Admin" ? (
					<Button
						containerStyle={styles.adminContainer}
						style={styles.adminText}
						onPress={() =>
							this.props.navigation.navigate("Doctor", { name: "Admin" })
						}
					>
						Add New Doctor
					</Button>
				) : null}
				{this.state.user === "Patient" ? (
					<View style={{ width: "85%", marginLeft: 20, marginRight: 20 }}>
					<View
						style={{
							flexDirection: "row",
							justifyContent: "space-between",
							backgroundColor: "red",
							width: "100%",
							padding: 10,
							borderTopLeftRadius: 10,
							borderTopRightRadius: 10,
							paddingRight: 20,
							paddingLeft: 20,
							marginTop: 20,
						}}
					>
						<Text style={{ fontSize: 18, color: "#FFF", fontSize: 15 }}>
							Notification History
						</Text>
					</View>
					<View style={{ flexDirection: "column" }}>
						{this.state.patientList && this.state.patientList.length > 0 ? (
							this.state.patientList.map((item, index) => {
								return (
									<View
										key={item._id}
										style={{
											flexDirection: "row",
											justifyContent: "space-between",
											padding: 10,
											borderColor: "#D5D5D5",
											borderBottomWidth: 1,
											borderLeftWidth: 1,
											borderRightWidth: 1,
										}}
									>
										<Text
											onPress={() => this.routeSinglePatient(item._id)}
											style={{
												fontSize: 18,
												color: "gray",
												color: "#343434",
												fontSize: 15,
												paddingRight: 20,
												paddingLeft: 10,
												flex: 0.7,
											}}
										>
											{item.firstname} {item.lastname}
										</Text>
									</View>
								);
							})
						) : (
							<View style={{ width: "100%"}}>
							<Text style={{textAlign: 'center'}}>No Notification History Found</Text>

							</View>
						)}
					</View>
				</View>
				) : null}
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
	title: {
		fontWeight: "bold",
		color: AppStyles.color.title,
		fontSize: 25,
	},
	card: {
		padding: 15,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "red",
		alignItems: "center",
		backgroundColor: "red",
		justifyContent: "center",
		alignContent: "center",
		alignItems: "center",
		width: "100%",
		marginTop: 25,
	},
	cardL: {
		padding: 15,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "red",
		alignItems: "center",
		backgroundColor: "red",
	},
	cardR: {
		padding: 15,
		borderWidth: 1,
		borderRadius: 10,
		borderColor: "red",
		marginLeft: "auto",
		alignItems: "center",
		backgroundColor: "red",
	},
	cardText: {
		fontWeight: "bold",
		color: AppStyles.color.title,
		fontSize: 20,
		color: "#FFF",
	},
	userPhoto: {
		width: 40,
		height: 40,
		borderRadius: 20,
		marginLeft: 5,
	},
	adminContainer: {
		width: "100%",
		backgroundColor: AppStyles.color.white,
		borderRadius: AppStyles.borderRadius.main,
		padding: 8,
		borderWidth: 1,
		borderColor: AppStyles.color.tint,
		marginTop: 55,
	},
	adminText: {
		color: AppStyles.color.tint,
	},
});

const mapStateToProps = (state) => ({
	// user: state.auth.user
});

const mapDispatchToProps = (dispatch) => ({
	getPatientCount: bindActionCreators(userActions.getPatientCount, dispatch),
	getDoctorCount: bindActionCreators(userActions.getDoctorCount, dispatch),
	getNotificationHistory: bindActionCreators(userActions.getNotificationHistory, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

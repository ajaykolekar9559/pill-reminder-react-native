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
import * as userActions from "../store/actions/user";

class DoctorListScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			spinner: false,
			patientList: [],
		};
	}

	componentDidMount = async () => {
		try {
			let Presponse = await this.props.getPatientList();
			console.log("JAJJAJJAJJA", Presponse);
			this.setState({
				patientList: Presponse,
			});
		} catch (err) {
			setTimeout(() => {
				Alert.alert("", err.message, [{ text: "Okay" }]);
			}, 500);
		}
	};

	onPress = async () => {};

	render() {
		return (
			<ScrollView>
				<View style={{width: '85%', marginLeft: 20, marginRight: 20}}>
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
							Patient Name
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
							<Text>No Patients Found</Text>
						)}
					</View>
				</View>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({});

const mapStateToProps = (state) => ({
	error: state.error,
});

const mapDispatchToProps = (dispatch) => ({
	getPatientList: bindActionCreators(userActions.getPatientList, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(DoctorListScreen);

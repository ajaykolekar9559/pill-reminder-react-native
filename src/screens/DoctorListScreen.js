import React from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Alert,
	ActivityIndicator,
	ScrollView,
	TouchableOpacity
} from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Button from "react-native-button";
import { AppStyles } from "../AppStyles";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Spinner from "react-native-loading-spinner-overlay";
import * as userActions from "../store/actions/user";
import Modal from "react-native-modal";

class DoctorListScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			spinner: false,
			patientList: [],
			isDeleteModalVisible: false,
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
	showDeleteModal = async () => {
        this.setState({ isDeleteModalVisible: !this.state.isDeleteModalVisible });
    }
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
										<FontAwesome style={{ fontSize: 15, flex: 0.15 }} name='trash' onPress={() => {
											this.showDeleteModal();
										}} />
									</View>
								);
							})
						) : (
							<Text>No Patients Found</Text>
						)}
					</View>
					<Modal isVisible={this.state.isDeleteModalVisible} backdropColor='gray' deviceHeight='100%' backdropOpacity={0.5} style={{ alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
                    <View style={{ flex: 0.15, backgroundColor: 'white', width: '90%', borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'black', fontSize: 11, alignItems: 'flex-start', width: '90%', textAlign: 'center' }}>If you delete dish with name All other users will loose access to dish if it's a shared one, you want to proceed?</Text>
                    </View>
                    <View style={{ flex: 0.05, flexDirection: 'row', width: '90%', marginTop: 5 }}>
                        <TouchableOpacity style={{ flexDirection: 'row', width: '50%', justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: 'white', marginRight: 2 }} onPress={this.showDeleteModal}>
                            <Text style={{ fontSize: 14 }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ flexDirection: 'row', width: '50%', justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: 'white', marginLeft: 2 }} onPress={async () => {
                            try {
                                const action = await this.props.removeDevicebyId(this.state.updateDeviceId);
                                if (action) {
                                    this.deleteDish();
                                    Alert.alert(
                                        '',
                                        'Dish has been deleted successfully.',
                                        [
                                            {
                                                text: 'Okay',
                                                onPress: () => this.showDeleteModal()
                                            },
                                        ]
                                    );
                                }
                            }
                            catch (err) {
                                Alert.alert(
                                    '',
                                    err.message,
                                    [
                                        {
                                            text: 'Okay',
                                            onPress: () => this.showDeleteModal()
                                        },
                                    ]
                                );
                            }
                        }}>
                            <FontAwesome style={{ fontSize: 15, flex: 0.20 }} name='share' />
                            <Text style={{ fontSize: 14 }}>Delete</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
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

import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import Camera from './screens/CameraScreen';
import QuizScreen from './screens/QuizScreen';

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			cameraShow: false,
			quiz: false,
		}
		
		this.startQuiz = this.startQuiz.bind(this);
		this.goHome = this.goHome.bind(this);
	}

	startQuiz() {
		this.setState({ cameraShow: false, quiz: true })
	}
	
	goHome() {
		this.setState({ cameraShow: false, quiz: false })
	}	

	render() {
		const { cameraShow, quiz } = this.state;

		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.headerTextStyle}>Quiz App</Text>
				</View>
				{
					cameraShow
						?
						<Camera startQuiz={this.startQuiz} />
						:
						<View style={{ flex: 1 }}>
							{
								quiz 
									?
									<View style={{ flex: 1 }}>
										<QuizScreen 
											goHome={this.goHome}
										/>
									</View>
									:
									<View style={styles.firstScreen}>
										<Text style={styles.startingText}>
											 The app will first start the camera and user will capture the photo. If the camera detects the face, it will show the button to start the quiz otherwise show the error, no face found!
										</Text>
										<View style={styles.startButton}>						
										<Button
											onPress={() => this.setState({ cameraShow: true })}
											title="Camera"
											color="green"
											accessibilityLabel="Learn more about this purple button"
										/>
										</View>
									</View>
							}
						</View>
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
	},
	header: {
		backgroundColor: 'green',
		height: 60,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 22,
	},
	headerTextStyle: {
		fontSize: 20,
		color: 'white',
		fontWeight: 'bold',
	},
	firstScreen: {
		flex: 1,
	},	
	startingText: {
		marginLeft: 10,
		marginTop: 10,
		fontSize: 18,
		textAlign: 'justify',
	},
	startButton: {
		width: 250,
		fontWeight: 'bold',
		marginLeft: 'auto', 
		marginRight: 'auto', 
		marginTop: 'auto', 
		marginBottom: 'auto'
	}
});

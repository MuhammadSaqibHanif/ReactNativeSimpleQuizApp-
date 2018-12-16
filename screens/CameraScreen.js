import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Button, Modal, TouchableHighlight, Alert, StyleSheet } from 'react-native';
import { Camera, Permissions, FaceDetector } from 'expo';

export default class CameraExample extends React.Component {
  state = {
    hasCameraPermission: null,
    type: Camera.Constants.Type.front,
    modalVisible: false,
    showButton: false,
  };

  setModalVisible(visible, buttonShow) {
    this.setState({
      modalVisible: visible,
      showButton: buttonShow,
    });
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  click = async () => {
    if (this.camera) {
      let photo = await this.camera.takePictureAsync();
      const options = { mode: FaceDetector.Constants.Mode.fast }
      const result = await FaceDetector.detectFacesAsync(photo.uri, options);
      console.log('result', result);
      if (result.faces.length > 0) {
        console.log("Match found");

        this.setModalVisible(true, true);
      }
      else {
        console.log("No match found");

        this.setModalVisible(true);
      }
    }
  };

  render() {
    const { hasCameraPermission, showButton } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            ref={ref => this.camera = ref}
            style={{ flex: 1 }}
            type={this.state.type}
          >
          </Camera>

		  <View style={{
                width: 250,
				marginLeft: 'auto', 
				marginRight: 'auto', 
				marginTop: 'auto', 
				marginBottom: 'auto'
              }} >
                <Button
                  onPress={this.click}
                  title="Click"
                  color="green"
                  accessibilityLabel="Learn more about this purple button"
                />
              </View>
		  
          <View style={{ marginTop: 22 }}>
            <Modal
              animationType="slide"
              transparent={false}
              visible={this.state.modalVisible}
              onRequestClose={() => {
                Alert.alert('Modal has been closed.');
              }}>
              <View style={{ marginTop: 22 }}>
                <View>
                  {showButton ?
                    <View style={styles.startButton}>
                      <Button
                        onPress={this.props.startQuiz}
                        title="Start Quiz"
                        color="green"
                        accessibilityLabel="Learn more about this purple button"
                      />

                    </View>
                    : <Text style={styles.errorText}>No face found!</Text>
                  }

                  <TouchableHighlight
                    onPress={() => {
                      this.setModalVisible(!this.state.modalVisible);
                    }}>
                    <Text style={styles.hideModal}>Hide Modal</Text>
                  </TouchableHighlight>
                </View>
              </View>
            </Modal>
          </View>

        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  startButton: {
    // flex: 1,
    alignSelf: 'center',
    //alignItems: 'center',	  
    //height: 100,
    width: 250,
    justifyContent: 'center',
  },
  errorText: {
	marginLeft: 'auto', 
	marginRight: 'auto', 
	fontSize: 25,
	width: 300,
	textAlign: 'center',
	fontWeight: 'bold'
  },  
  hideModal: {
	marginLeft: 'auto', 
	marginRight: 'auto', 
	marginTop: 40,
	paddingTop: 10,
	fontSize: 20,
	width: 250,
	height: 50,
	backgroundColor: 'green',
	color: 'white',
	textAlign: 'center',
	fontWeight: 'bold'
  },   
});
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Switch,
  CameraRoll,
  TextInput,
  Dimensions,
  Image,
  SliderIOS,
  ListView
} from 'react-native';

import Camera from 'react-native-camera';

class BabyApp extends Component {

  constructor() {
    super();
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  
    this.state = {
      showCamera: false,
      name: 'Theo!',
      dataSource: ds.cloneWithRows(['slept', 'ate', 'pood', 'peed', 'notes'])
    };
  }

  render() {
    const { height, width } = Dimensions.get('window');
    const { bigImages, name } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
        <TextInput style={styles.name}  value={name} onChangeText={(name) => this.setState({name})} />
        <Text style={styles.photo} onPress={this._toggleCamera.bind(this)} />
        </View>
        {this._camera()}
        <ListView
          key
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text style={[styles.action , {backgroundColor: colors[rowData]}]}>{rowData}</Text>}/>
      </View>
    );
  }

  _toggleCamera() {
    this.setState({showCamera: !this.state.showCamera});
  }

  _camera() {
    if (this.state.showCamera) {
      return(<Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
          <Text style={styles.capture} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
        </Camera>);
    } else {
      return null;
    }
  }

  takePicture() {
    this.camera.capture()
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
}

const colors = {
  slept: '#88EBEB',
  ate: '#5ED971',
  pood: '#5A4538',
  peed: '#E1E4CE',
  notes: '#713CE2'
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: colors.notes,
  },
  header: {
    paddingTop: 30,
    flexDirection: 'row',
    padding: 15,
    height: 100,
    backgroundColor: 'white'
  },
  name: {
    fontSize: 30,
    height: 50,
    width: 250
  },

  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    color: '#000',
    padding: 10,
    margin: 40
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.notes,
    color: 'white',
    padding: 20
  },

  action: {
    flex: 1,
    height: 110,
    fontSize: 30,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 15,
    paddingLeft: 20,
    color: 'white',
    backgroundColor: 'black'
  }



});

AppRegistry.registerComponent('BabyApp', () => BabyApp);

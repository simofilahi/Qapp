import React, {Component} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import geolocation from '@react-native-community/geolocation';
import {Container} from 'native-base';
import {PermissionsAndroid} from 'react-native';
const {width, height} = Dimensions.get('window');
const SCREEN_WIDTH = width;
const SCREEN_HEIGHT = height;
const ASPECT_RATIO = SCREEN_WIDTH / SCREEN_HEIGHT;
const LATITUDEDELTA = 0.0922;
const LONGITUDEDELTA = 0.0421;

export default class MapScreen extends Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      initialRegion: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: LATITUDEDELTA,
        longitudeDelta: LONGITUDEDELTA,
      },
    };
  }

  async componentDidMount() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        this.setState({granted: true});
        geolocation.getCurrentPosition(
          position => {
            const {latitude, longitude} = position.coords;
            const lat = latitude;
            const long = longitude;
            var initialRegion = {
              latitude: lat,
              longitude: long,
              latitudeDelta: LATITUDEDELTA,
              longitudeDelta: LONGITUDEDELTA,
            };
            this.setState({initialRegion: initialRegion});
          },
          error => alert('Please Turn on your GPS'),
          {timeout: 2000, maximumAge: 1000},
        );
        this.WatchId = geolocation.watchPosition(position => {
          const {latitude, longitude} = position.coords;
          const lat = latitude;
          const long = longitude;
          var lastRegion = {
            latitude: lat,
            longitude: long,
            latitudeDelta: LATITUDEDELTA,
            longitudeDelta: LONGITUDEDELTA,
          };
          this.setState({initialRegion: lastRegion});
        });
      } else {
        alert('Location permission denied');
      }
    } catch (err) {
      this.setState({granted: false});
    }
  }
  componentWillUnmount() {
    geolocation.clearWatch(this.WatchId);
  }
  render() {
    return (
      <Container>
        <View style={styles.MainContainer}>
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.mapStyle}
            showsUserLocation={true}
            zoomEnabled={true}
            zoomControlEnabled={true}
            initialRegion={
              this.state.initialRegion.latitude
                ? this.state.initialRegion
                : null
            }></MapView>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  mapStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

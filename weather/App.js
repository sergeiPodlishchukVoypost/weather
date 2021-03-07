/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import Geolocation from '@react-native-community/geolocation';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {Header, Colors} from 'react-native/Libraries/NewAppScreen';

import api from './api';

const App = () => {
  const [coord, setCoord] = React.useState({});
  const [obj, setObj] = React.useState({});

  async function success(pos) {
    const crd = pos.coords;

    setCoord(crd);
    const getData = async () => {
      const obj = await api(crd.latitude, crd.longitude);
      setObj(obj);
    };
    await getData();
  }

  function error(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  Geolocation.getCurrentPosition(success, error, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 1000,
  });

  const {city, pressure, temp, wind_speed} = obj;

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}

          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Your city {city}</Text>

              <Text style={styles.highlight}>
                latitude: {coord.latitude}, longitude: {coord.longitude}
              </Text>
              <Text style={styles.sectionTitle}>Weather </Text>
              <Text style={styles.highlight}>pressure: {pressure} bar</Text>
              <Text style={styles.highlight}>temperature: {temp} C</Text>
              <Text style={styles.highlight}>wind speed: {wind_speed} m/c</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

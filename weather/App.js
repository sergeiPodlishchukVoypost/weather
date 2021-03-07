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

import api from './api';

const App = () => {
  const [coord, setCoord] = React.useState({});
  const [obj, setObj] = React.useState({});

  React.useEffect(() => {
    function success(pos) {
      const crd = pos.coords;
      setCoord(crd);
      (async function () {
        const obj = await api(crd.latitude, crd.longitude);
        setObj(obj);
      })();
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    Geolocation.getCurrentPosition(success, error);
  }, [coord]);

  const {
    city,
    pressure,
    temp,
    wind_speed,
    clouds,
    dayTime,
    sunrise,
    sunset,
  } = obj;

  const dateNow = new Date(dayTime * 1000).toLocaleDateString();
  const sunR = new Date(sunrise * 1000).toLocaleTimeString();
  const sunS = new Date(sunset * 1000).toLocaleTimeString();
  // console.log(sunR);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>
                Your city {city} {dateNow}
              </Text>
              <Text style={styles.highlight}>
                latitude: {coord.latitude}, longitude: {coord.longitude}
              </Text>
              <Text style={styles.sectionTitle}>Weather </Text>
              <Text style={styles.highlight}>pressure: {pressure} kPa</Text>
              <Text style={styles.highlight}>temperature: {temp} ˚C</Text>
              <Text style={styles.highlight}>wind speed: {wind_speed} m/c</Text>
              <Text style={styles.highlight}>clouds: {clouds}%</Text>
              <Text style={styles.highlight}>sunrise: {sunR}</Text>
              <Text style={styles.highlight}>sunset: {sunS}</Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#fff',
  },

  body: {
    backgroundColor: '#fff',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: '#000',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: '#000',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;

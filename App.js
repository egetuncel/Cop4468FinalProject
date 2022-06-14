import React, { useState, useEffect, Component } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  Button,
  useColorScheme,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Route from './components/Route'

const Item = ({ item, onPress}) => (
  <TouchableOpacity onPress={onPress}>
    <Text>{item.id}</Text>
  </TouchableOpacity>
);

const App = () => {

  return (
    <Route/>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },

});

export default App;

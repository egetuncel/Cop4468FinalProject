import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Users from '../pages/Users';
import Posts from '../pages/Posts';
import Icon from 'react-native-vector-icons/Ionicons';

const Home = ({ navigation }) => {
  const Tab = createBottomTabNavigator();
  return (

  <Tab.Navigator screenOptions={({ route }) => ({
    tabBarIcon: ({ focused, color, size }) => {
      let iconName;

      if (route.name === 'Users') {
        iconName = focused ? 'person' : 'person-outline';
      }
      else if (route.name === "Posts") {
        iconName = focused ? "book" : "book-outline";
      }
      
      return <Icon name={iconName} size={size} color={color} />;
  
    },
    tabBarActiveTintColor: 'black',
    tabBarInactiveTintColor: 'white',
      tabBarActiveBackgroundColor: "#009578",
      tabBarInactiveBackgroundColor: "#009578",
      tabBarStyle:{ backgroundColor:'#009578'}
  })}
    >
  <Tab.Screen name="Users" options={{ headerShown: false, headerTitle: 'Users' }} component={Users} />
  <Tab.Screen name="Posts" options={{ headerShown: false, headerTitle: 'Posts' }} component={Posts} />
</Tab.Navigator>



  )
}

export default Home



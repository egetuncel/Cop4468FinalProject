import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Users from '../pages/Users';
import Posts from '../pages/Posts';
import UsersById from '../pages/UsersById';
import PostsById from '../pages/PostsById';
import Albums from '../pages/Albums';
import AlbumsById from '../pages/AlbumsById';
import CommentList from '../pages/CommentList';
import ToDos from '../pages/ToDos';
import CommentListById from '../pages/CommentListById';
const Stack = createNativeStackNavigator();


const Route = () => {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName='Home' screenOptions={{ gestureEnabled:true }}>
        <Stack.Screen name='Home' options={{headerShown:false}} component={Home} />
        <Stack.Screen name='Users' options={{headerShown:false}} component={Users} />
        <Stack.Screen name='UsersById' options={{headerShown:false}} component={UsersById} />
        <Stack.Screen name='Posts' options={{headerShown:false}} component={Posts} />
        <Stack.Screen name='PostsById' options={{headerShown:false}} component={PostsById} />
        <Stack.Screen name='Albums' options={{headerShown:false}} component={Albums} />
        <Stack.Screen name='AlbumsById' options={{headerShown:false}} component={AlbumsById} />
        <Stack.Screen name='To Do' options={{headerShown:false}} component={ToDos} />
        <Stack.Screen name='Comment' options={{headerShown:false}} component={CommentList} />
        <Stack.Screen name='CommentListById' options={{headerShown:false}} component={CommentListById} />
        </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Route
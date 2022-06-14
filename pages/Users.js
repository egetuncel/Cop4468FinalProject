import React, { useState, useEffect, Component } from 'react';
import {

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
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'

const Users = ({ navigation }) => {

  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(true);

  const api = `https://jsonplaceholder.typicode.com/users`;

  const fetchUsers = async () => {

    const resp = await fetch(api);
    const usersData = await resp.json();
    setUsersData(usersData);
    setLoading(false);
  };

  const usersInfo = ({ item }) => {
    return (
      <View style={styles.view}>
        <TouchableOpacity onPress={() => navigation.navigate('UsersById', { userId: item.id })}>
          <View style={styles.view2}>
            <Text style={styles.text}>{item.name.toUpperCase()}</Text>
            <Icon name="arrow-forward-outline" style={{color:'white'}} size={22}></Icon>
          </View>

        </TouchableOpacity>

      </View>
    )
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        

        <View style={styles.container}>

          {loading ? <ActivityIndicator color={'white'} /> : (
            <FlatList
              data={usersData}
              keyExtractor={({ id }, index) => id}
              renderItem={usersInfo}

            />
          )}

        </View>

      </ScrollView>

    </SafeAreaView>


  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: '5%',
    marginHorizontal: '5%',
  },

  text: {
    flex: 1,
    fontSize: 16,
    fontWeight: "400",
    color: "white",
    fontWeight: 'bold',
    
    flexWrap: 'wrap'
  },

  

  view: {
    height: "auto",
    width: "auto",
    borderColor: "#ddd",
    backgroundColor: "#00cca3",
    borderWidth: 0.5,
    borderRadius: 10,
    marginTop: '5%',
  },

  view2: {
    padding: 10,
    alignItems: 'center',
    flexDirection: "row",
  },

  back: {
    padding: 10,
    marginVertical: 10,
  }

})

export default Users
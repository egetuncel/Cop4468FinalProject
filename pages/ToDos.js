import React, { useState, useEffect, Component } from 'react';
import {

    ScrollView,
    StatusBar,
    StyleSheet,
    Button,
    useColorScheme,
    TouchableOpacity,
    View,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { Card, Text, Divider } from "@rneui/themed";
import axios from 'axios';

const ToDos = ({ navigation }) => {

  const [toDoSData, setToDoSData] = useState([]);
  const [loading, setLoading] = useState(true);

  const api = "https://jsonplaceholder.typicode.com/todos";

  const fetchToDo = async () => {
     
      try {
          const response = await axios.get(api);
        
          setToDoSData(response.data);
          setLoading(false);
      }
      catch (e) {
          console.log(e);
      }


  }

  useEffect(() => {
      fetchToDo();
  });

  const toDoInfo = ({ item }) => {
    return (
        <View>
            
                <Card containerStyle={styles.view}>
                
                
                <View style={styles.view2}>
                    <Text style={styles.text}>{item.title.toUpperCase()}</Text>
                </View>
                </Card>
        </View>
    )
}

return (
    <SafeAreaView>
        <ScrollView>


            <View style={styles.container}>
                <Card containerStyle={{ borderRadius: 10 }}>
                    <Card.Title>To Do List</Card.Title>
                    <Card.Divider />
                    {loading ? <ActivityIndicator color={'white'} /> : (
                    <FlatList
                        data={toDoSData}
                        keyExtractor={({ id }, index) => id}
                        renderItem={toDoInfo}

                    />
                )}
                </Card>
            </View>

        </ScrollView>

    </SafeAreaView>


)
}

const styles = StyleSheet.create({
  container: {
      marginTop: '5%',
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
      borderColor: "#ddd",
      backgroundColor: "#00cca3",
      borderWidth: 0.5,
      borderRadius: 10,
      marginTop: '5%',
      marginHorizontal: '5%',
      overflow: "hidden"
  },

  view2: {
      flexDirection: "row",
      position: 'relative',
      alignItems: 'center'
  },

})

export default ToDos
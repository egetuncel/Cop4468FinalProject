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

const ToDos = ({ navigation, route }) => {
    const [usersDetail, setUsersDetail] = useState([]);
    const [toDoSData, setToDoSData] = useState([]);
    const [loadingToDoS, setLoadingToDos] = useState(true);
    const [loading, setLoading] = useState(true);
    const { userId } = route.params;
    const apiUsersById = `https://jsonplaceholder.typicode.com/users/${userId}`;
    const apiToDo = "https://jsonplaceholder.typicode.com/todos/";

    const ClosePage = () => {
        navigation.goBack();
    }

    const fetchUsersDetail = async () => {

        try {
            const response = await axios.get(apiUsersById);

            setUsersDetail(response.data);
            setLoading(false);
        }
        catch (e) {
            console.log(e);
        }

    };

    const fetchToDo = async () => {

        try {

            const responseToDo = await axios.get(apiToDo);
            let newUsers = [];
            responseToDo.data.forEach(elementToDo => {


                if (elementToDo.userId == userId) {

                    newUsers.push(elementToDo);

                }


            })

            console.log(newUsers)
            setToDoSData(newUsers);
            setLoadingToDos(false);
        }
        catch (e) {
            console.log(e);
        }


    }

    useEffect(() => {
        fetchToDo();
        fetchUsersDetail();
    }, []);

    const toDoInfo = ({ item }) => {
        return (
            <View>
                {item.completed == false ?
                    <Card containerStyle={{ backgroundColor: "red", borderRadius: 10 }}>


                        <View>

                            <Text style={{fontWeight:'bold'}}>{item.title.toUpperCase()}</Text>
                        </View>
                    </Card>
                    :
                    <Card containerStyle={{ backgroundColor: "#00cca3", borderRadius: 10 }}>


                        <View>

                            <Text style={{fontWeight:'bold'}}>{item.title.toUpperCase()}</Text>
                        </View>
                    </Card>

                }


            </View>
        )
    }

    return (
        <SafeAreaView>

            <TouchableOpacity onPress={ClosePage}>
                <View style={styles.back}>
                    <Icon name="chevron-back-outline" size={35}></Icon>
                </View>
            </TouchableOpacity>

            <ScrollView>


                <View>
                    <Card containerStyle={{ borderRadius: 10 }}>
                        <Card.Title style={{color:'black', fontSize: 20, fontWeight: "bold"}}>To Do List</Card.Title>
                        <Card.Divider />
                        {loadingToDoS ? <ActivityIndicator color={'white'} /> : (
                            <FlatList
                                data={toDoSData}
                                keyExtractor={({ id }, index) => id}
                                renderItem={toDoInfo}

                            />
                        )}
                    </Card>
                </View>

                <View>

                    <Card containerStyle={{ borderRadius: 10, backgroundColor: "#00cca3"}}>
                        <Card.Title style={{color:'white', fontSize: 20, fontWeight: "bold"}}>DETAILS</Card.Title>
                        <Card.Divider color='white'></Card.Divider>
                        <View>
                            {loading ? <ActivityIndicator color={'white'} /> : (
                                <View>
                                    <Text style={styles.textTitle}>Personal Detail</Text>
                                    <View>
                                        <View style={styles.viewStyle}>
                                            <Text style={styles.textStyleLeft}>Name Surname: </Text>
                                            <Text style={styles.textStyle}>{usersDetail.name}</Text>
                                        </View>
                                        <View style={styles.viewStyle}>
                                            <Text style={styles.textStyleLeft}>Username: </Text>
                                            <Text style={styles.textStyle}>{usersDetail.username}</Text>
                                        </View>
                                        <View style={styles.viewStyle}>
                                            <Text style={styles.textStyleLeft}>Email: </Text>
                                            <Text style={styles.textStyle}>{usersDetail.email}</Text>
                                        </View>
                                        <View style={styles.viewStyle}>
                                            <Text style={styles.textStyleLeft}>Phone: </Text>
                                            <Text style={styles.textStyle}>{usersDetail.phone}</Text>
                                        </View>
                                        <View style={styles.viewStyle}>
                                            <Text style={styles.textStyleLeft}>Website: </Text>
                                            <Text style={styles.textStyle}>{usersDetail.website}</Text>
                                        </View>
                                    </View>

                                    <Card.Divider color='white' padding='3%'></Card.Divider>

                                    <View>
                                        <Text style={styles.textTitle}>Address</Text>

                                        <View style={styles.viewStyle}>
                                            <Text style={styles.textStyleLeft}>Street: </Text>
                                            <Text style={styles.textStyle}>{usersDetail.address.street}</Text>
                                        </View>
                                        <View style={styles.viewStyle}>
                                            <Text style={styles.textStyleLeft}>Suite: </Text>
                                            <Text style={styles.textStyle}>{usersDetail.address.suite}</Text>
                                        </View>
                                        <View style={styles.viewStyle}>
                                            <Text style={styles.textStyleLeft}>City: </Text>
                                            <Text style={styles.textStyle}>{usersDetail.address.city}</Text>
                                        </View>
                                        <View style={styles.viewStyle}>
                                            <Text style={styles.textStyleLeft}>Zipcode: </Text>
                                            <Text style={styles.textStyle}>{usersDetail.address.zipcode}</Text>
                                        </View>
                                        <View style={styles.viewStyle}>
                                            <Text style={styles.textStyleLeft}>Lat: </Text>
                                            <Text style={styles.textStyle}>{usersDetail.address.geo.lat}</Text>
                                        </View>
                                        <View style={styles.viewStyle}>
                                            <Text style={styles.textStyleLeft}>Lng: </Text>
                                            <Text style={styles.textStyle}>{usersDetail.address.geo.lng}</Text>
                                        </View>
                                    </View>

                                    <Card.Divider color='white' padding='3%'></Card.Divider>

                                    <View>
                                        <Text style={styles.textTitle}>Company Detail</Text>

                                        <View style={styles.viewStyle}>
                                            <Text style={styles.textStyleLeft}>Name: </Text>
                                            <Text style={styles.textStyle}>{usersDetail.company.name}</Text>
                                        </View>
                                        <View style={styles.viewStyle}>
                                            <Text style={styles.textStyleLeft}>Catch Phrase: </Text>
                                            <Text style={styles.textStyle}>{usersDetail.company.catchPhrase}</Text>
                                        </View>
                                        <View style={styles.viewStyle}>
                                            <Text style={styles.textStyleLeft}>BS: </Text>
                                            <Text style={styles.textStyle}>{usersDetail.company.bs}</Text>
                                        </View>

                                    </View>

                                </View>
                            )}
                        </View>
                    </Card>

                </View>

            </ScrollView>

        </SafeAreaView>


    )
}

const styles = StyleSheet.create({
    

    textTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        paddingLeft:10
    },

    viewStyle: {
        flexDirection: "row",
        paddingLeft: 10,
    },

    textStyleLeft: {
        fontSize: 16,
        fontWeight: "400",
        paddingVertical: '2%',
        color: "white",
        fontWeight: 'bold',
    },

    textStyle: {
        flex: 1,
        fontSize: 16,
        fontWeight: "400",
        paddingVertical: '2%',
        color: "white",
        flexWrap: 'wrap'

    },

    back: {
        padding: 10,
    }

})

export default ToDos
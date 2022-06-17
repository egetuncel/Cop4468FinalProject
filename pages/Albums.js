import React, { useState, useEffect, Component } from 'react';
import {

    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { Card, Text, Divider } from "@rneui/themed";
import axios from 'axios';

const Albums = ({ navigation }) => {

    const [albumsData, setAlbumsData] = useState([]);
    const [loadingAlbums, setLoadingAlbums] = useState(true);
    const apiUsers = "https://jsonplaceholder.typicode.com/users/";
    const apiAlbums = "https://jsonplaceholder.typicode.com/albums/";


    const fetchAlbums = async () => {

        try {
            const response = await axios.get(apiAlbums);
            const responseUsers = await axios.get(apiUsers);
            let newAlbum = [];
   
            response.data.forEach(elementAlbum => {
                responseUsers.data.forEach(elementUsers => {
                    if (elementAlbum.userId == elementUsers.id) {
                        elementAlbum['nameSurname'] = elementUsers.name;
                        newAlbum.push(elementAlbum);

                    }
                })

            })
            console.log(newAlbum);
            setAlbumsData(newAlbum);
            setLoadingAlbums(false);
        }
        catch (e) {
            console.log(e);
        }


    }

    useEffect(() => {
        fetchAlbums();
    }, []);

    const albumsInfo = ({ item }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('AlbumsById', { albumId: item.id })}>
                    <Card containerStyle={styles.view}>


                        <View>
                            <Text style={styles.text}>{item.title.toUpperCase()}</Text>
                            
                            <Text style={{ textAlign: 'right', color: 'white', marginTop:50 }}>Created By {item.nameSurname.toUpperCase()}</Text>
                        </View>
                    </Card>


                </TouchableOpacity>

            </View>
        )
    }

    return (
        <SafeAreaView>
            <ScrollView>


                <View style={styles.container}>
                    <Card containerStyle={{ borderRadius: 10 }}>
                        <Card.Title>ALBUMS</Card.Title>
                        <Card.Divider />
                        {loadingAlbums ? <ActivityIndicator color={'white'} /> : (
                            <FlatList
                                data={albumsData}
                                keyExtractor={({ id }, index) => id}
                                renderItem={albumsInfo}

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

export default Albums
import { StyleSheet, View, TouchableOpacity, ActivityIndicator, FlatList, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'
import { Card, Text, Image } from "@rneui/themed";
import axios from 'axios';
import Thumbnail from 'react-native-thumbnail-video';

const AlbumsById = ({ navigation, route }) => {

    const { albumId } = route.params;
    const [albumsDetail, setAlbumsDetail] = useState([]);
    const [loading, setLoading] = useState(true);
    const api = "https://jsonplaceholder.typicode.com/photos/";
    const ClosePage = () => {
        navigation.goBack();
    }

    const fetchAlbumsById = async () => {
        try {
            const response = await axios.get(api);
            console.log(response.data);
            let clickedAlbums = [];
            let i = 0;
            response.data.forEach(element => {
                if (response.data[i].albumId == albumId) {
                    clickedAlbums.push(element)
                }
                i = i + 1;
            });
            setAlbumsDetail(clickedAlbums);
            console.log(clickedAlbums)
            setLoading(false);
        }
        catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchAlbumsById();
    }, []);

    const photosInfo = ({ item }) => {
        return (
            <View>

                <Card containerStyle={{ borderRadius: 10 }}>
                    <Card.Title style={{ textAlign: 'left', fontWeight: 'bold', color: 'black' }}>{item.title.toUpperCase()}</Card.Title>
                    <Image
                        source={{ uri: item.url }}
                        style={{ width: "100%", height: 300 }}
                        resizeMode="contain">

                    </Image>
                </Card>
            <Card.Divider color='white' style={{paddingVertical:15}}></Card.Divider>


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
                <View style={styles.container}>
                    <Card containerStyle={{ borderRadius: 10, backgroundColor: "#00cca3" }}>
                        <View>
                            {loading ? <ActivityIndicator color={'white'} /> : (
                                <View>

                                    <Card.Title style={{ color: 'white' }}>PHOTOS</Card.Title>
                                    <Card.Divider color='white'></Card.Divider>
                                    <FlatList

                                        data={albumsDetail}
                                        keyExtractor={({ id }, index) => id}
                                        renderItem={photosInfo}

                                    />

                                </View>


                            )}
                        </View>
                    </Card>



                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default AlbumsById

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
        padding: 1,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'

    },

})
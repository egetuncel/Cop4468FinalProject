import { StyleSheet, View, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'
import { Card, Text, Image } from "@rneui/themed";
import axios from 'axios';

const AlbumsById = ({ navigation, route }) => {

    const { albumId } = route.params;
    const [albumsDetail, setAlbumsDetail] = useState([]);
    const [loading, setLoading] = useState(true);
    const api = "https://jsonplaceholder.typicode.com/photos";
    const ClosePage = () => {
        navigation.goBack();
    }

    const fetchAlbumsById = async () => {
        try {
            const response = await axios.get(api);
            console.log(response.data[0].albumId, "blabla")
            let clickedAlbums = [];
            let i = 0;
                response.data.forEach(element => {
                    if (response.data[i].albumId == albumId){
                        clickedAlbums.push(element.title)
                    }
                i = i + 1;
                });
                setAlbumsDetail(clickedAlbums);
                
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
               
                    <Card containerStyle={styles.view}>
                    
                    
                    <View style={styles.view2}>
                    <Image source={{uri: 'https://via.placeholder.com/600/92c952'}} />
                        
                    </View>
                    </Card>
                   

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
            <View>
                <Card containerStyle={{ borderRadius: 10, backgroundColor: "#00cca3", }}>
                    <View>
                        {loading ? <ActivityIndicator color={'white'} /> : (
                            <View>

                                <Card.Title style={styles.textTitle}>
                                 
                                </Card.Title>

                                {loading ? <ActivityIndicator color={'white'} /> : (
                        <FlatList
                            data={albumsDetail}
                            keyExtractor={({ id }, index) => id}
                            renderItem={photosInfo}

                        />
                    )}

                               
                            </View>
                        )}
                    </View>
                </Card>



            </View>
        </SafeAreaView>

    )
}

export default AlbumsById

const styles = StyleSheet.create({
    container: {
        borderColor: "#ddd",
        backgroundColor: "#00cca3",
        borderWidth: 0.5,
        borderRadius: 10,
    },

    textTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "white"
    },

    textStyle: {
        fontSize: 16,
        fontWeight: "400",
        color: "white",
    },

    back: {
        padding: 10,
    }

})
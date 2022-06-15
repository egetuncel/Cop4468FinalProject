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

const Albums = ({ navigation }) => {

    const [albumsData, setAlbumsData] = useState([]);
    const [loading, setLoading] = useState(true);

    const api = "https://jsonplaceholder.typicode.com/albums";

    const fetchAlbums = async () => {
       
        try {
            const response = await axios.get(api);
          
            setAlbumsData(response.data);
            setLoading(false);
        }
        catch (e) {
            console.log(e);
        }


    }

    useEffect(() => {
        fetchAlbums();
    });

    const albumsInfo = ({ item }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('AlbumsById', { albumId: item.id })}>
                    <Card containerStyle={styles.view}>
                    
                    
                    <View style={styles.view2}>
                        <Text style={styles.text}>{item.title.toUpperCase()}</Text>
                        <Icon name="arrow-forward-outline" style={{color:'white'}} size={22}></Icon>
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
                        {loading ? <ActivityIndicator color={'white'} /> : (
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
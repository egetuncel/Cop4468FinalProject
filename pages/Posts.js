import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'
import { Card } from "@rneui/themed";
import axios from 'axios';

const Posts = ({ navigation }) => {

    const [postsData, setPostsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const apiPosts = "https://jsonplaceholder.typicode.com/posts/";
    const apiLimit = "?_limit=20";

    const fetchPosts = async () => {
        try {
            const response = await axios.get(apiPosts + apiLimit);

            setPostsData(response.data);
            setLoading(false);
        }
        catch (e) {
            console.log(e);
        }


    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const postsInfo = ({ item }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('PostsById', { postsId: item.id })}>
                    <Card containerStyle={styles.view}>

                        <View>
                            <Card.Title style={{ textAlign: 'left', color: 'white', fontWeight: 'bold' }}>{item.title.toUpperCase()}</Card.Title>
                            <Card.Divider color='white'></Card.Divider>
                            <Text style={{ color: 'white' }}>{item.body}</Text>
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
                        <Card.Title>POSTS</Card.Title>
                        <Card.Divider />
                        {loading ? <ActivityIndicator color={'white'} /> : (
                            <FlatList
                                data={postsData}
                                keyExtractor={({ id }, index) => id}
                                renderItem={postsInfo}

                            />
                        )}
                    </Card>


                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default Posts

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




})

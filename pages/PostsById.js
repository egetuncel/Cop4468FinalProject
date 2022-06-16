import { StyleSheet, View, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'
import { Card, Text } from "@rneui/themed";
import axios from 'axios';

const PostsById = ({ navigation, route }) => {

    const { postsId } = route.params;
    const [postsDetail, setPostsDetail] = useState([]);
    const [loading, setLoading] = useState(true);
    const api = `https://jsonplaceholder.typicode.com/posts/${postsId}`;

    const ClosePage = () => {
        navigation.goBack();
    }

    const fetchPostsById = async () => {

        try {
            const response = await axios.get(api);

            setPostsDetail(response.data);
            setLoading(false);
        }
        catch (e) {
            console.log(e);
        }

    };

    useEffect(() => {
        fetchPostsById();
    }, []);


    return (
        <SafeAreaView>

            <TouchableOpacity onPress={ClosePage}>
                <View style={styles.back}>
                    <Icon name="chevron-back-outline" size={35}></Icon>
                </View>
            </TouchableOpacity>
            <View>


                <ScrollView>


                    <View>
                        <Card containerStyle={{ borderRadius: 10, backgroundColor: "#00cca3", }}>
                            <View>
                                {loading ? <ActivityIndicator color={'white'} /> : (
                                    <View>

                                        <Card.Title style={styles.textTitle}>
                                            {postsDetail.title.toUpperCase()}
                                        </Card.Title>



                                        <View style={styles.viewStyle}>

                                            <Text style={styles.textStyle}>{postsDetail.body}</Text>

                                        </View>

                                    </View>
                                )}
                            </View>
                        </Card>



                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>

    )
}

export default PostsById

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
import { StyleSheet, View, TouchableOpacity, ActivityIndicator, ScrollView, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'
import { Card, Text } from "@rneui/themed";
import axios from 'axios';

const PostsById = ({ navigation, route }) => {

    const { postsId } = route.params;
    const [postsDetail, setPostsDetail] = useState([]);
    const [commentListData, setCommentListData] = useState([]);
    const [loadingPosts, setLoadingPosts] = useState(true);
    const [loadingComments, setLoadingComments] = useState(true);
    const apiPosts = `https://jsonplaceholder.typicode.com/posts/${postsId}`;
    const apiComments = `https://jsonplaceholder.typicode.com/posts/${postsId}/comments`;

    const ClosePage = () => {
        navigation.goBack();
    }

    const fetchPostsById = async () => {

        try {
            const response = await axios.get(apiPosts);

            setPostsDetail(response.data);
            setLoadingPosts(false);
        }
        catch (e) {
            console.log(e);
        }

    };

    const fetchCommentList = async () => {

        try {

            const response = await axios.get(apiComments);

            setCommentListData(response.data);
            setLoadingComments(false);
        }
        catch (e) {
            console.log(e);
        }

    }

    useEffect(() => {
        fetchPostsById();
        fetchCommentList();
    }, []);

    const commentListInfo = ({ item }) => {
        return (

            <Card containerStyle={styles.view}>


                <View style={styles.view2}>
                    <Icon style={{ color: 'white' }} name="person-circle-outline" size={34}></Icon>
                    <Text style={{ paddingLeft: 8, fontSize: 14, color: 'white', fontWeight: 'bold' }}>{item.email}</Text>
                </View>
                <Card.Divider color='white'></Card.Divider>
                <Text style={styles.text}>{item.name.toUpperCase()}</Text>

                <Text style={{ color: 'white', fontSize: 14 }}>{item.body}</Text>
            </Card>

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

                <ScrollView>
                    <View style={styles.container}>

                        <Card containerStyle={{ borderRadius: 10 }}>
                            {loadingPosts ? <ActivityIndicator color={'white'} /> : (
                                <View>

                                    <Card.Title style={{ fontWeight: 'bold', color: 'black', textAlign:'left' }}>{postsDetail.title.toUpperCase()}</Card.Title>
                                    <Card.Divider />

                                    <View>
                                        <View>
                                            <Text style={{ color: 'black', paddingBottom: 15 }}>{postsDetail.body}</Text>
                                        </View>
                                        <Card.Divider></Card.Divider>

                                    </View>

                                </View>
                            )}
                            {loadingComments ? <ActivityIndicator color={'white'} /> : (
                                <View>
                                    <FlatList
                                        data={commentListData}
                                        keyExtractor={({ id }, index) => id}
                                        renderItem={commentListInfo}

                                    />
                                </View>
                            )

                            }


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
        marginTop: '5%',
    },

    text: {
        flex: 1,
        fontSize: 16,
        fontWeight: "400",
        color: "white",
        fontWeight: 'bold',
        flexWrap: 'wrap',
        paddingBottom: 5
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
    back: {
        padding: 10,
    }

})
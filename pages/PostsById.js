import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'

const PostsById = ({ navigation, route }) => {

    const { postsId } = route.params;
    const [postsDetail, setPostsDetail] = useState([]);
    const [loading, setLoading] = useState(true);
    const api = `https://jsonplaceholder.typicode.com/posts/${postsId}`;

    const ClosePage = () => {
        navigation.goBack();
    }

    const fetchPostsById = async () => {
        const resp = await fetch(api);
        const postsDetail = await resp.json();
        setPostsDetail(postsDetail);
        setLoading(false);
        console.log(postsDetail);
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

                {/* 1. tittle */}
                <View style={styles.container}>
                    {loading ? <ActivityIndicator color={'white'} /> : (
                        <View>
                            <View style={styles.viewStyle}>

                                <Text style={styles.textTitle}>{postsDetail.title.toUpperCase()}</Text>

                            </View>
                            <View style={styles.viewStyle}>

                                <Text style={styles.textStyle}>{postsDetail.body}</Text>
                            </View>

                        </View>
                    )}
                </View>


            </View>
        </SafeAreaView>

    )
}

export default PostsById

const styles = StyleSheet.create({
    container: {
        height: "auto",
        width: "auto",
        borderColor: "#ddd",
        backgroundColor: "#00cca3",
        borderWidth: 0.5,
        borderRadius: 10,
        marginVertical: '5%',
        marginHorizontal: '5%',
        overflow: "hidden"
    },

    textTitle: {
        fontSize: 18,
        fontWeight: "bold",
        paddingTop: '5%',
        paddingHorizontal: '3%',
        color: "white"
    },



    viewStyle: {
        flexDirection: "row",
        paddingLeft: 10,
    },

    textStyle: {
        flex: 1,
        fontSize: 16,
        fontWeight: "400",
        paddingVertical: '3%',
        color: "white",
        flexWrap: 'wrap'

    },

    back: {
        padding: 10,
        marginVertical: 10,
    }

})
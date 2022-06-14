import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Icon from 'react-native-vector-icons/Ionicons'

const Posts = ({ navigation }) => {

    const [postsData, setPostsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const api = `https://jsonplaceholder.typicode.com/posts`;
    const limit = `?_limit=20`;

    const fetchPosts = async () => {
        const resp = await fetch(api + limit);
        const postsData = await resp.json();
        setPostsData(postsData);
        setLoading(false);

    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const postsInfo = ({ item }) => {
        return (
            <View style={styles.view}>
                <TouchableOpacity onPress={() => navigation.navigate('PostsById', { postsId: item.id })}>
                    <View style={styles.view2}>
                        <Text style={styles.text}>{item.title.toUpperCase()}</Text>
                        <Icon name="arrow-forward-outline" style={{color:'white'}} size={22}></Icon>
                    </View>

                </TouchableOpacity>

            </View>
        )
    }

    return (
        <SafeAreaView>
            <ScrollView>


                <View style={styles.container}>

                    {loading ? <ActivityIndicator color={'white'} /> : (
                        <FlatList
                            data={postsData}
                            keyExtractor={({ id }, index) => id}
                            renderItem={postsInfo}

                        />
                    )}

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
        height: "auto",
        width: "auto",
        borderColor: "#ddd",
        backgroundColor: "#00cca3",
        borderWidth: 0.5,
        borderRadius: 10,
        marginTop: '5%',
        marginHorizontal: '5%',
        overflow: "hidden"
    },

    view2: {
        padding: 10,
        flexDirection: "row",
        position: 'relative',
        alignItems:'center'
    },

    back: {
        padding: 10,
        marginVertical: 10,
    }

})

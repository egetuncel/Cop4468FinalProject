import { StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons'

const UsersById = ({ navigation, route }) => {

    const { userId } = route.params;
    const [usersDetail, setUsersDetail] = useState([]);
    const [loading, setLoading] = useState(true);
    const api = `https://jsonplaceholder.typicode.com/users/${userId}`;

    const ClosePage = () => {
        navigation.goBack();
    }

    const fetchUsersDetail = async () => {


        const resp = await fetch(api);
        const usersDetail = await resp.json();
        setUsersDetail(usersDetail);
        setLoading(false);
        console.log(usersDetail);
    };

    useEffect(() => {
        fetchUsersDetail();
    }, []);


    return (
        <SafeAreaView>
             <ScrollView>
            <TouchableOpacity onPress={ClosePage}>
                <View style={styles.back}>
                    <Icon name="chevron-back-outline" size={35}></Icon>
                </View>
            </TouchableOpacity>
           

            
            <View>
                <View style={styles.container}>
                    <Text h1 style={styles.textTitle}>DETAILS</Text>



                    <View style={{ paddingVertical:'5%' }}>
                    {loading ? <ActivityIndicator color={'white'}/> : (
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

                            <Text h1 style={styles.textTitle}>Address</Text>

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

                            <Text h1 style={styles.textTitle}>Company Detail</Text>

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
                         )}
                    </View>
                   

                </View>

                        
            </View>
            </ScrollView>
        </SafeAreaView>

    )
}

export default UsersById

const styles = StyleSheet.create({
    container: {
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

    textTitle: {
        fontSize: 20, 
        fontWeight: "bold", 
        paddingTop: '5%', 
        paddingLeft: '3%', 
        color: "white"
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
        marginVertical: 10,
    }

})
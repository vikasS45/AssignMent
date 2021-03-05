/* eslint-disable quotes */
/* eslint-disable eol-last */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';

//import all the components we are going to use
import {
    SafeAreaView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Image,
    Dimensions,
    StatusBar,
    RefreshControl
} from 'react-native';
const width = Dimensions.get('window').width;

const Home = ({ navigation }) => {
    const [loading, setLoading] = useState(true);
    const [refreshLoading, setRefreshLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    let [offset, setOffset] = useState(1);
    let [loadMore, setLoadMore] = useState(true);

    useEffect(() => getData(), []);

    const getData = () => {
        console.log('getData');
        setLoading(true);
        fetch('https://reqres.in/api/users?page=' + offset)
            .then((response) => response.json())
            .then((responseJson) => {
                setOffset(offset + 1);
                setDataSource([...dataSource, ...responseJson.data]);
                if (dataSource.length > 1) {
                    setLoadMore(false);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleRefresh = () => {
        setOffset(1);
        getData();
    };

    const deleteUser = (id) => {
        fetch(`https://reqres.in/api/users/${id}`, {
            method: 'DELETE',
        });
        console.log(dataSource);
    };

    const renderFooter = () => {
        return (
            <View style={styles.footer}>
                {loadMore &&
                    <TouchableOpacity
                        activeOpacity={0.9}
                        onPress={getData}
                        style={styles.loadMoreBtn}>
                        <Text style={styles.btnText}>Load More</Text>
                        {loading ? (
                            <ActivityIndicator
                                color="white"
                                style={{ marginLeft: 8 }} />
                        ) : null}
                    </TouchableOpacity>
                }
            </View>
        );
    };

    const ItemView = ({ item }) => {
        return (
            <View style={styles.card}>
                <View style={{ flexDirection: 'row' }}>
                    <View>
                        <Image
                            source={{ uri: item.avatar }}
                            style={{ height: 80, width: 80, borderRadius: 10 }}
                        />
                    </View>
                    <View style={{ margin: 5 }}>
                        <Text style={styles.userData}> Id                 : {item.id} </Text>
                        <Text style={styles.userData}> First Name : {item.first_name} </Text>
                        <Text style={styles.userData}> Last name  : {item.last_name} </Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row-reverse' }}>
                    <TouchableOpacity onPress={() => deleteUser(item.id)}>
                        <Image source={require('../assets/delete.png')} style={{ height: 20, width: 20, backgroundColor: 'white' }} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar />
            <View style={styles.container}>
                <FlatList
                    data={dataSource}
                    keyExtractor={(item, index) => index.toString()}
                    enableEmptySections={true}
                    renderItem={ItemView}
                    scrollEventThrottle={700}
                    refreshControl={<RefreshControl
                        colors={["red", "green"]}
                        refreshing={refreshLoading}
                        onRefresh={handleRefresh} />}
                    ListFooterComponent={renderFooter}
                />
                <TouchableOpacity onPress={() => navigation.navigate('AddUser')}>
                    <View style={styles.addUser}>
                        <Text style={{
                            textAlign: 'center',
                            color: 'black',
                            fontWeight: 'bold',
                        }}
                        >ADD USER</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        flex: 1,
        backgroundColor: 'white',
    },
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
    loadMoreBtn: {
        padding: 10,
        backgroundColor: '#85c1e9',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
    card: {
        width: width - 20,
        marginLeft: 10,
        borderWidth: 1,
        borderRadius: 10,
        padding: 20,
        marginTop: 10,
        borderColor: '#85c1e9',
    },
    userData: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#5499c7',
    },
    addUser: {
        width: width - 20,
        marginLeft: 10,
        borderRadius: 10,
        padding: 20,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#5499c7',
    },
});

export default Home;
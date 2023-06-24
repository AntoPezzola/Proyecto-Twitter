import { View, Text, FlatList, StyleSheet, ScrollView } from "react-native"
import React, { useEffect, useState } from "react";
import useService from "./service/useService";
import Tweet from './Tweet';
import Spinner from 'react-native-loading-spinner-overlay';
import { useNavigation } from "@react-navigation/native";

const TrendingTopics = () => {
    const { trendingTopics } = useService({});
    const [trending, setTrending] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    useEffect(() => {
        trendingTopics()
            .then((tw) => {
                setTrending(tw);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    useEffect(() => {
        if (trending !== null) {
            setLoading(false);
        }
    }, [trending]);

    return (
        <View style={styles.container}>
                {trending === null ? (
                     <Spinner visible={loading} textContent={'Cargando...'} overlayColor={'transparent'} />
                ) : (
                    <FlatList style={styles.tweets}
                        data={trending}
                        keyExtractor={(tweet) => tweet.id}
                        renderItem={({ item }) => (
                            <Tweet navigation={navigation} key={item.id} tw={item} />
                        )}
                        ListEmptyComponent={() => <Text>No se encontraron tweets.</Text>}
                    />
                )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(15, 25, 34)',
    },
    scrollContainer: {
        flexGrow: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    tweets: {
        marginLeft: -10
    }
});

export default TrendingTopics;
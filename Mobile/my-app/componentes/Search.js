import { View, TextInput, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native"
import React, { useEffect, useState } from "react";
import useService from "./service/useService";
import Tweet from "./Tweet";
import { useNavigation } from "@react-navigation/native";


const Search = ({ route }) => {
    const [texto, setTexto] = useState('');
    const [tweetsSearch, setTweetsSearch] = useState([]);
    const { search } = useService({});
    const navigation = useNavigation();
    const [seBuscoTweets, setBuscoTweets] = useState(false);

    const logo = "https://img.icons8.com/sf-regular/48/a87ed3/search.png";

    const handleSearch = () => {
        search(texto)
            .then((tw) => {
                setTweetsSearch(tw.data.result);
                setBuscoTweets(true);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleInputChange = (text) => {
        setTexto(text);
    };

    const handleResetList = () => {
        setTweetsSearch([]);
        setBuscoTweets(false);
    };

    return (<View style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View>
                {tweetsSearch.length === 0 && !seBuscoTweets ? (
                    <>
                        <Text style={styles.question}>
                            ¿Qué deseas buscar?
                        </Text>
                        <View>
                            <TextInput
                                style={styles.input}
                                onChangeText={handleInputChange}
                                value={texto}
                                placeholder="Buscar en Twitter"
                                placeholderTextColor={'white'}
                            />
                        </View>
                        <View>
                            <TouchableOpacity
                                style={styles.searchButton}
                                onPress={handleSearch}
                            >
                                <Text style={styles.textBuscar}>
                                  Buscar
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </>
                ) : (
                    <View>
                        <TouchableOpacity
                            style={styles.resetButton}
                            onPress={handleResetList}
                        >
                            <Text style={styles.resetText}>
                                Volver a buscar
                            </Text>
                        </TouchableOpacity>
                        <FlatList
                            style={styles.tweets}
                            data={tweetsSearch}
                            keyExtractor={(tweet) => tweet.id}
                            renderItem={({ item }) => (
                                <Tweet navigation={navigation} key={item.id} tw={item} />
                            )}
                            ListEmptyComponent={() => (
                                <Text style={styles.buttonBuscar}>No se encontraron tweets.</Text>
                            )}
                        />
                    </View>
                )}
            </View>
        </ScrollView>
    </View>
    );
};

// Estilos
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
    content: {
        flex: 1,
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
    },
    input: {
        backgroundColor: '#4B3F72',
        marginTop: 20,
        width: 360,
        height: 60,
        paddingHorizontal: 10,
        borderRadius: 30,
    },
    searchButton: {
        width: 120,
        height: 40,
        marginTop: 20,
        color: "white",
        backgroundColor: '#7B5EBF',
        borderRadius: 20,
        padding: 8,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    resetButton: {
        width: 160,
        height: 40,
        marginTop: 20,
        color: "white",
        backgroundColor: '#7B5EBF',
        borderRadius: 20,
        padding: 8,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    textBuscar: {
        color: '#FFFFFF', 
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    question: { 
        color: '#FFFFFF',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20,

    },
    resetText: {
        color: '#FFFFFF', 
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    tweets: {
        marginLeft: 20,
        marginRight: 26
    }
});

export default Search;

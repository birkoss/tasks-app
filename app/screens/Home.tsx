import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

function Home({ navigation }) {
    return (
        <View style={styles.background}>
            <View style={styles.logoContainer}>
                <TouchableOpacity onPress={() => navigation.push("Details")}>
                    <Text>Home</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "tomato",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    loginButton: {
        width: "100%",
        height: 70,
        backgroundColor: "#fc5c65",
    },
    registerButton: {
        width: "100%",
        height: 70,
        backgroundColor: "#4ecdc4",
    },
    logoContainer: {
        position: "absolute",
        top: 70,
        alignItems: "center",
    },
});

export default Home;

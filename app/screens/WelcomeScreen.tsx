import React from "react";
import { View, StyleSheet, Text, Image } from "react-native";

function WelcomeScreen() {
    return (
        <View style={styles.background}>
            <View style={styles.logoContainer}>
                <Image source={require("../assets/icon.png")} />
                <Text>Logo</Text>
            </View>
            <View style={styles.loginButton}>
                <Text>Login</Text>
            </View>
            <View style={styles.registerButton}>
                <Text>Register</Text>
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

export default WelcomeScreen;

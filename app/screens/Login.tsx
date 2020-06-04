import React, { useContext } from "react";
import {
    StyleSheet,
    View,
    Image,
    KeyboardAvoidingView,
    Text,
} from "react-native";

import LoginForm from "./LoginForm";
import { TouchableOpacity } from "react-native-gesture-handler";

import { AuthContext } from "../context";

export default function Login({ navigation }) {
    const { login } = useContext(AuthContext);
    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require("../assets/icon.png")}
                />
            </View>
            <View style={styles.formContainer}>
                <LoginForm onLogin={login} />
            </View>
            <View style={styles.linkContainer}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("register")}
                >
                    <Text style={styles.link}>
                        New here ? Create an account
                    </Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3498db",
    },
    link: {
        color: "#ffffff",
    },
    linkContainer: {
        alignSelf: "center",
        marginBottom: 20,
    },
    logoContainer: {
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
    },
    logo: {
        width: 100,
        height: 100,
    },
});

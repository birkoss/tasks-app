import React, { useContext } from "react";
import {
    StyleSheet,
    View,
    Text,
    Image,
    KeyboardAvoidingView,
} from "react-native";

import LoginForm from "./LoginForm";
import { TouchableOpacity } from "react-native-gesture-handler";

import { AuthContext } from "../context";

export default function Register({ navigation }) {
    const { register } = useContext(AuthContext);

    return (
        <KeyboardAvoidingView behavior="padding" style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    style={styles.logo}
                    source={require("../assets/icon.png")}
                />
            </View>
            <View style={styles.formContainer}>
                <LoginForm onLogin={register} />
            </View>
            <View style={styles.linkContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("login")}>
                    <Text style={styles.link}>
                        Already have an account ? Log in
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

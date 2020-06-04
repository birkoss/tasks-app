import React, { useContext } from "react";
import {
    StyleSheet,
    View,
    Image,
    KeyboardAvoidingView,
    Text,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";

import LoginForm from "../components/LoginForm";

import { LoginScreenNavigationProp } from "../types";

import { AuthContext } from "../context";

type Props = {
    navigation: LoginScreenNavigationProp;
};

export default function Login({ navigation }: Props) {
    const { login } = useContext(AuthContext);
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={require("../assets/icon.png")}
                    />
                </View>
                <View>
                    <LoginForm onLogin={login} />
                </View>
                <View style={styles.linkContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Register")}
                    >
                        <Text style={styles.link}>
                            New here? Create an account!
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
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

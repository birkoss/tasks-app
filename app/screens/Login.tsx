import React, { useContext } from "react";
import {
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

import { fullStyles } from "../styles/full";

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
            <KeyboardAvoidingView
                behavior="padding"
                style={fullStyles.container}
            >
                <View style={fullStyles.logoContainer}>
                    <Image
                        style={fullStyles.logo}
                        source={require("../assets/icon.png")}
                    />
                </View>

                <LoginForm onLogin={login} />

                <View style={fullStyles.linkContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Register")}
                    >
                        <Text style={fullStyles.link}>
                            New here? Create an account
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

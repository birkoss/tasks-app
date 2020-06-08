import React, { useContext } from "react";
import {
    View,
    Text,
    Image,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";

import RegisterForm from "../components/forms/RegisterForm";
import { TouchableOpacity } from "react-native-gesture-handler";

import { RegisterScreenNavigationProp } from "../types";

import { fullStyles } from "../styles/full";

type Props = {
    navigation: RegisterScreenNavigationProp;
};

export default function RegisterScreen({ navigation }: Props) {
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

                <RegisterForm />

                <View style={fullStyles.linkContainer}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Login")}
                    >
                        <Text style={fullStyles.link}>
                            Already have an account ? Log in
                        </Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

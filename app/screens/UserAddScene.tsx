import React, { useEffect } from "react";
import {
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";

import UserForm from "../components/forms/UserForm";

import { RegisterScreenNavigationProp } from "../types";

import { navigationScreenOptions } from "../styles/navigation";

type Props = {
    navigation: RegisterScreenNavigationProp;
};

export default function UserAddScene({ navigation }: Props) {
    useEffect(() => {
        navigation.setOptions(navigationScreenOptions("Add Children"));
    }, []);

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <KeyboardAvoidingView
                style={{ flex: 1, padding: 20, backgroundColor: "#ffffff" }}
                behavior="padding"
            >
                <UserForm />
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

import React, { useEffect } from "react";
import {
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";

import UserForm from "../../components/forms/UserForm";

import { UsersScreenNavigationProp, UserAddScreenRouteProp } from "../../types";

import { navigationScreenOptions } from "../../styles/navigation";

type Props = {
    navigation: UsersScreenNavigationProp;
    route: UserAddScreenRouteProp;
};

export default function UserAddScreen({ navigation, route }: Props) {
    useEffect(() => {
        navigation.setOptions(navigationScreenOptions("Add Children"));
    }, []);

    const onAdded = () => {
        navigation.goBack();
    };

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
                <UserForm onAdded={onAdded} />
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

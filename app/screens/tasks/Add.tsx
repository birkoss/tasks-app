import React, { useEffect } from "react";
import {
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";

import TaskForm from "../../components/forms/TaskForm";

import { UsersScreenNavigationProp, UserAddScreenRouteProp } from "../../types";

import { navigationScreenOptions } from "../../styles/navigation";

type Props = {
    navigation: UsersScreenNavigationProp;
    route: UserAddScreenRouteProp;
};

export default function TaskAddScreen({ navigation }: Props) {
    useEffect(() => {
        navigation.setOptions(navigationScreenOptions("Add Task"));
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
                <TaskForm onAdded={onAdded} />
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    );
}

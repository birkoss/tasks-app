import React from "react";
import { TouchableOpacity, Text } from "react-native";

import { globalStyles } from "../../styles/global";

interface IProps {
    onPress: Function;
    label: string;
}

export default function Button({ onPress, label }: IProps) {
    return (
        <TouchableOpacity
            style={globalStyles.buttonContainer}
            onPress={onPress}
        >
            <Text style={globalStyles.buttonText}>{label}</Text>
        </TouchableOpacity>
    );
}

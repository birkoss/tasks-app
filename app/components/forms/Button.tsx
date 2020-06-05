import React from "react";
import { ActivityIndicator, TouchableOpacity, Text } from "react-native";

import { globalStyles } from "../../styles/global";

interface IProps {
    onPress: Function;
    title: string;
    isSubmitting: boolean;
}

export default function Button({ onPress, title, isSubmitting }: IProps) {
    return (
        <TouchableOpacity
            style={globalStyles.buttonContainer}
            onPress={onPress}
            disabled={isSubmitting}
        >
            {isSubmitting ? (
                <ActivityIndicator size="small" color="#ffffff" />
            ) : (
                <Text style={globalStyles.buttonText}>{title}</Text>
            )}
        </TouchableOpacity>
    );
}

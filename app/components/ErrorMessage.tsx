import React from "react";
import { StyleSheet, View, Text } from "react-native";

import { Ionicons } from "@expo/vector-icons";

interface IProps {
    message: string;
}

export default function ErrorMessage({ message }: IProps) {
    if (!message) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Ionicons style={styles.icon} name="ios-alert" size={30} />
            <Text style={styles.text}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "rgba(255, 255, 255, 0.6)",
        padding: 20,
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        color: "red",
        marginRight: 10,
    },
    text: {
        color: "red",
    },
});

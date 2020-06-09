import React from "react";
import { StyleSheet, View, ActivityIndicator } from "react-native";

type Props = {
    isLight: boolean;
};

export default function LoadingScreen({ isLight }: Props) {
    return (
        <View style={isLight ? styles.containerLight : styles.container}>
            <ActivityIndicator
                size="large"
                color={isLight ? "#3498db" : "#ffffff"}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#3498db",
    },
    containerLight: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#ffffff",
    },
});

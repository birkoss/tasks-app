import React, { ReactNode } from "react";
import { Ionicons } from "@expo/vector-icons";

export const navigationScreenOptions = (title: string) => {
    return {
        headerStyle: { backgroundColor: "#3498db" },
        headerTitleStyle: { color: "#ffffff" },

        headerBackTitleStyle: { color: "#ffffff" },
        headerTintColor: "#ffffff",
        title,
    };
};

export const navigationDrawerScreenOptions = (
    title: string,
    onMenuPress: Function
) => {
    return {
        ...navigationScreenOptions(title),
        headerLeft: () => (
            <React.Fragment>
                <Ionicons
                    name="ios-menu"
                    size={30}
                    style={{ marginLeft: 20 }}
                    color="white"
                    onPress={() => onMenuPress()}
                />
            </React.Fragment>
        ),
    };
};

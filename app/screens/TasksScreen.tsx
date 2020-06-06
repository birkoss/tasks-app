import React, { useEffect } from "react";
import { View, Text } from "react-native";

import { useNavigation } from "@react-navigation/native";

import { TasksScreenNavigationProp } from "../types";

import { Ionicons } from "@expo/vector-icons";

type Props = {
    navigation: TasksScreenNavigationProp;
};

const TasksScreen = ({ navigation }: Props) => {
    useEffect(() => {
        navigation.setOptions({
            headerStyle: { backgroundColor: "#3498db" },
            headerTitleStyle: { color: "#ffffff" },

            headerBackTitleStyle: { color: "#ffffff" },
            headerTintColor: "#ffffff",
            title: "MEs taches",
            headerLeft: () => (
                <React.Fragment>
                    <Ionicons
                        name="ios-menu"
                        size={30}
                        style={{ marginLeft: 20 }}
                        color="white"
                        onPress={() => navigation.toggleDrawer()}
                    />
                </React.Fragment>
            ),
        });
    }, []);
    return (
        <View>
            <Text onPress={() => navigation.push("Details")}>Content...</Text>
        </View>
    );
};

export default TasksScreen;

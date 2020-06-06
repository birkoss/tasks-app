import React, { useEffect } from "react";
import { View, Text } from "react-native";

import { TasksScreenNavigationProp } from "../types";

import { Ionicons } from "@expo/vector-icons";
import { navigationDrawerScreenOptions } from "../styles/navigation";

type Props = {
    navigation: TasksScreenNavigationProp;
};

const TasksScreen = ({ navigation }: Props) => {
    useEffect(() => {
        navigation.setOptions(
            navigationDrawerScreenOptions("Les taches", () =>
                navigation.toggleDrawer()
            )
        );
    }, []);
    return (
        <View>
            <Text onPress={() => navigation.push("Details")}>Content...</Text>
        </View>
    );
};

export default TasksScreen;

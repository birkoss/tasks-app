import React, { useContext } from "react";
import {
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    StatusBar,
} from "react-native";

import { AuthContext } from "../context";

import { HomeScreenNavigationProp } from "../types";

type Props = {
    navigation: HomeScreenNavigationProp;
};

function Home({ navigation }: Props) {
    const { logout } = useContext(AuthContext);

    return (
        <View style={styles.background}>
            <StatusBar barStyle="light-content" />
            <View style={styles.logoContainer}>
                <TouchableOpacity
                    onPress={() => navigation.push("Details", { taskID: 10 })}
                >
                    <Text>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => logout()}>
                    <Text>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    loginButton: {
        width: "100%",
        height: 70,
        backgroundColor: "#fc5c65",
    },
    registerButton: {
        width: "100%",
        height: 70,
        backgroundColor: "#4ecdc4",
    },
    logoContainer: {
        position: "absolute",
        top: 70,
        alignItems: "center",
    },
});

export default Home;

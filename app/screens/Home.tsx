import React, { useContext, useEffect } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import { AuthContext } from "../context";

import { HomeScreenNavigationProp } from "../types";
import { navigationDrawerScreenOptions } from "../styles/navigation";

type Props = {
    navigation: HomeScreenNavigationProp;
};

function Home({ navigation }: Props) {
    const { state, dispatch } = useContext(AuthContext);

    useEffect(() => {
        navigation.setOptions({
            ...navigationDrawerScreenOptions("Mes taches", () =>
                navigation.toggleDrawer()
            ),
            headerRight: ({}) => (
                <Text
                    style={{
                        marginRight: 20,
                        fontWeight: "bold",
                        color: "#ffffff",
                    }}
                >
                    {state.rewards} $
                </Text>
            ),
        });
    }, [state.rewards]);

    return (
        <View style={styles.background}>
            <View style={styles.logoContainer}>
                <TouchableOpacity
                    onPress={() => navigation.push("Details", { taskID: 10 })}
                >
                    <Text>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => alert(state.rewards)}>
                    <Text>Rewards {state.currentGroup} </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() =>
                        dispatch({
                            type: "LOGOUT",
                        })
                    }
                >
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

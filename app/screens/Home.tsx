import React, { useContext, useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

import { Container, Content, Button, Icon } from "native-base";

import { AuthContext } from "../context";
import { Tasks } from "../components/Tasks";

import { HomeScreenNavigationProp, Task } from "../types";
import { navigationDrawerScreenOptions } from "../styles/navigation";

import { GetTasks } from "../api";

type Props = {
    navigation: HomeScreenNavigationProp;
};

function Home({ navigation }: Props) {
    const { state, dispatch } = useContext(AuthContext);
    let [tasks, setTasks] = useState<Task[]>([]);

    const getTasks = () => {
        console.log("getTasks", state);
        GetTasks(state.token, state.currentGroup)
            .then((data) => {
                let newTasks: Task[] = [];
                data["tasks"].forEach((task: Task) => {
                    newTasks.push(task);
                });
                setTasks(newTasks);
            })
            .catch((error) => console.log("error", error));
    };

    useEffect(() => {
        navigation.setOptions({
            ...navigationDrawerScreenOptions("My Tasks", () =>
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

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getTasks();
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <Container>
            <Content contentContainerStyle={{ flexGrow: 1 }}>
                <Tasks tasks={tasks} onRefresh={getTasks} />
            </Content>
        </Container>
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

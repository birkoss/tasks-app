import React, { useContext } from "react";

import { StyleSheet, View, Alert } from "react-native";

import {
    Button,
    Text,
    Icon,
    Left,
    Body,
    Right,
    Card,
    CardItem,
} from "native-base";

import { Task } from "../types";
import { AuthContext } from "../context";
import { DeleteTask } from "../api";

type Props = {
    tasks: Task[];
    onRefresh: Function;
};

export function Tasks({ tasks, onRefresh }: Props) {
    const { state } = useContext(AuthContext);

    const deleteTask = (taskID: number) => {
        DeleteTask(state.token, taskID)
            .then((data) => onRefresh())
            .catch((error) => Alert.alert(error));
    };

    const askConfirmation = (taskID: number) => {
        Alert.alert(
            "Confirmation",
            "Are you sure you want to delete this task?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                },
                { text: "Yes", onPress: () => deleteTask(taskID) },
            ],
            { cancelable: false }
        );
    };

    return (
        <React.Fragment>
            {tasks.map((task) => (
                <Card key={task.id} style={{ flex: 0 }}>
                    <CardItem>
                        <Left>
                            <View style={styles.rewardContainer}>
                                <View style={styles.rewardBox}>
                                    <Text style={styles.rewardText}>
                                        {task.reward} $
                                    </Text>
                                </View>
                            </View>
                            <Body>
                                <Text>{task.name}</Text>
                                <Text note>April 15, 2020</Text>
                            </Body>
                        </Left>
                    </CardItem>
                    <CardItem>
                        <Body>
                            <Text>{task.description}</Text>
                        </Body>
                    </CardItem>
                    <CardItem footer bordered>
                        <Left>
                            {state.isChildren && (
                                <Button transparent>
                                    <Icon
                                        style={styles.action}
                                        active
                                        name="ios-add-circle"
                                    />
                                    <Text style={styles.action}>Select</Text>
                                </Button>
                            )}
                            {!state.isChildren && (
                                <Button
                                    transparent
                                    onPress={() =>
                                        askConfirmation(parseInt(task.id))
                                    }
                                >
                                    <Icon
                                        style={styles.actionDelete}
                                        active
                                        name="ios-remove-circle"
                                    />
                                    <Text style={styles.actionDelete}>
                                        Delete
                                    </Text>
                                </Button>
                            )}
                        </Left>

                        <Right>
                            <Text>{task.reward} $</Text>
                        </Right>
                    </CardItem>
                </Card>
            ))}
        </React.Fragment>
    );
}

const styles = StyleSheet.create({
    action: {
        color: "#2980b9",
    },
    actionDelete: {
        color: "#bf1650",
    },
    rewardContainer: {
        backgroundColor: "#2980b9",
        borderRadius: 50,
        width: 50,
        height: 50,
    },
    rewardBox: {
        width: "100%",
        height: "100%",
        flex: 1,
        justifyContent: "center",
    },
    rewardText: {
        marginLeft: 0,
        fontWeight: "bold",
        color: "white",
    },
});

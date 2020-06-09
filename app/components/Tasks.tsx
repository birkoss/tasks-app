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
import {
    DeleteTask,
    UserSelectTask,
    UserUnselectTask,
    UserCompleteTask,
} from "../api";
import { globalStyles } from "../styles/global";

type Props = {
    tasks: Task[];
    onRefresh: Function;
    onAdd?: Function;
};

export function Tasks({ tasks, onRefresh, onAdd }: Props) {
    const { state } = useContext(AuthContext);

    const deleteTask = (taskID: number) => {
        DeleteTask(state.token, taskID)
            .then((data) => onRefresh())
            .catch((error) => Alert.alert(error));
    };

    const selectTask = (taskID: number) => {
        UserSelectTask(state.token, taskID)
            .then((data) => onRefresh())
            .catch((error) => Alert.alert(error.message));
    };

    const unselectTask = (taskID: number) => {
        UserUnselectTask(state.token, taskID)
            .then((data) => onRefresh())
            .catch((error) => Alert.alert(error.message));
    };

    const completeTask = (taskID: number) => {
        UserCompleteTask(state.token, taskID)
            .then((data) => onRefresh())
            .catch((error) => Alert.alert(error.message));
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

    const getRightContent = (task: Task) => {
        if (
            state.isChildren &&
            task.taskusers.length !== 0 &&
            onAdd === undefined
        ) {
            if (task.taskusers[0].date_completed === null) {
                return (
                    <Button transparent onPress={() => completeTask(task.id)}>
                        <Icon
                            style={styles.action}
                            active
                            name="ios-checkmark-circle"
                        />
                        <Text style={styles.action}>Mark as Completed</Text>
                    </Button>
                );
            } else {
                return (
                    <Button transparent>
                        <Icon
                            style={styles.actionWait}
                            active
                            name="ios-time"
                        />
                        <Text style={styles.actionWait}>
                            Waiting for confirmation
                        </Text>
                    </Button>
                );
            }
        }

        return (
            <React.Fragment>
                <Text>Created by {task.user.firstname}</Text>
                {task.taskusers.length !== 0 && (
                    <Text>Selected by {task.taskusers[0].user.firstname}</Text>
                )}
            </React.Fragment>
        );
    };

    if (tasks.length === 0) {
        return (
            <View style={globalStyles.emptyContainer}>
                <Text style={globalStyles.emptyText}>
                    No task at the moment.
                </Text>
                {!state.isChildren && onAdd !== undefined && (
                    <Button transparent onPress={() => onAdd()}>
                        <Text style={globalStyles.link}>Add a new task</Text>
                    </Button>
                )}
            </View>
        );
    }

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
                                <Text note>{task.date_added}</Text>
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
                            {state.isChildren && task.taskusers.length === 0 && (
                                <Button
                                    transparent
                                    onPress={() => selectTask(task.id)}
                                >
                                    <Icon
                                        style={styles.action}
                                        active
                                        name="ios-add-circle"
                                    />
                                    <Text style={styles.action}>Select</Text>
                                </Button>
                            )}

                            {state.isChildren && task.taskusers.length !== 0 && (
                                <React.Fragment>
                                    <Button
                                        transparent
                                        onPress={() => unselectTask(task.id)}
                                    >
                                        <Icon
                                            style={styles.action}
                                            active
                                            name="ios-remove-circle"
                                        />
                                        <Text style={styles.action}>
                                            Unselect
                                        </Text>
                                    </Button>
                                </React.Fragment>
                            )}

                            {!state.isChildren && (
                                <Button
                                    transparent
                                    onPress={() => askConfirmation(task.id)}
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

                        <Right>{getRightContent(task)}</Right>
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
    actionWait: {
        color: "#b4b4b4",
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

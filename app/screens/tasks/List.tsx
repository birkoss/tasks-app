import React, { useEffect, useContext, useState } from "react";

import { Container, Content, Button, Icon } from "native-base";

import { TasksScreenNavigationProp } from "../../types";
import { navigationDrawerScreenOptions } from "../../styles/navigation";

import { GetTasks } from "../../api";

import { Tasks } from "../../components/Tasks";
import { Task } from "../../types";
import { AuthContext } from "../../context";
import LoadingScreen from "../Loading";

type Props = {
    navigation: TasksScreenNavigationProp;
};

const TaskListScreen = ({ navigation }: Props) => {
    let [isLoading, setIsLoading] = useState(true);
    let [tasks, setTasks] = useState<Task[]>([]);

    const { state } = useContext(AuthContext);

    const getTasks = () => {
        setIsLoading(true);
        GetTasks(state.token, state.currentGroup)
            .then((data) => {
                let newTasks: Task[] = [];
                data["tasks"].forEach((task: Task) => {
                    newTasks.push(task);
                });
                setTasks(newTasks);
                setIsLoading(false);
            })
            .catch((error) => console.log("error", error));
    };

    const addTask = () => {
        navigation.push("Add");
    };

    useEffect(() => {
        navigation.setOptions({
            ...navigationDrawerScreenOptions("Tasks", () =>
                navigation.toggleDrawer()
            ),
            headerRight: ({}) => {
                if (state.isChildren) {
                    return null;
                }
                return (
                    <Button
                        transparent
                        onPress={() => {
                            addTask();
                        }}
                    >
                        <Icon
                            name="ios-add-circle"
                            style={{ color: "white" }}
                        />
                    </Button>
                );
            },
        });
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getTasks();
        });

        return unsubscribe;
    }, [navigation]);

    if (isLoading) {
        return <LoadingScreen isLight={true} />;
    }

    return (
        <Container>
            <Content
                contentContainerStyle={{
                    flexGrow: 1,
                    padding: 8,
                    backgroundColor: "#f4f4f4",
                }}
            >
                <Tasks tasks={tasks} onRefresh={getTasks} onAdd={addTask} />
            </Content>
        </Container>
    );
};

export default TaskListScreen;

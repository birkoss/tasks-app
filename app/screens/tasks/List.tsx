import React, { useEffect, useContext, useState } from "react";

import { Container, Content, Button, Icon } from "native-base";

import { TasksScreenNavigationProp } from "../../types";
import { navigationDrawerScreenOptions } from "../../styles/navigation";

import { GetTasks } from "../../api";

import { Tasks } from "../../components/Tasks";
import { Task } from "../../types";
import { AuthContext } from "../../context";

type Props = {
    navigation: TasksScreenNavigationProp;
};

const TaskListScreen = ({ navigation }: Props) => {
    let [tasks, setTasks] = useState<Task[]>([]);

    const { state } = useContext(AuthContext);

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
                            navigation.push("Add");
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
            GetTasks(state.token, state.currentGroup)
                .then((data) => {
                    let newTasks: Task[] = [];
                    data["tasks"].forEach((task: Task) => {
                        newTasks.push(task);
                    });
                    setTasks(newTasks);
                })
                .catch((error) => console.log("error", error));
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <Container>
            <Content>
                <Tasks tasks={tasks} />
            </Content>
        </Container>
    );
};

export default TaskListScreen;

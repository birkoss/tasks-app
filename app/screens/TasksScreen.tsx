import React, { useEffect, useContext, useState } from "react";

import { Container, Content } from "native-base";

import { TasksScreenNavigationProp } from "../types";
import { navigationDrawerScreenOptions } from "../styles/navigation";

import { GetTasks } from "../api";

import { Tasks } from "../components/Tasks";
import { Task } from "../types";
import { AuthContext } from "../context";

type Props = {
    navigation: TasksScreenNavigationProp;
};

const TasksScreen = ({ navigation }: Props) => {
    let [tasks, setTasks] = useState<Task[]>([]);

    const { state, dispatch } = useContext(AuthContext);

    useEffect(() => {
        navigation.setOptions(
            navigationDrawerScreenOptions("Les taches", () =>
                navigation.toggleDrawer()
            )
        );
    }, []);

    useEffect(() => {
        GetTasks(state.token, state.currentGroup)
            .then((data) => {
                let newTasks: Task[] = [];
                data["tasks"].forEach((task: Task) => {
                    newTasks.push(task);
                });
                setTasks(newTasks);
            })
            .catch((error) => console.log("error", error));
    }, []);

    return (
        <Container>
            <Content>
                <Tasks tasks={tasks} />
            </Content>
        </Container>
    );
};

export default TasksScreen;

import React, { useEffect } from "react";

import { Container, Content } from "native-base";

import { TasksScreenNavigationProp } from "../types";
import { navigationDrawerScreenOptions } from "../styles/navigation";

import { Tasks } from "../components/Tasks";
import { Task } from "../task";

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

    let tasks: Task[] = [];
    tasks.push({ id: "1", name: "Vaiselle", rewards: 5, description: "abcd" });
    tasks.push({ id: "2", name: "Lavage", rewards: 2, description: "abcd..." });
    //tasks.push(new Task("Défaire le lave-vaiselle", 2));
    //tasks.push(new Task("Sortir les poubelles", 10));

    return (
        <Container>
            <Content>
                <Tasks tasks={tasks} />
            </Content>
        </Container>
    );
};

export default TasksScreen;

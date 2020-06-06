import React from "react";

import {
    Button,
    Text,
    Icon,
    Left,
    Body,
    Right,
    Card,
    CardItem,
    Thumbnail,
} from "native-base";

import { Task } from "../task";

type Props = {
    tasks: Task[];
};

export function Tasks({ tasks }: Props) {
    return (
        <React.Fragment>
            {tasks.map((task) => (
                <Card key={task.id} style={{ flex: 0 }}>
                    <CardItem>
                        <Left>
                            <Thumbnail
                                source={{
                                    uri:
                                        "https://img.icons8.com/material/4ac144/256/user-male.png",
                                }}
                            />
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
                            <Button transparent>
                                <Icon active name="ios-add-circle" />
                                <Text>Select</Text>
                            </Button>
                        </Left>

                        <Right>
                            <Text>{task.rewards} $</Text>
                        </Right>
                    </CardItem>
                </Card>
            ))}
        </React.Fragment>
    );
}

import React from "react";

import { View } from "react-native";

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

import { Task } from "../types";

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
                            <View
                                style={{
                                    backgroundColor: "#2980b9",
                                    borderRadius: 50,
                                    width: 50,
                                    height: 50,
                                }}
                            >
                                <View
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        flex: 1,
                                        justifyContent: "center",
                                    }}
                                >
                                    <Text
                                        style={{
                                            marginLeft: 0,
                                            fontWeight: "bold",
                                            color: "white",
                                        }}
                                    >
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
                            <Button transparent>
                                <Icon active name="ios-add-circle" />
                                <Text>Select</Text>
                            </Button>
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

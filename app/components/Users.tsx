import React from "react";

import { Text, Left, Content, Right, List, ListItem } from "native-base";

import { User } from "../types";

type Props = {
    users: User[];
};

export function Users({ users }: Props) {
    return (
        <React.Fragment>
            {users.map((user) => (
                <List key={user.id}>
                    <ListItem>
                        <Left>
                            <Content>
                                <Text>{user.email}</Text>

                                {user.groups.map((groupUser) => (
                                    <Text
                                        key={user.id + "_" + groupUser.group.id}
                                        note
                                    >
                                        {groupUser.group.name} -{" "}
                                        {groupUser.is_children
                                            ? "Children"
                                            : "Parent"}
                                    </Text>
                                ))}
                            </Content>
                        </Left>
                        <Right>
                            <Text note>{user.rewards} $</Text>
                        </Right>
                    </ListItem>
                </List>
            ))}
        </React.Fragment>
    );
}

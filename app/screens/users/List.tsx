import React, { useEffect, useContext, useState, useRef } from "react";

import { Button, Container, Content, Icon, Text } from "native-base";

import { UsersScreenNavigationProp } from "../../types";
import { navigationDrawerScreenOptions } from "../../styles/navigation";

import { GetUsers } from "../../api";
import { User } from "../../types";

import { Users } from "../../components/Users";

import { AuthContext } from "../../context";

type Props = {
    navigation: UsersScreenNavigationProp;
};

export default function UserListScreen({ navigation }: Props) {
    let [users, setUsers] = useState<User[]>([]);

    const { state, dispatch } = useContext(AuthContext);

    useEffect(() => {
        navigation.setOptions({
            ...navigationDrawerScreenOptions("Users", () =>
                navigation.toggleDrawer()
            ),
            headerRight: ({}) => (
                <Button
                    transparent
                    onPress={() => {
                        navigation.push("Add");
                    }}
                >
                    <Icon name="ios-add-circle" style={{ color: "white" }} />
                </Button>
            ),
        });
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            GetUsers(state.token, state.currentGroup)
                .then((data) => {
                    let newUsers: User[] = [];
                    data["users"].forEach((user: any) => {
                        newUsers.push(user);
                    });
                    setUsers(newUsers);
                })
                .catch((error) => console.log("error", error));
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <Container>
            <Content>
                <Users users={users} />
            </Content>
        </Container>
    );
}

import React, { useContext } from "react";
import { StyleSheet, Image } from "react-native";

import {
    DrawerItem,
    DrawerContentComponentProps,
    DrawerItemList,
} from "@react-navigation/drawer";

import { Container, Content, Icon, Header, Body } from "native-base";

import { AuthContext } from "../context";

export function SideMenu(props: DrawerContentComponentProps) {
    const { dispatch } = useContext(AuthContext);

    return (
        <Container>
            <Header style={styles.drawerHeader} iosBarStyle="light-content">
                <Body>
                    <Image
                        style={styles.drawerImage}
                        source={require("../assets/icon.png")}
                    />
                </Body>
            </Header>
            <Content style={styles.container}>
                <DrawerItemList {...props} />
                <DrawerItem
                    icon={({ color }) => (
                        <Icon name="ios-log-out" color={color} />
                    )}
                    label="Logout"
                    onPress={() =>
                        dispatch({
                            type: "LOGOUT",
                        })
                    }
                />
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#ffffff",
    },
    drawerHeader: {
        height: 200,
        backgroundColor: "#2980b9",
    },
    drawerImage: {
        height: 150,
        width: 150,
        borderRadius: 75,
    },
});

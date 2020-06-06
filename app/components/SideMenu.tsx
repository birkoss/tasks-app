import React from "react";
import { StyleSheet, Image } from "react-native";

import {
    DrawerItem,
    DrawerContentComponentProps,
    DrawerItemList,
} from "@react-navigation/drawer";

import { Container, Content, Icon, Header, Body } from "native-base";

export function SideMenu(props: DrawerContentComponentProps) {
    return (
        <Container>
            <Header style={styles.drawerHeader}>
                <Body>
                    <Image
                        style={styles.drawerImage}
                        source={require("../assets/icon.png")}
                    />
                </Body>
            </Header>
            <Content>
                <DrawerItemList {...props} />
                <DrawerItem
                    icon={({ size, color }) => (
                        <Icon name="ios-log-out" color={color} />
                    )}
                    label="Logout"
                    onPress={() => console.log("...")}
                />
            </Content>
        </Container>
    );
}

const styles = StyleSheet.create({
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: "#f4f4f4",
        borderTopWidth: 1,
    },
    drawerHeader: {
        height: 200,
        backgroundColor: "white",
    },
    drawerImage: {
        height: 150,
        width: 150,
        borderRadius: 75,
    },
});

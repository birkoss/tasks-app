import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";

import LoadingScreen from "./app/screens/Loading";
import Navigation from "./app/components/Navigation";

import {
    AuthContext,
    AuthContextReducer,
    AuthContextInitialValues,
} from "./app/context";

import { GetData, UserNotification } from "./app/api";

import { Group } from "./app/types";

export default function App() {
    const [isLoading, setIsLoading] = useState(true);

    const [state, dispatch] = React.useReducer(
        AuthContextReducer,
        AuthContextInitialValues
    );

    const getData = () => {
        if (state.token === "") {
            return;
        }

        GetData(state.token)
            .then((data) => {
                // Get all the groups
                let groups: Group[] = [];
                data["groups"].forEach((group: any) => {
                    groups.push({
                        id: group.group.id,
                        name: group.group.name,
                        is_children: group.is_children,
                    });
                });

                // Select the first group available
                let currentGroup: number = 0;
                let isChildren: boolean = true;
                groups.forEach((group) => {
                    currentGroup = group.id;
                    isChildren = group.is_children;
                });

                dispatch({
                    type: "SETDATA",
                    payload: {
                        id: data["id"],
                        rewards: data["rewards"],
                        groups: groups,
                        currentGroup: currentGroup,
                        isChildren: isChildren,
                    },
                });

                registerForPushNotifications();

                setIsLoading(false);
            })
            .catch((error) => console.log("GetData.catch", error));
    };

    const getTokenFromStorage = async () => {
        console.log("getTokenFromStorage");
        try {
            const token = await AsyncStorage.getItem("token");
            if (token !== null) {
                dispatch({
                    type: "LOGIN",
                    payload: {
                        token,
                    },
                });
            } else {
                setIsLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    };

    const registerForPushNotifications = async () => {
        const { status } = await Permissions.askAsync(
            Permissions.NOTIFICATIONS
        );
        if (status !== "granted") {
            // alert("No notification permissions!");
            return;
        }

        // Get the token that identifies this device
        let token = await Notifications.getExpoPushTokenAsync();

        // POST the token to your backend server from where you can retrieve it to send push notifications.
        UserNotification(state.token, token);
    };

    useEffect(() => {
        getTokenFromStorage();
    }, []);

    useEffect(() => {
        getData();
    }, [state.token]);

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            <Navigation />
        </AuthContext.Provider>
    );
}

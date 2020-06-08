import React, { useState, useEffect } from "react";
import { AsyncStorage, StatusBar } from "react-native";

import Loading from "./app/screens/Loading";
import Navigation from "./app/components/Navigation";

import {
    AuthContext,
    AuthContextReducer,
    AuthContextInitialValues,
} from "./app/context";

import { GetData } from "./app/api";

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

                setIsLoading(false);
            })
            .catch((error) => console.log("GetData.catch", error));
    };

    const getTokenFromStorage = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (token !== null) {
                dispatch({
                    type: "LOGIN",
                    payload: {
                        token,
                    },
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getTokenFromStorage();
    }, []);

    useEffect(() => {
        getData();
    }, [state.token]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            <Navigation />
        </AuthContext.Provider>
    );
}

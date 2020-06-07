import React, { createContext } from "react";
import { AsyncStorage } from "react-native";

import { Group } from "./types";

export const AuthContextInitialValues = {
    isAuthenticated: false,
    rewards: 0,
    token: "",
    groups: [],
    currentGroup: undefined,
};

type AuthContextInitialStateType = {
    isAuthenticated: boolean;
    rewards: number;
    token: string;
    groups: Group[];
    currentGroup: Number | undefined;
};

const AppContext = createContext<{
    state: AuthContextInitialStateType;
    dispatch: React.Dispatch<any>;
}>({
    state: AuthContextInitialValues,
    dispatch: () => null,
});

export const AuthContext = React.createContext<{
    state: AuthContextInitialStateType;
    dispatch: React.Dispatch<any>;
}>({
    state: AuthContextInitialValues,
    dispatch: () => null,
});

export const AuthContextReducer = (
    state: AuthContextInitialStateType,
    action: any
) => {
    switch (action.type) {
        case "SETDATA":
            console.log("SETDATA", action.payload);
            return {
                ...state,
                groups: action.payload.groups,
                rewards: action.payload.rewards,
                currentGroup: action.payload.currentGroup,
            };
        case "LOGIN":
            try {
                /* await */ AsyncStorage.setItem("token", action.payload.token);
            } catch (error) {
                console.log(error);
            }

            return {
                ...state,
                isAuthenticated: true,
                token: action.payload.token,
            };
        case "LOGOUT":
            AsyncStorage.removeItem("token");
            return {
                ...state,
                isAuthenticated: false,
                token: "",
            };
        default:
            console.log("action.type:" + action.type);
            return state;
    }
};

import React from "react";
import { AsyncStorage } from "react-native";

import { Group } from "./types";

type AuthContextInitialStateType = {
    isAuthenticated: boolean;
    isChildren: boolean;
    rewards: number;
    token: string;
    groups: Group[];
    userID: number;
    currentGroup: number;
};

export const AuthContextInitialValues = {
    isAuthenticated: false,
    isChildren: true,
    rewards: 0,
    token: "",
    groups: [],
    userID: 0,
    currentGroup: 0,
};

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
            return {
                ...state,
                userID: action.payload.id,
                groups: action.payload.groups,
                rewards: action.payload.rewards,
                currentGroup: action.payload.currentGroup,
                isChildren: action.payload.isChildren,
            };
        case "LOGIN":
            try {
                /* await */ AsyncStorage.setItem("token", action.payload.token);
            } catch (error) {
                console.log("AuthContextReducer/AsyncStorage.setItem", error);
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

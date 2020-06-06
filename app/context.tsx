import React, { createContext } from "react";
import { AsyncStorage } from "react-native";

interface AuthProps {
    logout: Function;
    login: Function;
    register: Function;
}

export const AuthContextInitialValues = {
    isAuthenticated: false,
    rewards: 0,
    token: "",
};

type AuthContextInitialStateType = {
    isAuthenticated: boolean;
    rewards: number;
    token: string;
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
        case "REWARDS":
            return {
                ...state,
                rewards: action.payload.rewards,
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
            return state;
    }
};

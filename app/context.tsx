import React from "react";

interface AuthProps {
    logout: Function;
    login: Function;
    register: Function;
}
export const AuthContext = React.createContext({} as AuthProps);

interface UserProps {
    rewards: Number;
    refreshRewards: Function;
}
export const UserContext = React.createContext({} as UserProps);

import React, {
    createContext,
    Dispatch,
    Reducer,
    useContext,
    useReducer,
} from "react";

interface IContextProps {
    logout: Function;
    login: Function;
    register: Function;
}

export const AuthContext = React.createContext({} as IContextProps);

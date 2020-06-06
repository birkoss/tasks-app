import React, { useState, useEffect } from "react";
import { AsyncStorage } from "react-native";

import Loading from "./app/screens/Loading";
import Navigation from "./app/components/Navigation";

import {
    AuthContext,
    AuthContextReducer,
    AuthContextInitialValues,
} from "./app/context";

import { GetRewards } from "./app/api";

export default function App() {
    const [isLoading, setIsLoading] = useState(true);

    const [state, dispatch] = React.useReducer(
        AuthContextReducer,
        AuthContextInitialValues
    );

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (token !== null) {
                dispatch({
                    type: "LOGIN",
                    payload: {
                        token,
                    },
                });

                GetRewards(token)
                    .then((data) => {
                        dispatch({
                            type: "REWARDS",
                            payload: {
                                rewards: data["rewards"],
                            },
                        });
                    })
                    .catch((error) => console.log(error));
            }
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getToken();
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            <Navigation />
        </AuthContext.Provider>
    );
}

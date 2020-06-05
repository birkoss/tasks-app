import React, { useState, useEffect, useMemo } from "react";
import { StyleSheet, AsyncStorage } from "react-native";

import Loading from "./app/screens/Loading";
import Navigation from "./app/components/Navigation";

import { AuthContext } from "./app/context";

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState("");

    const authContext = useMemo(() => {
        return {
            login: (token: string = "") => {
                storeToken(token);
            },
            register: (token: string = "") => {
                storeToken(token);
            },
            logout: () => {
                setUserToken("");
            },
        };
    }, []);

    const storeToken = async (token: string) => {
        setUserToken(token);
        try {
            await AsyncStorage.setItem("token", token);
        } catch (error) {
            console.log(error);
        }
    };

    const getToken = async () => {
        try {
            const token = await AsyncStorage.getItem("token");
            if (token !== null) {
                setUserToken(token);
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
        <AuthContext.Provider value={authContext}>
            <Navigation userToken={userToken} />
        </AuthContext.Provider>
    );
}

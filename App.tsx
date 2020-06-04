import React, { useState, useEffect, useMemo } from "react";
import { StyleSheet } from "react-native";

import Splash from "./app/screens/Splash";
import Navigation from "./app/components/Navigation";

import { AuthContext } from "./app/context";

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState("");

    const authContext = useMemo(() => {
        return {
            login: (token: string = "") => {
                setUserToken(token);
                setIsLoading(false);
            },
            register: (token: string = "") => {
                setUserToken(token);
                setIsLoading(false);
            },
            logout: () => {
                setUserToken("");
                setIsLoading(false);
            },
        };
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    if (isLoading) {
        return <Splash />;
    }

    return (
        <AuthContext.Provider value={authContext}>
            <Navigation userToken={userToken} />
        </AuthContext.Provider>
    );
}

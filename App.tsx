import React, { useState, useEffect, useMemo } from "react";
import { StyleSheet, AsyncStorage } from "react-native";

import Loading from "./app/screens/Loading";
import Navigation from "./app/components/Navigation";

import { AuthContext, UserContext } from "./app/context";
import { GetRewards } from "./app/api";

export default function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [userToken, setUserToken] = useState("");
    const [userRewards, setUserRewards] = useState(0);

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

    const userContext = useMemo(() => {
        return {
            rewards: userRewards,
            refreshRewards: async () => {
                GetRewards(userToken);
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

                GetRewards(token)
                    .then((data) => {
                        setUserRewards(data["rewards"]);
                        console.log("New Rewards", data["rewards"]);
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
        <AuthContext.Provider value={authContext}>
            <UserContext.Provider value={userContext}>
                <Navigation userToken={userToken} />
            </UserContext.Provider>
        </AuthContext.Provider>
    );
}

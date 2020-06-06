import React, { useContext } from "react";

import { Ionicons } from "@expo/vector-icons";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import WelcomeScreen from "../screens/WelcomeScreen";

import { AuthStackParamList, HomeStackParamList } from "../types";
import { Text } from "react-native";

import { AuthContext } from "../context";

const AuthStack = createStackNavigator<AuthStackParamList>();

const HomeStack = createStackNavigator<HomeStackParamList>();
const HomeStackScreen = () => {
    const { state } = React.useContext(AuthContext);

    return (
        <HomeStack.Navigator
            screenOptions={({ navigation }) => {
                return {
                    headerStyle: { backgroundColor: "#3498db" },
                    headerTitleStyle: { color: "#ffffff" },

                    headerBackTitleStyle: { color: "#ffffff" },
                    headerTintColor: "#ffffff",

                    headerLeft: ({ onPress }) => (
                        <React.Fragment>
                            <Ionicons
                                name="ios-menu"
                                size={30}
                                style={{ marginLeft: 20 }}
                                color="white"
                                onPress={() => navigation.toggleDrawer()}
                            />
                        </React.Fragment>
                    ),

                    headerRight: ({}) => (
                        <Text
                            style={{
                                marginRight: 20,
                                fontWeight: "bold",
                                color: "#ffffff",
                            }}
                        >
                            {state.rewards} $
                        </Text>
                    ),
                };
            }}
        >
            <HomeStack.Screen name="Home" component={Home} />
            <HomeStack.Screen name="Details" component={Home} />
        </HomeStack.Navigator>
    );
};

const TasksStack = createStackNavigator();
const TasksStackScreen = () => (
    <TasksStack.Navigator>
        <TasksStack.Screen name="Tasks" component={WelcomeScreen} />
        <TasksStack.Screen name="Details" component={Register} />
    </TasksStack.Navigator>
);

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
    <ProfileStack.Navigator>
        <ProfileStack.Screen name="Profile" component={WelcomeScreen} />
    </ProfileStack.Navigator>
);

const Tabs = createBottomTabNavigator();
const TabsScreen = () => (
    <Tabs.Navigator
        tabBarOptions={{
            inactiveBackgroundColor: "#3498db",
            inactiveTintColor: "rgba(255, 255, 255, 0.8)",
            activeBackgroundColor: "#2980b9",
            activeTintColor: "#ffffff",
        }}
    >
        <Tabs.Screen
            name="Home"
            component={HomeStackScreen}
            options={{
                tabBarLabel: "My Tasks",
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons
                        name="ios-information-circle"
                        size={size}
                        color={color}
                    />
                ),
            }}
        />
        <Tabs.Screen
            name="Tasks"
            component={TasksStackScreen}
            options={{
                tabBarLabel: "All Tasks",
                tabBarIcon: ({ focused, color, size }) => (
                    <Ionicons name="ios-list" size={size} color={color} />
                ),
            }}
        />
    </Tabs.Navigator>
);

const Drawer = createDrawerNavigator();

export default function Navigation() {
    const { state } = useContext(AuthContext);
    return (
        <NavigationContainer>
            {state.isAuthenticated ? (
                <Drawer.Navigator>
                    <Drawer.Screen
                        name="Home"
                        component={TabsScreen}
                        options={{
                            drawerLabel: "Home",
                        }}
                    />
                    <Drawer.Screen
                        name="Profile"
                        component={ProfileStackScreen}
                    />
                </Drawer.Navigator>
            ) : (
                <AuthStack.Navigator headerMode="none">
                    <AuthStack.Screen
                        name="Login"
                        component={Login}
                        options={{
                            animationEnabled: false,
                        }}
                    />
                    <AuthStack.Screen
                        name="Register"
                        component={Register}
                        options={{
                            animationEnabled: false,
                        }}
                    />
                </AuthStack.Navigator>
            )}
        </NavigationContainer>
    );
}

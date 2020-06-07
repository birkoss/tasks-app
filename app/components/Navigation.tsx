import React, { useContext } from "react";

import { Ionicons } from "@expo/vector-icons";

import { IconWithBadge } from "../components/IconWithBadge";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";

import { SideMenu } from "./SideMenu";

import Login from "../screens/Login";
import Register from "../screens/Register";
import Home from "../screens/Home";
import WelcomeScreen from "../screens/WelcomeScreen";
import TasksListScreen from "../screens/tasks/List";

import UserAddScreen from "../screens/users/Add";
import UserListScreen from "../screens/users/List";

import {
    AuthStackParamList,
    UsersStackParamList,
    HomeStackParamList,
    TasksStackParamList,
} from "../types";

import { AuthContext } from "../context";

const AuthStack = createStackNavigator<AuthStackParamList>();

const HomeStack = createStackNavigator<HomeStackParamList>();
const HomeStackScreen = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Home" component={Home} />
            <HomeStack.Screen name="Details" component={Home} />
        </HomeStack.Navigator>
    );
};

const TasksStack = createStackNavigator<TasksStackParamList>();
const TasksStackScreen = () => (
    <TasksStack.Navigator>
        <TasksStack.Screen name="List" component={TasksListScreen} />
        <TasksStack.Screen name="Add" component={Register} />
    </TasksStack.Navigator>
);

const UsersStack = createStackNavigator<UsersStackParamList>();
const UsersStackScreen = () => {
    return (
        <UsersStack.Navigator>
            <UsersStack.Screen name="List" component={UserListScreen} />
            <UsersStack.Screen name="Add" component={UserAddScreen} />
        </UsersStack.Navigator>
    );
};

const ProfileStack = createStackNavigator();
const ProfileStackScreen = () => (
    <ProfileStack.Navigator>
        <ProfileStack.Screen name="Profile" component={WelcomeScreen} />
    </ProfileStack.Navigator>
);

const Tabs = createBottomTabNavigator();
const TabsScreen = () => {
    const { state } = useContext(AuthContext);

    return (
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
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons
                            name="ios-information-circle"
                            size={size}
                            color={color}
                        />
                    ),
                }}
            />
            {!state.isChildren && (
                <Tabs.Screen
                    name="Users"
                    component={UsersStackScreen}
                    options={{
                        tabBarLabel: "Users",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons
                                name="ios-person"
                                size={size}
                                color={color}
                            />
                        ),
                    }}
                />
            )}
            <Tabs.Screen
                name="Tasks"
                component={TasksStackScreen}
                options={{
                    tabBarLabel: "All Tasks",
                    tabBarIcon: ({ color, size }) => (
                        <IconWithBadge
                            name="ios-list"
                            size={size}
                            color={color}
                            badgeCount={3}
                        />
                    ),
                }}
            />
        </Tabs.Navigator>
    );
};

const Drawer = createDrawerNavigator();

export default function Navigation() {
    const { state } = useContext(AuthContext);

    return (
        <NavigationContainer>
            {state.isAuthenticated ? (
                <Drawer.Navigator
                    drawerContent={(props) => <SideMenu {...props} />}
                >
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

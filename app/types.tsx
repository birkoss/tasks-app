import { StackNavigationProp } from "@react-navigation/stack";

export type AuthStackParamList = {
    Login: undefined;
    Register: undefined;
};
export type LoginScreenNavigationProp = StackNavigationProp<
    AuthStackParamList,
    "Login"
>;
export type RegisterScreenNavigationProp = StackNavigationProp<
    AuthStackParamList,
    "Register"
>;

export type HomeStackParamList = {
    Home: undefined;
    Details: { taskID: number };
};
export type HomeScreenNavigationProp = StackNavigationProp<
    HomeStackParamList,
    "Home"
>;

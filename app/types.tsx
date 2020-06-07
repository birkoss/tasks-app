import { CompositeNavigationProp, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { DrawerNavigationProp } from "@react-navigation/drawer";

/*type ProfileScreenRouteProp = RouteProp<RootStackParamList, 'Profile'>;

type Props = {
  route: ProfileScreenRouteProp;
};*/

export type DrawerParamList = {
    Home: undefined;
    Profile: undefined;
};

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
export type HomeScreenNavigationProp = CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList>,
    StackNavigationProp<HomeStackParamList>
>;

export type TasksStackParamList = {
    Tasks: undefined;
    Details: { taskID: number };
    Add: { onAdded: Function };
};
export type TasksScreenNavigationProp = CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList>,
    StackNavigationProp<TasksStackParamList>
>;

export type UsersStackParamList = {
    List: undefined;
    Add: { onAdded: Function };
};
export type UsersScreenNavigationProp = CompositeNavigationProp<
    DrawerNavigationProp<DrawerParamList>,
    StackNavigationProp<UsersStackParamList>
>;
export type UserAddScreenRouteProp = RouteProp<UsersStackParamList, "Add">;

export interface Group {
    id: number;
    name: string;
    is_children: boolean;
}

export interface Task {
    id: string;
    name: string;
    reward: number;
    description: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    rewards: number;
    is_children: boolean;
    firstname?: string;
}

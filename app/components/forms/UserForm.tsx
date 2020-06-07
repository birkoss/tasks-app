import React, { useState, useEffect, useRef, useContext } from "react";
import { Alert, View, Text, TextInput, Keyboard } from "react-native";

import { useForm, ErrorMessage } from "react-hook-form";

import Button from "./Button";

import { globalStyles } from "../../styles/global";

import { validateEmail } from "../../validations";

import { AddUser } from "../../api";
import { AuthContext } from "../../context";

type Props = {
    onAdded: Function;
};

type formData = {
    email: string;
    password: string;
    firstname: string;
};

const defaultValues = {
    email: "",
    password: "",
    firstname: "",
};

export default function UserForm({ onAdded }: Props) {
    const { state, dispatch } = useContext(AuthContext);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { errors, register, setValue, handleSubmit } = useForm<formData>({
        defaultValues,
    });

    const onSubmit = (data: formData) => {
        setIsSubmitting(true);

        Keyboard.dismiss();

        AddUser(state.token, state.currentGroup, data)
            .then(onSubmitSuccess)
            .catch((error) => {
                onSubmitFailed(error);
            });
    };

    const onSubmitSuccess = (data: any) => {
        setIsSubmitting(false);
        onAdded();
    };

    const onSubmitFailed = (error: any) => {
        setIsSubmitting(false);
        Alert.alert(error.message);
    };

    const inputs = useRef<(TextInput | null)[]>([]);

    useEffect(() => {
        register(
            { name: "email" },
            {
                required: "Email is mandatory",
                validate: (value) => validateEmail(value) || true,
            }
        );
        register(
            { name: "password" },
            { required: "Password is mandatory", min: 8 }
        );
        register(
            { name: "firstname" },
            {
                required: "Firstname is mandatory",
                min: 8,
            }
        );
    }, [register]);

    return (
        <View>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                placeholder="Email"
                placeholderTextColor="rgba(41, 128, 185, 0.7)"
                ref={(ref) => (inputs.current[0] = ref)}
                returnKeyType="next"
                onSubmitEditing={() => inputs.current[1]?.focus()}
                style={[
                    globalStyles.inputDark,
                    errors.email ? globalStyles.errorInput : {},
                ]}
                onChangeText={(text) => setValue("email", text, true)}
            />
            <ErrorMessage
                style={globalStyles.formErrorMessage}
                errors={errors}
                name="email"
                as={<Text />}
            />

            <TextInput
                autoCorrect={false}
                placeholder="Firstname"
                placeholderTextColor="rgba(41, 128, 185, 0.7)"
                ref={(ref) => (inputs.current[1] = ref)}
                returnKeyType="next"
                onSubmitEditing={() => inputs.current[2]?.focus()}
                style={[
                    globalStyles.inputDark,
                    errors.firstname ? globalStyles.errorInput : {},
                ]}
                onChangeText={(text) => setValue("firstname", text, true)}
            />
            <ErrorMessage
                style={globalStyles.formErrorMessage}
                errors={errors}
                name="firstname"
                as={<Text />}
            />

            <TextInput
                autoCapitalize="none"
                placeholder="Password"
                placeholderTextColor="rgba(41, 128, 185, 0.7)"
                returnKeyType="next"
                onSubmitEditing={() => handleSubmit(onSubmit)}
                ref={(ref) => (inputs.current[2] = ref)}
                style={[
                    globalStyles.inputDark,
                    errors.password ? globalStyles.errorInput : {},
                ]}
                onChangeText={(text) => setValue("password", text, true)}
            />
            <ErrorMessage
                style={globalStyles.formErrorMessage}
                errors={errors}
                name="password"
                as={<Text />}
            />

            <Button
                isSubmitting={isSubmitting}
                onPress={handleSubmit(onSubmit)}
                title="SAVE"
            />
        </View>
    );
}

import React, { useState, useEffect, useRef, useContext } from "react";
import {
    Alert,
    View,
    Text,
    TextInput,
    Keyboard,
    DatePickerAndroid,
} from "react-native";

import { useForm, ErrorMessage } from "react-hook-form";

import Button from "../components/forms/Button";

import { globalStyles } from "../styles/global";

import { validateEmail } from "../validations";

import { AuthContext } from "../context";

import { Login } from "../api";

type formData = {
    email: string;
    password: string;
};

const defaultValues = {
    email: "",
    password: "",
};

export default function LoginForm() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { dispatch } = useContext(AuthContext);

    const { errors, register, setValue, handleSubmit } = useForm<formData>({
        defaultValues,
    });

    const onSubmit = (data: formData) => {
        setIsSubmitting(true);

        Keyboard.dismiss();

        Login(data.email, data.password)
            .then(onSubmitSuccess)
            .catch((error) => {
                onSubmitFailed(error);
            });
    };

    const onSubmitSuccess = (data: any) => {
        setIsSubmitting(false);
        dispatch({
            type: "LOGIN",
            payload: {
                token: data["token"],
            },
        });
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
    }, [register]);

    return (
        <View style={globalStyles.formContainer}>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                placeholder="Email"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                ref={(ref) => (inputs.current[0] = ref)}
                returnKeyType="next"
                onSubmitEditing={() => inputs.current[1]?.focus()}
                style={[
                    globalStyles.input,
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
                placeholder="Password"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                returnKeyType="go"
                onSubmitEditing={handleSubmit(onSubmit)}
                ref={(ref) => (inputs.current[1] = ref)}
                style={[
                    globalStyles.input,
                    errors.password ? globalStyles.errorInput : {},
                ]}
                secureTextEntry
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
                title="LOGIN"
            />
        </View>
    );
}

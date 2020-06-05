import React, { useState } from "react";
import { View, Text, TextInput, Keyboard } from "react-native";

import { Formik } from "formik";

import ErrorMessage from "../components/ErrorMessage";
import Button from "../components/forms/Button";

import { globalStyles } from "../styles/global";

import { Login } from "../api";

interface IProps {
    onLogin: Function;
}

export default function LoginForm({ onLogin }: IProps) {
    let passwordInputRef: TextInput;

    let [errorMessage, setErrorMessage] = useState("");

    const loginSuccess = (data: any) => {
        onLogin(data["token"]);
    };

    const loginFailed = (error: any) => {
        setErrorMessage(error.message);
    };

    return (
        <View>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                }}
                onSubmit={(values, actions) => {
                    Keyboard.dismiss();

                    Login(values.email, values.password)
                        .then(loginSuccess)
                        .catch((error) => {
                            actions.setSubmitting(false);
                            loginFailed(error);
                        });
                }}
                validate={(values) => {
                    let errors: any = {};

                    if (!values.email) {
                        errors.email = "Email is required!";
                    } else if (
                        !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(
                            values.email
                        )
                    ) {
                        errors.email = "Email is not valid!";
                    }

                    if (!values.password) {
                        errors.password = "Password is required!";
                    }

                    return errors;
                }}
            >
                {({
                    handleChange,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isSubmitting,
                }) => (
                    <View style={globalStyles.formContainer}>
                        <ErrorMessage message={errorMessage} />

                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                            placeholder="Email"
                            placeholderTextColor="rgba(255, 255, 255, 0.7)"
                            returnKeyType="next"
                            onSubmitEditing={() => passwordInputRef.focus()}
                            style={[
                                globalStyles.input,
                                errors.email && touched.email
                                    ? globalStyles.errorInput
                                    : {},
                            ]}
                            onChangeText={handleChange("email")}
                            value={values.email}
                        />
                        {errors.email && touched.email && (
                            <Text style={globalStyles.formErrorMessage}>
                                {errors.email}
                            </Text>
                        )}
                        <TextInput
                            placeholder="Password"
                            placeholderTextColor="rgba(255, 255, 255, 0.7)"
                            returnKeyType="go"
                            onSubmitEditing={handleSubmit}
                            ref={(input) => (passwordInputRef = input!)}
                            style={[
                                globalStyles.input,
                                errors.password && touched.password
                                    ? globalStyles.errorInput
                                    : {},
                            ]}
                            secureTextEntry
                            onChangeText={handleChange("password")}
                            value={values.password}
                        />
                        {errors.password && touched.password && (
                            <Text style={globalStyles.formErrorMessage}>
                                {errors.password}
                            </Text>
                        )}

                        <Button
                            isSubmitting={isSubmitting}
                            onPress={handleSubmit}
                            label="LOGIN!"
                        />
                    </View>
                )}
            </Formik>
        </View>
    );
}

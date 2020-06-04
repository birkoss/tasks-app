import React, { useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Keyboard,
} from "react-native";

import { Formik } from "formik";

import ErrorMessage from "../components/ErrorMessage";

import { globalStyles } from "../styles/global";

import { Login } from "../api";

interface IProps {
    onLogin: Function;
}

export default function LoginForm({ onLogin }: IProps) {
    let passwordInput: TextInput;
    let passwordConfirmInput: TextInput;

    let [errorMessage, setErrorMessage] = useState("");

    return (
        <View>
            <Formik
                initialValues={{
                    email: "",
                    password: "",
                    confirmPassword: "",
                }}
                onSubmit={(values) => {
                    Keyboard.dismiss();

                    Login(values.email, values.password)
                        .then((response) => {
                            if (response["token"] && response["token"] !== "") {
                                onLogin(response["token"]);
                            } else {
                                if (response["message"]) {
                                    setErrorMessage(response["message"]);
                                } else {
                                    setErrorMessage(
                                        "An error occured! Please try again!"
                                    );
                                }
                            }
                        })
                        .catch((error) => {
                            setErrorMessage(
                                "An error occured! Please try again!"
                            );
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
                {({ handleChange, handleSubmit, values, errors, touched }) => (
                    <View style={globalStyles.formContainer}>
                        <ErrorMessage message={errorMessage} />
                        <TextInput
                            autoCapitalize="none"
                            autoCorrect={false}
                            keyboardType="email-address"
                            placeholder="Email"
                            placeholderTextColor="rgba(255, 255, 255, 0.7)"
                            returnKeyType="next"
                            onSubmitEditing={() => passwordInput.focus()}
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
                        <TouchableOpacity
                            style={globalStyles.buttonContainer}
                            onPress={handleSubmit}
                        >
                            <Text style={globalStyles.buttonText}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    );
}

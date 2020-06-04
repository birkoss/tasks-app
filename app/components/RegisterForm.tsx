import React, { useState } from "react";
import {
    StyleSheet,
    View,
    StatusBar,
    Text,
    TouchableOpacity,
    TextInput,
    Button,
    Keyboard,
} from "react-native";

import { Formik } from "formik";

import { globalStyles } from "../styles/global";

import ErrorMessage from "../components/ErrorMessage";

import { Register } from "../api";

interface IProps {
    onRegister: Function;
}

export default function RegisterForm({ onRegister }: IProps) {
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
                    console.log(values);
                    Keyboard.dismiss();

                    Register(values.email, values.password)
                        .then((response) => {
                            if (response["token"] && response["token"] !== "") {
                                onRegister(response["token"]);
                            } else {
                                if (response["message"]) {
                                    for (let field in response["message"]) {
                                        setErrorMessage(
                                            response["message"]["email"]
                                        );
                                    }
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
                    } else if (values.password !== values.confirmPassword) {
                        errors.confirmPassword =
                            "Password and Confirmation are not the same!";
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
                            returnKeyType="next"
                            onSubmitEditing={() => passwordConfirmInput.focus()}
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
                        <TextInput
                            placeholder="Confirm Password"
                            placeholderTextColor="rgba(255, 255, 255, 0.7)"
                            ref={(input) => (passwordConfirmInput = input!)}
                            returnKeyType="go"
                            style={[
                                globalStyles.input,
                                errors.confirmPassword &&
                                touched.confirmPassword
                                    ? globalStyles.errorInput
                                    : {},
                            ]}
                            secureTextEntry
                            onChangeText={handleChange("confirmPassword")}
                            value={values.confirmPassword}
                        />
                        {errors.confirmPassword && touched.confirmPassword && (
                            <Text style={globalStyles.formErrorMessage}>
                                {errors.confirmPassword}
                            </Text>
                        )}
                        <TouchableOpacity
                            style={globalStyles.buttonContainer}
                            onPress={handleSubmit}
                        >
                            <Text style={styles.buttonText}>REGISTER!</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: "#2980b9",
        paddingVertical: 15,
    },
    buttonText: {
        textAlign: "center",
        color: "#ffffff",
        fontWeight: "700",
    },
    container: {
        padding: 20,
    },
    input: {
        height: 40,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        marginBottom: 10,
        color: "#ffffff",
        paddingHorizontal: 10,
    },
});

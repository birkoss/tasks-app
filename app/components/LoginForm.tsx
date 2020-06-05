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
import Button from "../components/forms/Button";
import InputEmail from "../components/forms/InputEmail";
import InputPassword from "../components/forms/InputPassword";

import { globalStyles } from "../styles/global";

import { Login } from "../api";

interface IProps {
    onLogin: Function;
}

export default function LoginForm({ onLogin }: IProps) {
    let passwordInput: TextInput;

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
                onSubmit={(values) => {
                    Keyboard.dismiss();
                    Login(values.email, values.password)
                        .then(loginSuccess)
                        .catch(loginFailed);
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

                        <InputEmail
                            errorMessage={errors.email!}
                            onChange={handleChange("email")}
                            value={values.email}
                            isDirty={touched.email!}
                        />

                        <InputPassword
                            errorMessage={errors.password!}
                            onChange={handleChange("password")}
                            value={values.password}
                            isDirty={touched.password!}
                        />

                        <Button onPress={handleSubmit} label="LOGIN!" />
                    </View>
                )}
            </Formik>
        </View>
    );
}

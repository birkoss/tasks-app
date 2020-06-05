import React from "react";
import { TextInput, Text } from "react-native";

import { globalStyles } from "../../styles/global";

interface IProps {
    onChange: Function;
    value: string;
    errorMessage: string;
    isDirty: Boolean;
}

export default function InputPassword({
    onChange,
    value,
    errorMessage,
    isDirty,
}: IProps) {
    return (
        <React.Fragment>
            <TextInput
                placeholder="Password"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                returnKeyType="go"
                style={[
                    globalStyles.input,
                    errorMessage && isDirty ? globalStyles.errorInput : {},
                ]}
                secureTextEntry
                onChangeText={onChange}
                value={value}
            />
            {errorMessage && isDirty && (
                <Text style={globalStyles.formErrorMessage}>
                    {errorMessage}
                </Text>
            )}
        </React.Fragment>
    );
}

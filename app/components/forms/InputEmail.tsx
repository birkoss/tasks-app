import React from "react";
import { TextInput, Text } from "react-native";

import { globalStyles } from "../../styles/global";

interface IProps {
    onChange: Function;
    value: string;
    errorMessage: string;
    isDirty: Boolean;
}

export default function InputEmail({
    onChange,
    value,
    errorMessage,
    isDirty,
}: IProps) {
    return (
        <React.Fragment>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                placeholder="Email"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                returnKeyType="next"
                // onSubmitEditing={() => passwordInput.focus()}
                style={[
                    globalStyles.input,
                    errorMessage && isDirty ? globalStyles.errorInput : {},
                ]}
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

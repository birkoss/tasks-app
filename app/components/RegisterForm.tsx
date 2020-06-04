import React from "react";
import {
    StyleSheet,
    View,
    StatusBar,
    Text,
    TouchableOpacity,
    TextInput,
} from "react-native";

interface IProps {
    onRegister: Function;
}

export default function RegisterForm({ onRegister }: IProps) {
    let passwordInput: TextInput;
    let passwordConfirmInput: TextInput;

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                keyboardType="email-address"
                placeholder="Email"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                returnKeyType="next"
                onSubmitEditing={() => passwordInput.focus()}
                style={styles.input}
            />
            <TextInput
                placeholder="Password"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                ref={(input) => (passwordInput = input!)}
                returnKeyType="go"
                style={styles.input}
                onSubmitEditing={() => passwordConfirmInput.focus()}
                secureTextEntry
            />
            <TextInput
                placeholder="ConfirmPassword"
                placeholderTextColor="rgba(255, 255, 255, 0.7)"
                ref={(input) => (passwordConfirmInput = input!)}
                returnKeyType="go"
                style={styles.input}
                secureTextEntry
            />
            <TouchableOpacity
                style={styles.buttonContainer}
                onPress={() => onRegister("my token...")}
            >
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
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

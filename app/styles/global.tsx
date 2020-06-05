import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#3498db",
    },
    buttonContainer: {
        marginTop: 10,
        backgroundColor: "#2980b9",
        paddingVertical: 15,
    },
    buttonText: {
        textAlign: "center",
        color: "#ffffff",
        fontWeight: "700",
    },
    errorInput: {
        backgroundColor: "rgba(255, 0, 0, 0.4)",
    },
    formContainer: {
        padding: 20,
    },
    formErrorMessage: {
        color: "#bf1650",
    },
    input: {
        height: 40,
        backgroundColor: "rgba(255, 255, 255, 0.2)",
        marginTop: 10,
        color: "#ffffff",
        paddingHorizontal: 10,
    },
});

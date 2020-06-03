import React from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableWithoutFeedback,
    TouchableOpacity,
    TouchableHighlight,
    SafeAreaView,
    Button,
    Alert,
} from "react-native";

export default function App() {
    let x = 1;
    console.log("asasassa");

    return (
        <SafeAreaView style={styles.container}>
            <Text>Testing 1234</Text>
            <Button
                color="orange"
                title="Click me"
                onPress={() =>
                    Alert.alert("TItre", "Message", [
                        {
                            text: "Yes",
                            onPress: () => console.log("YES"),
                        },
                        {
                            text: "Nop",
                            onPress: () => console.log("NOP"),
                        },
                    ])
                }
            />
            <Image source={require("./app/assets/icon.png")} />
            <TouchableHighlight onPress={() => console.log("Image tapped")}>
                <Image
                    source={{
                        width: 200,
                        height: 300,
                        uri: "https://picsum.photos/200/300",
                    }}
                />
            </TouchableHighlight>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center",
    },
});

import React, { useState, useEffect, useRef, useContext } from "react";
import { Alert, View, Text, TextInput, Keyboard } from "react-native";

import { useForm, ErrorMessage } from "react-hook-form";

import Button from "./Button";

import { globalStyles } from "../../styles/global";

import { validateEmail } from "../../validations";

import { AddTask } from "../../api";
import { AuthContext } from "../../context";

type Props = {
    onAdded: Function;
};

type formData = {
    name: string;
    description: string;
    reward: number;
};

const defaultValues = {
    name: "",
    description: "",
    reward: 0,
};

export default function TaskForm({ onAdded }: Props) {
    const { state } = useContext(AuthContext);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const { errors, register, setValue, handleSubmit } = useForm<formData>({
        defaultValues,
    });

    const onSubmit = (data: formData) => {
        setIsSubmitting(true);

        Keyboard.dismiss();

        AddTask(state.token, state.currentGroup, data)
            .then(onSubmitSuccess)
            .catch((error) => {
                onSubmitFailed(error);
            });
    };

    const onSubmitSuccess = (data: any) => {
        setIsSubmitting(false);
        onAdded();
    };

    const onSubmitFailed = (error: any) => {
        setIsSubmitting(false);
        Alert.alert(error.message);
    };

    const inputs = useRef<(TextInput | null)[]>([]);

    useEffect(() => {
        register(
            { name: "name" },
            {
                required: "Name is mandatory",
            }
        );
        register({ name: "reward" }, { required: "Reward is mandatory" });
        register(
            { name: "description" },
            {
                required: "Description is mandatory",
                min: 8,
            }
        );
    }, [register]);

    return (
        <View>
            <TextInput
                autoCapitalize="none"
                autoCorrect={false}
                placeholder="Name"
                placeholderTextColor="rgba(41, 128, 185, 0.7)"
                ref={(ref) => (inputs.current[0] = ref)}
                returnKeyType="next"
                onSubmitEditing={() => inputs.current[1]?.focus()}
                style={[
                    globalStyles.inputDark,
                    errors.name ? globalStyles.errorInput : {},
                ]}
                onChangeText={(text) => setValue("name", text, true)}
            />
            <ErrorMessage
                style={globalStyles.formErrorMessage}
                errors={errors}
                name="name"
                as={<Text />}
            />

            <TextInput
                autoCorrect={false}
                placeholder="Reward ($)"
                keyboardType="numeric"
                placeholderTextColor="rgba(41, 128, 185, 0.7)"
                ref={(ref) => (inputs.current[1] = ref)}
                returnKeyType="next"
                onSubmitEditing={() => inputs.current[2]?.focus()}
                style={[
                    globalStyles.inputDark,
                    errors.reward ? globalStyles.errorInput : {},
                ]}
                onChangeText={(text) => setValue("reward", 0, true)}
            />
            <ErrorMessage
                style={globalStyles.formErrorMessage}
                errors={errors}
                name="reward"
                as={<Text />}
            />

            <TextInput
                autoCapitalize="none"
                placeholder="Description"
                multiline
                placeholderTextColor="rgba(41, 128, 185, 0.7)"
                returnKeyType="next"
                onSubmitEditing={() => handleSubmit(onSubmit)}
                ref={(ref) => (inputs.current[2] = ref)}
                style={[
                    globalStyles.inputDark,
                    errors.description ? globalStyles.errorInput : {},
                    { height: 90 },
                ]}
                onChangeText={(text) => setValue("description", text, true)}
            />
            <ErrorMessage
                style={globalStyles.formErrorMessage}
                errors={errors}
                name="description"
                as={<Text />}
            />

            <Button
                isSubmitting={isSubmitting}
                onPress={handleSubmit(onSubmit)}
                title="SAVE"
            />
        </View>
    );
}

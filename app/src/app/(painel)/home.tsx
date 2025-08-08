import Button from "@/components/Button";
import { mySync } from "@/db/sync";
import { View } from "react-native";


export default function HomeScreen() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                padding: 16,
            }}
        >
            <Button
                label="Atualizar"
                onPress={() => {
                    mySync();
                }}
            />
        </View>
    );
}
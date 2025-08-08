import Button from "@/components/Button";
import database from "@/db";
import { mySync } from "@/db/sync";
import React, { useState } from "react";
import { Alert, View } from "react-native";
import Toast from "react-native-toast-message";


export default function HomeScreen() {
    const [clearing, setClearing] = useState(false);

    const handleClearDb = () => {
        Alert.alert(
            'Limpar banco de dados',
            'Esta ação irá remover todos os dados locais. Deseja continuar?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Limpar',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            setClearing(true);
                            await database.write(async () => {
                                await database.unsafeResetDatabase();
                            });
                            Toast.show({
                                type: 'success',
                                text1: 'Banco limpo com sucesso',
                            });
                        } catch (e: any) {
                            Toast.show({
                                type: 'error',
                                text1: 'Erro ao limpar banco',
                                text2: e.message,
                            });
                        } finally {
                            setClearing(false);
                        }
                    }
                }
            ],
            { cancelable: true }
        );
    };

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
            <View style={{ height: 12 }} />
            <Button
                label={clearing ? "Limpando..." : "Limpar banco"}
                variant="danger"
                onPress={handleClearDb}
                loading={clearing}
                disabled={clearing}
            />
        </View>
    );
}
import { Stack } from "expo-router";


export default function ClientesLayout() {
    return (
        <Stack
            initialRouteName="listar"
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="listar" options={{ title: "Listar Clientes" }} />
            <Stack.Screen name="novo" options={{ title: "Criar Novo Cliente" }} />
        </Stack>
    )
}
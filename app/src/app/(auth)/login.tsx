import Button from "@/components/Button";
import Input from "@/components/Input";
import { AuthService } from "@/services/auth";
import { useAuthStore } from "@/store/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { InferType, object, string } from "yup";


const formSchema = object({
    usuario: string().required('Usuário é obrigatório'),
    senha: string().min(6, 'Senha deve ter pelo menos 6 caracteres').required('Senha é obrigatória'),
});

type FormType = InferType<typeof formSchema>;


export default function LoginScreen() {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(formSchema),
        defaultValues: {
            usuario: __DEV__ ? 'admin' : '',
            senha: __DEV__ ? '123456' : '',
        }
    });
    const login = useAuthStore((state) => state.login);

    const loginMutation = useMutation({
        mutationFn: async (data: FormType) => {
            return AuthService.login({ usuario: data.usuario, senha: data.senha });
        },
        onSuccess: (data) => {
            login(data);
            Toast.show({ type: 'success', text1: 'Login successful' });
        },
        onError: (error) => {
            Toast.show({ type: 'error', text1: 'Login failed', text2: (error as Error).message });
        }
    })


    const onSubmit = handleSubmit(async (data: FormType) => {
        const { usuario, senha } = data;
        await loginMutation.mutateAsync({ usuario, senha });
    });


    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Controller
                    control={control}
                    name="usuario"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            label="Usuario"
                            onChangeText={onChange}
                            value={value}
                            placeholder="example"
                            autoCapitalize={'none'}
                        />
                    )}
                />
                {errors.usuario && <Text style={{ color: 'red' }}>{errors.usuario.message}</Text>}
            </View>
            <View style={styles.verticallySpaced}>
                <Controller
                    control={control}
                    name="senha"
                    render={({ field: { onChange, value } }) => (
                        <Input
                            label="Senha"
                            onChangeText={onChange}
                            value={value}
                            secureTextEntry
                            placeholder="********"
                        />
                    )}
                />
                {errors.senha && <Text style={{ color: 'red' }}>{errors.senha.message}</Text>}
            </View>
            <View style={[styles.verticallySpaced, styles.mt20]}>
                <Button label="Entrar" onPress={onSubmit} />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    verticallySpaced: {
        paddingTop: 4,
        paddingBottom: 4,
        alignSelf: 'stretch',
    },
    mt20: {
        marginTop: 20,
    },
})
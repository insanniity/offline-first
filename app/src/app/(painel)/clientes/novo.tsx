import { globalStyles } from "@/assets/styles/globalStyles";
import { theme } from "@/assets/styles/theme";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import database, { clientesCollection } from "@/db";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { InferType, object, string } from "yup";

const formSchema = object({
    nome: string()
        .trim()
        .required('Informe o nome')
        .min(3, 'Mínimo 3 caracteres')
        .default(''),
    email: string()
        .trim()
        .email('E-mail inválido')
        .required('Informe o e-mail')
        .default(''),
    cgc: string()
        .trim()
        .required('Informe o documento')
        .min(11, 'Mínimo 11 dígitos')
        .default(''),
    estado: string()
        .transform((v) => (v ? v.toUpperCase() : v))
        .matches(/^[A-Z]{2}$/i, 'UF inválida')
        .required('Informe o estado (UF)')
        .default(''),
    cidade: string()
        .trim()
        .required('Informe a cidade')
        .default(''),
    endereco: string()
        .trim()
        .required('Informe o endereço')
        .default(''),
});

type FormType = InferType<typeof formSchema>;

export default function NovoClienteScreen() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormType>({
        resolver: yupResolver(formSchema),
        defaultValues: formSchema.getDefault(),
        mode: 'onSubmit',
    });

    const onSubmit = async (values: FormType) => {
        try {
            setLoading(true);
            await database.write(async () => {
                await clientesCollection.create((record) => {
                    record.nome = values.nome;
                    record.email = values.email;
                    record.cgc = values.cgc;
                    record.estado = values.estado.toUpperCase();
                    record.cidade = values.cidade;
                    record.endereco = values.endereco;
                });
            });
            router.replace('/clientes/listar');
            reset(formSchema.getDefault());
        } catch (e) {
            console.error('Erro ao criar cliente:', e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={globalStyles.container}>
            <Header title="Novo Cliente" />
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
            >
                <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                    <Controller
                        control={control}
                        name="nome"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                label="Nome"
                                placeholder="Ex: João da Silva"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                error={errors.nome?.message}
                                autoCapitalize="words"
                                autoCorrect
                                returnKeyType="next"
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                label="E-mail"
                                placeholder="email@exemplo.com"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                error={errors.email?.message}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType="next"
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="cgc"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                label="Documento"
                                placeholder="CPF/CNPJ"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                error={errors.cgc?.message}
                                keyboardType="number-pad"
                                returnKeyType="next"
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="estado"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                label="Estado (UF)"
                                placeholder="UF"
                                maxLength={2}
                                value={value}
                                onChangeText={(t) => onChange(t.toUpperCase())}
                                onBlur={onBlur}
                                error={errors.estado?.message}
                                autoCapitalize="characters"
                                returnKeyType="next"
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="cidade"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                label="Cidade"
                                placeholder="Ex: São Paulo"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                error={errors.cidade?.message}
                                autoCapitalize="words"
                                returnKeyType="next"
                            />
                        )}
                    />

                    <Controller
                        control={control}
                        name="endereco"
                        render={({ field: { onChange, onBlur, value } }) => (
                            <Input
                                label="Endereço"
                                placeholder="Rua, número, bairro"
                                value={value}
                                onChangeText={onChange}
                                onBlur={onBlur}
                                error={errors.endereco?.message}
                                returnKeyType="done"
                            />
                        )}
                    />

                    <View style={styles.buttons}>
                        <Button
                            variant="secondary"
                            label="Cancelar"
                            onPress={() => router.back()}
                            fullWidth={false}
                            style={styles.button}
                        />
                        <Button
                            label="Salvar"
                            onPress={handleSubmit(onSubmit)}
                            loading={loading}
                            fullWidth={false}
                            style={styles.button}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    content: {
        padding: theme.spacing.md,
        gap: theme.spacing.sm,
    },
    buttons: {
        flexDirection: 'row',
        gap: theme.spacing.sm,
        marginTop: theme.spacing.lg,
        paddingBottom: theme.spacing.lg,
    },
    button: {
        flex: 1,
    },
});
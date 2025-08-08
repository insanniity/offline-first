import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ErrorBoundaryProps {
    error?: Error;
    retry?: () => void;
}

export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.emoji}>👥</Text>
                <Text style={styles.title}>
                    Ops! Algo deu errado
                </Text>
                <Text style={styles.description}>
                    Ocorreu um erro inesperado na aplicação. Tente novamente.
                </Text>

                {__DEV__ && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>
                            {error?.message || 'Erro desconhecido'}
                        </Text>
                    </View>
                )}

                <View style={styles.buttonContainer}>
                    <View style={styles.buttonWrapper}>
                        <Text
                            onPress={retry}
                            style={styles.button}
                        >
                            Tentar Novamente
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 4,
        maxWidth: 320,
        width: '100%'
    },
    emoji: {
        fontSize: 48,
        marginBottom: 16
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#dc2626',
        textAlign: 'center',
        marginBottom: 8
    },
    description: {
        fontSize: 14,
        color: '#6b7280',
        textAlign: 'center',
        marginBottom: 24,
        lineHeight: 20
    },
    errorContainer: {
        backgroundColor: '#f3f4f6',
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        maxHeight: 120,
        width: '100%'
    },
    errorText: {
        fontSize: 11,
        color: '#374151',
        fontFamily: 'monospace'
    },
    buttonContainer: {
        flexDirection: 'row',
        gap: 12,
        width: '100%'
    },
    buttonWrapper: {
        flex: 1
    },
    button: {
        backgroundColor: '#dc2626',
        color: '#ffffff',
        textAlign: 'center',
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 8,
        fontSize: 14,
        fontWeight: '600'
    }
});

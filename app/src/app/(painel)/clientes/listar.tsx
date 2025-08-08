import { globalStyles } from "@/assets/styles/globalStyles";
import { theme } from "@/assets/styles/theme";
import Button from "@/components/Button";
import Card from "@/components/Card";
import Header from "@/components/Header";
import database, { clientesCollection } from "@/db";
import Cliente from "@/model/cliente";
import { withObservables } from '@nozbe/watermelondb/react';
import { useRouter } from "expo-router";
import { PlusIcon, Trash2Icon } from "lucide-react-native";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";


function ListarClientesScreen({ clientes }: { clientes: Cliente[] }) {
    const router = useRouter();
    return (
        <View style={globalStyles.container}>
            <Header
                title="Clientes"
                subtitle={`${clientes.length} clientes`}
                rightAction={
                    <Pressable
                        style={styles.addButton}
                        onPress={() => router.push('/clientes/novo')}
                    >
                        <PlusIcon size={20} color={theme.colors.text.inverse} />
                    </Pressable>
                }
            />

            <View style={styles.content}>
                {clientes.length === 0 ? (
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyTitle}>Nenhum cliente encontrado</Text>
                        <Text style={styles.emptySubtitle}>
                            Configure seus clientes para começar a alocar sua renda
                        </Text>
                        <Button
                            onPress={() => router.push('/clientes/novo')}
                            label="Criar Cliente"
                            style={styles.emptyButton}
                        />
                    </View>
                ) : (
                    <>
                        <FlatList
                            data={clientes}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (
                                <ClienteCard cliente={item} />
                            )}
                            keyExtractor={(item) => item.id}
                            contentContainerStyle={styles.list}
                        />
                    </>
                )}
            </View>
        </View>
    );
}


function ClienteCard({ cliente }: { cliente: Cliente }) {
    const confirmDelete = () => {
        Alert.alert(
            'Excluir cliente',
            `Tem certeza que deseja excluir "${cliente.nome}"?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Excluir',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            await database.write(async () => {
                                await cliente.markAsDeleted();
                            });
                        } catch (e) {
                            console.error('Erro ao deletar cliente:', e);
                        }
                    },
                },
            ],
            { cancelable: true }
        );
    };

    const createdAtLabel = cliente.createdAt?.toLocaleDateString();

    return (
        <Card style={styles.itemCard}>
            <View style={styles.cardHeader}>
                <Text style={styles.cardTitle} numberOfLines={1}>{cliente.nome}</Text>
                <Pressable onPress={confirmDelete} style={styles.deleteButton} accessibilityLabel="Excluir cliente">
                    <Trash2Icon size={18} color={theme.colors.text.inverse} />
                </Pressable>
            </View>

            <View style={styles.cardContent}>
                <View style={styles.fieldRow}>
                    <Text style={styles.fieldLabel}>Email</Text>
                    <Text style={styles.fieldValue} numberOfLines={1}>{cliente.email || '-'}</Text>
                </View>
                <View style={styles.fieldRow}>
                    <Text style={styles.fieldLabel}>Documento</Text>
                    <Text style={styles.fieldValue} numberOfLines={1}>{cliente.cgc || '-'}</Text>
                </View>
                <View style={styles.fieldRow}>
                    <Text style={styles.fieldLabel}>Estado</Text>
                    <Text style={styles.fieldValue} numberOfLines={1}>{cliente.estado || '-'}</Text>
                </View>
                <View style={styles.fieldRow}>
                    <Text style={styles.fieldLabel}>Cidade</Text>
                    <Text style={styles.fieldValue} numberOfLines={1}>{cliente.cidade || '-'}</Text>
                </View>
                <View style={styles.fieldRow}>
                    <Text style={styles.fieldLabel}>Endereço</Text>
                    <Text style={styles.fieldValue} numberOfLines={2}>{cliente.endereco || '-'}</Text>
                </View>

                {createdAtLabel ? (
                    <Text style={styles.metaText}>Criado em {createdAtLabel}</Text>
                ) : null}
            </View>
        </Card>
    );
}


const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },

    list: {
        padding: theme.spacing.md,
    },

    addButton: {
        backgroundColor: theme.colors.primary,
        borderRadius: theme.borderRadius.full,
        padding: theme.spacing.sm,
        ...theme.shadows.md,
    },

    summaryCard: {
        backgroundColor: theme.colors.surfaceSecondary,
        margin: theme.spacing.md,
        marginBottom: 0,
    },

    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    summaryItem: {
        alignItems: 'center',
        flex: 1,
    },

    summaryLabel: {
        ...theme.typography.caption,
        color: theme.colors.text.secondary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: theme.spacing.xs,
    },

    summaryValue: {
        ...theme.typography.h2,
        color: theme.colors.text.primary,
        fontWeight: 'bold',
    },

    summarySuccess: {
        color: theme.colors.status.success,
    },

    summaryWarning: {
        color: theme.colors.status.warning,
    },

    summaryDivider: {
        width: 1,
        height: 40,
        backgroundColor: theme.colors.border.light,
    },

    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    cardTitle: {
        ...theme.typography.h3,
        color: theme.colors.text.primary,
        flex: 1,
        marginRight: theme.spacing.md,
    },

    cardContent: {
        marginTop: theme.spacing.md,
    },

    fieldRow: {
        marginBottom: theme.spacing.xs,
    },

    fieldLabel: {
        ...theme.typography.caption,
        color: theme.colors.text.secondary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        marginBottom: 2,
    },

    fieldValue: {
        ...theme.typography.body,
        color: theme.colors.text.primary,
    },

    itemCard: {
        marginTop: theme.spacing.sm,
        marginHorizontal: 0,
        backgroundColor: theme.colors.surface,
    },

    cellText: {
        ...theme.typography.body,
        color: theme.colors.text.primary,
    },

    deleteButton: {
        backgroundColor: theme.colors.status.error,
        borderRadius: theme.borderRadius.sm,
        padding: theme.spacing.sm,
        ...theme.shadows.sm,
        marginLeft: theme.spacing.md,
    },

    metaText: {
        ...theme.typography.caption,
        color: theme.colors.text.secondary,
        marginTop: theme.spacing.sm,
    },

    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: theme.spacing.xl,
    },

    emptyTitle: {
        ...theme.typography.h3,
        color: theme.colors.text.primary,
        textAlign: 'center',
        marginBottom: theme.spacing.sm,
    },

    emptySubtitle: {
        ...theme.typography.body,
        color: theme.colors.text.secondary,
        textAlign: 'center',
        marginBottom: theme.spacing.xl,
    },

    emptyButton: {
        maxWidth: 200,
    },
});

const enhance = withObservables([], () => ({
    clientes: clientesCollection.query()
}))

const EnhancedClientesScreen = enhance(ListarClientesScreen);

export default EnhancedClientesScreen;
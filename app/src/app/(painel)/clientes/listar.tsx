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
                            ListHeaderComponent={
                                <Card variant="outlined" style={styles.headerCard}>
                                    <View style={styles.headerRow}>
                                        <Text style={styles.headerText}>Nome</Text>
                                        <Text style={styles.headerText}>Email</Text>
                                        <Text style={styles.headerText}>Documento</Text>
                                        <Text style={styles.headerText}>Ação</Text>
                                    </View>
                                </Card>
                            }
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

    return (
        <Card style={styles.itemCard}>
            <View style={styles.cardRow}>
                <View style={styles.accountNameContainer}>
                    <Text style={styles.accountName}>{cliente.nome}</Text>
                </View>
                <View style={styles.percentageContainer}>
                    <Text style={styles.cellText} numberOfLines={1}>{cliente.email}</Text>
                </View>
                <View style={styles.percentageContainer}>
                    <Text style={styles.cellText} numberOfLines={1}>{cliente.cgc}</Text>
                </View>
                <Pressable onPress={confirmDelete} style={styles.deleteButton} accessibilityLabel="Excluir cliente">
                    <Trash2Icon size={18} color={theme.colors.text.inverse} />
                </Pressable>
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

    headerCard: {
        backgroundColor: theme.colors.surfaceSecondary,
    },

    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    headerText: {
        ...theme.typography.bodySmall,
        fontWeight: '600',
        color: theme.colors.text.secondary,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
        flex: 1,
        textAlign: 'center',
    },

    cardRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    accountNameContainer: {
        flex: 2,
    },

    accountName: {
        ...theme.typography.body,
        color: theme.colors.text.primary,
        fontWeight: '500',
    },

    percentageContainer: {
        flex: 1,
        alignItems: 'center',
    },

    percentageValue: {
        ...theme.typography.body,
        color: theme.colors.primary,
        fontWeight: '600',
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

const enhance = withObservables(['clientes'], () => ({
    clientes: clientesCollection.query()
}))

const EnhancedClientesScreen = enhance(ListarClientesScreen);

export default EnhancedClientesScreen;
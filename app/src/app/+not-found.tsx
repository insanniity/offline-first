import { Link, Stack, usePathname } from 'expo-router';
import { AlertCircle, Home, Map } from 'lucide-react-native';
import { StyleSheet, Text, View } from 'react-native';

export default function NotFoundScreen() {
    const pathname = usePathname();

    return (
        <>
            <Stack.Screen options={{ title: 'Página não encontrada' }} />
            <View style={styles.container}>
                <View style={styles.iconContainer}>
                    <AlertCircle size={80} color="#dc2626" />
                </View>

                <Text style={styles.title}>Página não encontrada</Text>
                <Text style={styles.subtitle}>
                    A página que você está procurando não existe ou foi removida.
                </Text>

                <Text style={styles.pathText}>
                    Página solicitada: {pathname}
                </Text>

                <Link href="/" style={styles.link}>
                    <View style={styles.linkContainer}>
                        <Home size={20} color="#ffffff" />
                        <Text style={styles.linkText}>Voltar ao início</Text>
                    </View>
                </Link>

                {__DEV__ && (
                    <Link href="/_sitemap" style={[styles.link, styles.sitemapLink]}>
                        <View style={styles.linkContainer}>
                            <Map size={20} color="#374151" />
                            <Text style={[styles.linkText, styles.sitemapLinkText]}>Ver mapa do site</Text>
                        </View>
                    </Link>
                )}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '#f9fafb',
    },
    iconContainer: {
        marginBottom: 24,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1f2937',
        marginBottom: 12,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#6b7280',
        textAlign: 'center',
        marginBottom: 16,
        paddingHorizontal: 20,
        lineHeight: 24,
    },
    pathText: {
        fontSize: 14,
        color: '#374151',
        textAlign: 'center',
        marginBottom: 32,
        paddingHorizontal: 20,
        backgroundColor: '#f3f4f6',
        paddingVertical: 8,
        borderRadius: 8,
        fontFamily: 'monospace',
    },
    link: {
        backgroundColor: '#16a34a',
        borderRadius: 12,
        paddingHorizontal: 24,
        paddingVertical: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    linkContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    linkText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    },
    sitemapLink: {
        backgroundColor: '#ffffff',
        borderWidth: 1,
        borderColor: '#d1d5db',
        marginTop: 16,
    },
    sitemapLinkText: {
        color: '#374151',
    },
});

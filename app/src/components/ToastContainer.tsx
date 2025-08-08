import { CheckCircle, CircleX, Info, OctagonAlert, X } from 'lucide-react-native';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Toast, { ToastConfig } from 'react-native-toast-message';

const TOAST_VISIBILITY_TIME = 5000;
const TOAST_BOTTOM_OFFSET = 50;

export default function ToastContainer() {
    // Configuração de cores profissionais
    const toastVariants = {
        success: {
            backgroundColor: '#0A8B5C',
            textColor: '#ffffff',
            icon: CheckCircle,
            iconColor: '#ffffff',
        },
        error: {
            backgroundColor: '#EF4444',
            textColor: '#ffffff',
            icon: CircleX,
            iconColor: '#ffffff',
        },
        info: {
            backgroundColor: '#3B82F6',
            textColor: '#ffffff',
            icon: Info,
            iconColor: '#ffffff',
        },
        warning: {
            backgroundColor: '#F59E0B',
            textColor: '#000000',
            icon: OctagonAlert,
            iconColor: '#000000',
        },
    };

    const hideToast = () => Toast.hide();

    // Componente base para os toasts
    const ToastBase = ({ type, text1, text2 }: any) => {
        const variant = toastVariants[type as keyof typeof toastVariants];
        const IconComponent = variant.icon;

        return (
            <View style={[
                styles.toastContainer,
                { backgroundColor: variant.backgroundColor }
            ]}>
                <IconComponent size={24} color={variant.iconColor} style={styles.icon} />
                <View style={styles.textContainer}>
                    <Text style={[
                        styles.titleText,
                        { color: variant.textColor }
                    ]}>
                        {text1}
                    </Text>
                    {text2 && (
                        <Text style={[
                            styles.subtitleText,
                            { color: variant.textColor }
                        ]}>
                            {text2}
                        </Text>
                    )}
                </View>

                <Pressable onPress={hideToast} style={styles.closeButton}>
                    <X size={20} color={variant.iconColor} />
                </Pressable>
            </View>
        );
    };

    // Configuração dos tipos de toast
    const toastConfig: ToastConfig = {
        success: ({ type, ...props }) => <ToastBase type='success' {...props} />,
        error: ({ type, ...props }) => <ToastBase type='error' {...props} />,
        info: ({ type, ...props }) => <ToastBase type='info' {...props} />,
        warning: ({ type, ...props }) => <ToastBase type='warning' {...props} />,
    };

    return (
        <Toast
            position='bottom'
            bottomOffset={TOAST_BOTTOM_OFFSET}
            visibilityTime={TOAST_VISIBILITY_TIME}
            config={toastConfig}
        />
    );
}

const styles = StyleSheet.create({
    toastContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 18,
        borderRadius: 16,
        marginBottom: 8,
        marginHorizontal: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.2,
        shadowRadius: 12,
        elevation: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    icon: {
        marginLeft: 4,
    },
    textContainer: {
        flex: 1,
        marginLeft: 16,
    },
    titleText: {
        fontWeight: '700',
        fontSize: 16,
        lineHeight: 22,
        letterSpacing: -0.2,
    },
    subtitleText: {
        fontSize: 14,
        lineHeight: 20,
        marginTop: 4,
        fontWeight: '500',
    },
    closeButton: {
        marginLeft: 16,
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
});
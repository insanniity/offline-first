import axiosInstance from "@/lib/axios";
import { useAuthStore } from "@/store/auth";
import axios from "axios";
import Toast from "react-native-toast-message";



export const useAxios = () => {
    const accessToken = useAuthStore((state) => state.accessToken);
    const logout = useAuthStore((state) => state.logout);
    const exp = useAuthStore((state) => state.user?.exp);

    axiosInstance.interceptors.request.use((config) => {
        if (config.url?.includes('/api/auth')) {
            return config;
        }
        if (!accessToken) {
            logout();
            config.cancelToken = new axios.CancelToken((cancel) => cancel('Token não encontrado'));
        } else {
            const now = Date.now().valueOf() / 1000;
            if (exp! < now) {
                logout();
                config.cancelToken = new axios.CancelToken((cancel) =>
                    cancel('Token expirado')
                );
                Toast.show({
                    type: 'error',
                    text1: 'Erro',
                    text2: 'Sua sessão expirou, faça login novamente',
                    position: 'bottom',
                });
            } else {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
        }

        return config;
    },
        (error) => {
            // Handle request error
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        (response) => {
            return response;
        },
        (error) => {
            console.log(JSON.stringify(error, null, 2));
            return Promise.reject(error);
        }
    );
}
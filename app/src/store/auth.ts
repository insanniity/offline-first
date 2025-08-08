import { storage } from '@/lib/mmkv';
import { LoginResponse, TokenData } from '@/types/auth';
import { jwtDecode } from "jwt-decode";
import { create } from 'zustand';
import { createJSONStorage, persist, StateStorage } from 'zustand/middleware';

const zustandStorage: StateStorage = {
    setItem: (name, value) => {
        return storage.set(name, value)
    },
    getItem: (name) => {
        const value = storage.getString(name)
        return value ?? null
    },
    removeItem: (name) => {
        return storage.delete(name)
    },
}

export type AuthState = {
    accessToken?: string;
    refreshToken?: string;
    user?: TokenData;
    logado: boolean;
};

type AuthStore = AuthState & {
    login: (payload: LoginResponse) => void;
    logout: () => void;
}

const initialState: AuthState = {
    logado: false,
    accessToken: undefined,
    refreshToken: undefined,
    user: undefined,
};

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            ...initialState,
            login: (payload: LoginResponse) => set(() => {
                const { access_token, refresh_token } = payload;
                const user: TokenData = jwtDecode<TokenData>(access_token);
                return {
                    user,
                    logado: true,
                    accessToken: access_token,
                    refreshToken: refresh_token,
                }
            }),
            logout: () => set(() => ({
                ...initialState,
            })),
        }),
        {
            name: '@cliente:auth',
            storage: createJSONStorage(() => zustandStorage),
        },
    ),
)



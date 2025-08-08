
export interface LoginRequest {
    usuario: string;
    senha: string;
}

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
}


export interface TokenData {
    sub: string;
    scope: string;
    iss: string;
    name: string;
    id: string;
    exp: number;
    iat: number;
}
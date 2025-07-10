/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */



export type SignInCredential = {
    email: string
    password: string
}

export type SignInResponse = {
    token: string
    user: {
        userId: string
        userName: string
        authority: string[]
        avatar: string
        email: string
    }
}

export type SignInResponseV2 = {
    success: boolean
    data: {
        access_token: string
        email: string
        role: string
        user_id: string
        hoa_id: string
        name: string
        last_name: string

    },
    error: string[]
}

export type SignUpResponse = {
    status: string
    message: string
}

export type SignUpCredential = {
    userName: string
    email: string
    password: string
}

export type ForgotPassword = {
    email: string
}

export type ResetPassword = {
    newPassword: string
    confirmPassword: string
    token: string
}

export type AuthRequestStatus = 'success' | 'failed' | ''

export type AuthResult = Promise<{
    status: AuthRequestStatus
    message: string
}>

export type User = {
    id?: string
    userId?: string | null
    hoaId?: string | null
    avatar?: string | null
    userName?: string | null
    email?: string | null
    authority?: string[]
    name: string
    lastName: string
    accessToken: string
}

export type Token = {
    accessToken: string
    refereshToken?: string
}

export type OauthSignInCallbackPayload = {
    onSignIn: (tokens: Token, user?: User) => void
    redirect: () => void
}

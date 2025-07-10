/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import ApiService from './ApiService'

import { SignInCredential, SignInResponseV2 } from '@/@types/auth'

export async function apiSignIn(data: SignInCredential) {
    return await ApiService.fetchDataWithAxios<SignInResponseV2>({
        url: `${process.env.API_URL}/auth/login`,
        method: 'post',
        data,
    })
}
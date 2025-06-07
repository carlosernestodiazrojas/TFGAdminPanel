'use server'
import type { SignInCredential } from '@/@types/auth'

import { apiSignIn } from '@/services/LoginService'

const validateCredential = async (values: SignInCredential) => {

    const { email, password } = values

    const betterResponse = await apiSignIn({ email, password })

    const { success, data, error } = betterResponse

    if (!success) {
        return null
    }
    const authority: string[] = [data.role]


    console.log("Data --- ", data)

    const user = {
        id: data.user_id,
        authority,
        accountUserName: email,
        userName: email,
        name: data.name,
        lastName: data.last_name,
        avatar: '',
        email,
        accessToken: data.access_token,
        hoaId: data.hoa_id
    }

    return user
}

export default validateCredential

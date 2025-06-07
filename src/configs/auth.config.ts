import type { NextAuthConfig } from 'next-auth'
import validateCredential from '../server/actions/user/validateCredential'
import Credentials from 'next-auth/providers/credentials'

import type { SignInCredential, User } from '@/@types/auth'

export default {
    providers: [
        Credentials({
            async authorize(credentials) {

                const user = await validateCredential(
                    credentials as SignInCredential,
                )
                if (!user) {
                    return null
                }

                return user
            },
        }),
    ],
    callbacks: {
        async jwt(params) {

            const { user, token } = params
            const userCopy = { ...user } as User
            const tokenCopy = { ...token }
            if (user) {
                tokenCopy.userId = userCopy.id
                tokenCopy.hoaId = userCopy.hoaId
                tokenCopy.name = userCopy.name
                tokenCopy.lastName = userCopy.lastName
                tokenCopy.email = userCopy.email
                tokenCopy.id = userCopy.accessToken
                tokenCopy.sub = userCopy.accessToken
                tokenCopy.authority = userCopy.authority
            }
            return tokenCopy
        },
        async session({ session, token }): Promise<{
            expires: string
            user: {
                id: string
                name: string
                lastName: string
                accessToken: string
                authority: string[]
                email: string
                hoaId: string
            }
        }> {

            const toReturn = {
                ...session,
                user: {
                    id: token.userId as string,
                    name: token.name as string,
                    lastName: token.lastName as string,
                    accessToken: token.sub as string,
                    authority: token.authority as string[],
                    email: token.email as string,
                    hoaId: token.hoaId as string
                },
            }

            return toReturn
        },
    },
} satisfies NextAuthConfig

/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */


'use client'

import Logo from '@/components/template/Logo'
import Alert from '@/components/ui/Alert'
import SignInForm from './SignInForm'

import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import useTheme from '@/utils/hooks/useTheme'
import type { OnSignIn } from './SignInForm'

type SignInProps = {

    onSignIn?: OnSignIn

}

const SignIn = ({
    onSignIn,
}: SignInProps) => {
    const [message, setMessage] = useTimeOutMessage()

    const mode = useTheme((state) => state.mode)

    return (
        <>
            <div className="mb-8">
                <Logo
                    type="streamline"
                    mode={mode}
                    logoWidth={60}
                    logoHeight={60}
                />
            </div>
            <div className="mb-10">
                <h2 className="mb-2">Hola vecino!</h2>
                <p className="font-semibold heading-text">
                    Panel de administraci&oacute;n
                </p>
            </div>
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    <span className="break-all">{message}</span>
                </Alert>
            )}
            <SignInForm
                setMessage={setMessage}
                onSignIn={onSignIn}
            />

        </>
    )
}

export default SignIn

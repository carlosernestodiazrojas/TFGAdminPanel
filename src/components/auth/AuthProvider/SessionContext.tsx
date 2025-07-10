/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

'use client'

import { createContext } from 'react'
import type { User } from 'next-auth'

type Session = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    user?: User & Record<string, any>
    expires: string
}

const SessionContext = createContext<Session | null>({
    expires: '',
})

export default SessionContext

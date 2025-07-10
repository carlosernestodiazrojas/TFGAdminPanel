/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import React from 'react'
import PostLoginLayout from '@/components/layouts/PostLoginLayout'
import { ReactNode } from 'react'

const Layout = async ({ children }: { children: ReactNode }) => {
    return <PostLoginLayout>{children}</PostLoginLayout>
}

export default Layout

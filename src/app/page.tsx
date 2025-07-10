/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import appConfig from '@/configs/app.config'
import { redirect } from 'next/navigation'

const Page = () => {
    redirect(appConfig.authenticatedEntryPath)
}

export default Page

/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import type { AxiosError } from 'axios'

const AxiosResponseIntrceptorErrorCallback = (error: AxiosError) => {

    console.error('error', error)
}

export default AxiosResponseIntrceptorErrorCallback

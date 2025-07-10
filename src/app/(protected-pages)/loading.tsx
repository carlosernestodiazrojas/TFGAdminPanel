/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import Loading from '@/components/shared/Loading'

const loading = () => {
    return (
        <div className="flex flex-auto flex-col h-full">
            <Loading loading={true} />
        </div>
    )
}

export default loading

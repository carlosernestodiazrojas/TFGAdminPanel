/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { ReactNode } from "react"

export const HeaderHoc = (
    {
        children,
        title,
        subtitle
    }:
        {
            title: string;
            subtitle: string;
            children: ReactNode
        }) => {
    return (
        <div className="mx-auto">
            <header className="mb-6">
                <h1 className="text-3xl text-neutral-700">{title}</h1>
                {subtitle && (
                    <h2 className="mt-2 text-xl text-neutral-600">{subtitle}</h2>
                )}
            </header>
            <main>
                {children}
            </main>
        </div>
    )
}


export default HeaderHoc

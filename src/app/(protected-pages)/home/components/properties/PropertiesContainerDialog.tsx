/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import Dialog from '@/components/ui/Dialog'
import { PropertiesContainer } from './PropertiesContainer'

export const PropertiesContainerDialog = (
    {
        dialogIsOpen,
        condominiumId,
        setIsOpen
    }:
        {
            dialogIsOpen: boolean
            condominiumId: string
            setIsOpen: (isOpen: boolean) => void
        }
) => {

    const onDialogClose = () => {
        setIsOpen(false)
    }

    return (
        <div>
            <Dialog
                isOpen={dialogIsOpen}
                width={1500}
                height={800}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
                closable={true}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}
                bodyOpenClassName={'overflow-hidden'}
            >
                <div className="flex flex-col  justify-between">
                    <h5 className="mb-4">Listado de propiedades</h5>

                    <div className='max-h-[700] overflow-hidden'>
                        <PropertiesContainer
                            condominiumId={condominiumId}
                        />
                    </div>

                </div>
            </Dialog>
        </div>
    )
}

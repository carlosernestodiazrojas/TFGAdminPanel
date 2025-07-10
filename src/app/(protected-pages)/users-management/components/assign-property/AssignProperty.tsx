/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Condominium } from "@/@types/condominium"
import { Property } from "@/@types/property"
import { Button, Dialog, Select } from "@/components/ui"
import { useState } from "react"

import { getPropertiesByCondominiumId } from "@/app/(protected-pages)/home/actions"

const AssignProperty = ({
    condominiumsAvailable,
    dialogIsOpen,
    onDialogClose,
    onDialogOk
}: {
    condominiumsAvailable: Condominium[]
    dialogIsOpen: boolean
    onDialogClose: () => void
    onDialogOk: (property: Property) => void
}) => {

    const [propertiesAvailable, setPropertiesAvailable] = useState<Property[]>([])
    const [selectedProperty, setSelectedProperty] = useState<Property | null>(null)

    return (
        <div>
            <Dialog
                isOpen={dialogIsOpen}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}
                onClose={onDialogClose}
                onRequestClose={onDialogClose}
            >
                <h5 className="mb-4">Asignar propiedad a usuario</h5>

                <div className="space-y-4">
                    <Select
                        instanceId="basic"
                        placeholder="Seleccionar edificio"
                        options={condominiumsAvailable.map(c => { return { label: c.name, value: c.id } })}
                        onChange={async (e) => {

                            if (e && e.value === "")
                                setPropertiesAvailable([])

                            if (e && e.value !== "") {
                                const response = await getPropertiesByCondominiumId(e.value)
                                const { data } = response
                                setPropertiesAvailable(data)
                            }

                        }}
                    />

                    <Select
                        instanceId="basic"
                        placeholder="Seleccionar propiedad"
                        options={propertiesAvailable.map(c => { return { label: c.property_identifier, value: c.id } })}
                        onChange={(e) => {
                            if (e && e.value !== "" && propertiesAvailable.length > 0)
                                setSelectedProperty(propertiesAvailable.find(p => p.id === e.value) ?? null)
                        }}
                    />
                </div>

                <div className="text-right mt-6">
                    <Button
                        className="ltr:mr-2 rtl:ml-2"
                        variant="plain"
                        onClick={() => {
                            setSelectedProperty(null)
                            onDialogClose()
                        }}
                    >
                        Cancelar
                    </Button>
                    <Button
                        variant="solid"
                        disabled={selectedProperty === null}
                        onClick={() => {
                            if (!selectedProperty)
                                return
                            const selectedPropertyCopy = { ...selectedProperty }
                            setSelectedProperty(null)
                            onDialogOk(selectedPropertyCopy)
                        }}>
                        Confirmar
                    </Button>
                </div>
            </Dialog>
        </div>
    )
}


export default AssignProperty

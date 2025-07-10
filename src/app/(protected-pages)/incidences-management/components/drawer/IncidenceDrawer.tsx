/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */


import Button from '@/components/ui/Button'
import Drawer from '@/components/ui/Drawer'
import { IncidenceForm } from '../form/IncidenceForm';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { IncidenceFormValues } from '../form/IncidenceForm';
import { schema } from '../form/IncidenceForm';

import { Form } from '@/components/ui';

import { createIncidenceOnHoa, updateIncidenceOnHoa } from '../../actions';
import { Incidence } from '@/@types/incidence';
import { useEffect, useState } from 'react';
import { useTransition } from 'react';

const IncidenceDrawer = (
    { isOpen, setIsOpen, incidenceSelected = null, refresh }:
        {
            isOpen: boolean;
            setIsOpen: (open: boolean) => void;
            incidenceSelected: Incidence | null
            refresh: (action: string) => void;
        }) => {

    const [isLoading, startTransition] = useTransition()

    const [isUploading, setUploading] = useState<boolean>(false)

    const methods = useForm<IncidenceFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            description: '',
            is_solved: false,
            is_votable: false
        }
    });

    const { reset } = methods

    const closeDrawer = () => setIsOpen(false);

    useEffect(() => {
        reset({
            name: incidenceSelected?.name ?? '',
            description: incidenceSelected?.description ?? ''
        })
    }, [incidenceSelected])

    const IncidenceDrawerFooter = (
        <div className="text-right w-full">
            <Button size="sm" className="mr-2" onClick={closeDrawer} loading={isLoading || isUploading}>
                Cancelar
            </Button>
            <Button
                size="sm"
                variant="solid"
                loading={isLoading || isUploading}
                onClick={methods.handleSubmit(async (data) => {


                    try {
                        startTransition(async () => {
                            if (!incidenceSelected) {
                                const { is_solved, ...incidence } = data
                                const response = await createIncidenceOnHoa(incidence)
                                refresh("create");
                            }
                            else {
                                const response = await updateIncidenceOnHoa(incidenceSelected.id, data)
                                refresh("update");
                            }

                            closeDrawer();
                        })

                    } catch (error) {
                        refresh("error");
                    }

                })}
            >
                {incidenceSelected ? 'Actualizar' : 'Crear'}
            </Button>
        </div>
    );

    return (
        <FormProvider {...methods}>
            <Drawer
                title={incidenceSelected ? 'Actualizar incidencia' : 'Crear nueva incidencia'}
                isOpen={isOpen}
                footer={IncidenceDrawerFooter}
                onClose={closeDrawer}
                onRequestClose={closeDrawer}
                closable={false}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}
                bodyOpenClassName={'overflow-hidden'}
            >
                <Form noValidate>
                    <IncidenceForm
                        incidenceSelected={incidenceSelected}
                        isUploading={setUploading}
                    />
                </Form>
            </Drawer>
        </FormProvider>
    );
};

export default IncidenceDrawer;
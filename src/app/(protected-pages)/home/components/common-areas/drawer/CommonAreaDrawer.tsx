/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */


import Button from '@/components/ui/Button'
import Drawer from '@/components/ui/Drawer'
import { CommonAreaForm } from '../form/CommonAreaForm';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { CommonAreaFormValues } from '../form/CommonAreaForm';
import { schema } from '../form/CommonAreaForm';

import { Form } from '@/components/ui';

import { createCommonAreaOnCondominiumId, updateCommonAreaOnCondominium } from '../../../actions';
import { CommonArea } from '@/@types/common-area';
import { useEffect, useState } from 'react';
import { useTransition } from 'react';

const CommonAreaDrawer = (
    { condominiumId, isOpen, setIsOpen, refresh, commonAreaSelected = null }:
        {
            condominiumId: string;
            isOpen: boolean;
            setIsOpen: (open: boolean) => void;
            refresh: (action: string) => void;
            commonAreaSelected: CommonArea | null
        }) => {

    const [isLoading, startTransition] = useTransition()

    const [isUploading, setUploading] = useState<boolean>(false)

    const methods = useForm<CommonAreaFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: '',
            description: '',
            is_bookable: false,
            daily_capacity: 0,
        }
    });

    const { reset } = methods

    const closeDrawer = () => setIsOpen(false);

    useEffect(() => {
        reset({
            name: commonAreaSelected?.name ?? '',
            description: commonAreaSelected?.description ?? '',
            is_bookable: commonAreaSelected?.is_bookable || false,
            daily_capacity: commonAreaSelected?.daily_capacity ?? 0
        })
    }, [commonAreaSelected])

    const PropertyDrawerFooter = (
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
                            if (!commonAreaSelected) {
                                const response = await createCommonAreaOnCondominiumId(condominiumId, data)
                                refresh('create')
                            }
                            else {
                                const response = await updateCommonAreaOnCondominium(commonAreaSelected.id, data)
                                refresh('update')
                            }

                            closeDrawer();
                        })

                    } catch (error) {
                        refresh('error')
                    }

                })}
            >
                {commonAreaSelected ? 'Actualizar' : 'Crear'}
            </Button>
        </div>
    );

    return (
        <FormProvider {...methods}>
            <Drawer
                title={commonAreaSelected ? 'Actualizar zona comun existente' : 'Crear nueva zona comun'}
                isOpen={isOpen}
                footer={PropertyDrawerFooter}
                onClose={closeDrawer}
                onRequestClose={closeDrawer}
                closable={false}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}
                bodyOpenClassName={'overflow-hidden'}
            >
                <Form noValidate>
                    <CommonAreaForm
                        commonAreaSelected={commonAreaSelected}
                        isUploading={setUploading}
                    />
                </Form>
            </Drawer>
        </FormProvider>
    );
};

export default CommonAreaDrawer;
/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import Button from '@/components/ui/Button'
import Drawer from '@/components/ui/Drawer'
import { SpecialAssessmentForm } from '../form/SpecialAssessmentForm';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { SpecialAssessmentFormValues } from '../form/SpecialAssessmentForm';
import { schema } from '../form/SpecialAssessmentForm';

import { Form } from '@/components/ui';

import { createSpecialAssessmentOnHoa, updateSpecialAssessmentOnHoa } from '../../actions';
import { SpecialAssessment } from '@/@types/specialAssessment';
import { useEffect, useState } from 'react';
import { useTransition } from 'react';

const SpecialAssessmentDrawer = (
    { isOpen, setIsOpen, specialAssessmentSelected = null, refresh }:
        {
            isOpen: boolean;
            setIsOpen: (open: boolean) => void;
            specialAssessmentSelected: SpecialAssessment | null
            refresh: (action: string) => void;
        }) => {

    const [isLoading, startTransition] = useTransition()

    const [isUploading, setUploading] = useState<boolean>(false)

    const methods = useForm<SpecialAssessmentFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: '',
            description: '',
            is_votable: false,
            is_approved: false,
            total_amount: 0,
            individual_amount: 0
        }
    });

    const { reset } = methods

    const closeDrawer = () => setIsOpen(false);

    useEffect(() => {
        reset({
            title: specialAssessmentSelected?.title ?? '',
            description: specialAssessmentSelected?.description ?? '',
            is_votable: specialAssessmentSelected?.is_votable ?? false,
            is_approved: specialAssessmentSelected?.is_approved ?? false,
            total_amount: specialAssessmentSelected?.total_amount ?? 0,
            individual_amount: specialAssessmentSelected?.individual_amount ?? 0
        })
    }, [specialAssessmentSelected])

    const SpecialAssessmentDrawerFooter = (
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
                            if (!specialAssessmentSelected) {
                                const { is_approved, ...specialAssessment } = data
                                const response = await createSpecialAssessmentOnHoa(specialAssessment)
                                refresh("create");
                            }
                            else {
                                const response = await updateSpecialAssessmentOnHoa(specialAssessmentSelected.id, data)
                                refresh("update");
                            }

                            closeDrawer();
                        })

                    } catch (error) {
                        refresh("error");
                    }

                })}
            >
                {specialAssessmentSelected ? 'Actualizar' : 'Crear'}
            </Button>
        </div>
    );

    return (
        <FormProvider {...methods}>
            <Drawer
                title={specialAssessmentSelected ? 'Actualizar derrama' : 'Crear nueva derrama'}
                isOpen={isOpen}
                footer={SpecialAssessmentDrawerFooter}
                onClose={closeDrawer}
                onRequestClose={closeDrawer}
                closable={false}
                shouldCloseOnOverlayClick={false}
                shouldCloseOnEsc={false}
                bodyOpenClassName={'overflow-hidden'}
            >
                <Form noValidate>
                    <SpecialAssessmentForm
                        specialAssessmentSelected={specialAssessmentSelected}
                        isUploading={setUploading}
                    />
                </Form>
            </Drawer>
        </FormProvider>
    );
};

export default SpecialAssessmentDrawer;
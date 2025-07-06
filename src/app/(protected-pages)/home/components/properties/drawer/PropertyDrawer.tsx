
import Button from '@/components/ui/Button'
import Drawer from '@/components/ui/Drawer'
import { PropertyForm } from '../form/PropertyForm';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { PropertyFormValues } from '../form/PropertyForm';
import { schema } from '../form/PropertyForm';

import { Form } from '@/components/ui';

import { createPropertyOnCondominiumId, updatePropertyOnCondominium } from '../../../actions';
import { Property } from '@/@types/property';
import { useEffect } from 'react';
import { useTransition } from 'react';

const PropertyDrawer = (
    { condominiumId, isOpen, setIsOpen, refresh, propertySelected = null }:
        {
            condominiumId: string;
            isOpen: boolean;
            setIsOpen: (open: boolean) => void;
            refresh: (action: string) => void;
            propertySelected: Property | null
        }) => {

    const [isLoading, startTransition] = useTransition()

    const methods = useForm<PropertyFormValues>({
        resolver: zodResolver(schema),
        defaultValues: {
            property_identifier: '',
            property_type: '',
            has_storage_room: false,
            has_parking_space: false,
            current_on_payments: false,
        }
    });

    const { reset } = methods

    const closeDrawer = () => setIsOpen(false);

    useEffect(() => {
        reset({
            property_identifier: propertySelected?.property_identifier ?? '',
            property_type: propertySelected?.property_type ?? '',
            has_storage_room: propertySelected?.has_storage_room || false,
            has_parking_space: propertySelected?.has_parking_space ?? false,
            current_on_payments: propertySelected?.current_on_payments ?? false
        })
    }, [propertySelected])

    const PropertyDrawerFooter = (
        <div className="text-right w-full">
            <Button size="sm" className="mr-2" onClick={closeDrawer} loading={isLoading}>
                Cancelar
            </Button>
            <Button
                size="sm"
                variant="solid"
                loading={isLoading}
                onClick={methods.handleSubmit(async (data) => {

                    try {
                        startTransition(async () => {
                            if (!propertySelected) {
                                const response = await createPropertyOnCondominiumId(condominiumId, data)
                                refresh('create')
                            }
                            else {
                                const response = await updatePropertyOnCondominium(propertySelected.id, data)
                                refresh('update')
                            }

                            closeDrawer();
                        })

                    } catch (error) {
                        refresh('error')
                    }

                })}
            >
                {propertySelected ? 'Actualizar' : 'Crear'}
            </Button>
        </div>
    );

    return (
        <FormProvider {...methods}>
            <Drawer
                title={propertySelected ? 'Actualizar propiedad existente' : 'Crear nueva propiedad'}
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
                    <PropertyForm
                        propertySelected={propertySelected}
                    />
                </Form>
            </Drawer>
        </FormProvider>
    );
};

export default PropertyDrawer;
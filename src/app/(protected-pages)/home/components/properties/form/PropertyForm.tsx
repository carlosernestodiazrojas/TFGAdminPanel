/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { Property } from '@/@types/property';
import { Checkbox, FormItem, Input } from '@/components/ui';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { z } from 'zod';

export const schema = z.object({
    property_identifier: z.string({ message: "El identificador es obligatorio" }).min(1, { message: "El identificador es obligatorio" }),
    property_type: z.string({ message: "El tipo de propiedad es obligatorio" }).min(1, { message: "El tipo de propiedad es obligatorio" }),
    has_storage_room: z.boolean().optional().default(false),
    has_parking_space: z.boolean().optional().default(false),
    current_on_payments: z.boolean().optional().default(false)
});

export type PropertyFormValues = z.infer<typeof schema>;

export const PropertyForm = (
    { propertySelected }: {
        propertySelected: Property | null
    }
) => {

    const {
        formState: { errors },
        control
    } = useFormContext<PropertyFormValues>();

    return (
        <div className="space-y-8">
            <FormItem
                label="Identificador"
                invalid={Boolean(errors.property_identifier)}
                errorMessage={errors.property_identifier?.message}
            >
                <Controller
                    name="property_identifier"
                    control={control}
                    render={({ field }) =>
                        <Input
                            type="property_identifier"
                            autoComplete="off"
                            placeholder="Identificador de propiedad"
                            {...field}
                        />
                    }
                />
            </FormItem>

            <FormItem
                label="Tipo de propiedad"
                invalid={Boolean(errors.property_type)}
                errorMessage={errors.property_type?.message}
            >
                <Controller
                    name="property_type"
                    control={control}
                    render={({ field }) =>
                        <Input
                            type="property_type"
                            autoComplete="off"
                            placeholder="Tipo de propiedad"
                            {...field}
                        />
                    }
                />
            </FormItem>

            <FormItem
                label="Trastero?"
                invalid={Boolean(errors.has_storage_room)}
                errorMessage={errors.has_storage_room?.message}
            >
                <Controller
                    name="has_storage_room"
                    control={control}
                    render={({ field }) => <Checkbox {...field} defaultChecked={propertySelected?.has_storage_room ?? false} />}
                />
            </FormItem>

            <FormItem
                label="Parking?"
                invalid={Boolean(errors.has_parking_space)}
                errorMessage={errors.has_parking_space?.message}
            >
                <Controller
                    name="has_parking_space"
                    control={control}
                    render={({ field }) => <Checkbox {...field} defaultChecked={propertySelected?.has_parking_space ?? false} />}
                />
            </FormItem>

            <FormItem
                label="Al corriente de pago?"
                invalid={Boolean(errors.current_on_payments)}
                errorMessage={errors.current_on_payments?.message}
            >
                <Controller
                    name="current_on_payments"
                    control={control}
                    render={({ field }) => <Checkbox {...field} defaultChecked={propertySelected?.current_on_payments ?? false} />}
                />
            </FormItem>

        </div>
    )
}

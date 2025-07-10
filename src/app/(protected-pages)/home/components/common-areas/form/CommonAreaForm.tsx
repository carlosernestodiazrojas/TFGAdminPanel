/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

import { CommonArea } from '@/@types/common-area';
import { Checkbox, FormItem, Input } from '@/components/ui';
import Uploader from '@/components/upload/Uploader';
import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { z } from 'zod';

export const schema = z.object({
    name: z.string({ message: "El nombre es obligatorio" }).min(1, { message: "El nombre es obligatorio" }),
    description: z.string({ message: "La descripcion es obligatoria" }).min(1, { message: "La descripcion es obligatoria" }),
    is_bookable: z.boolean().optional().default(false),
    file_id: z.string().optional(),
    daily_capacity: z.preprocess(
        val => {
            if (typeof val === 'string' && val.trim() !== '') {
                return Number(val);
            }
            return val;
        },
        z.number().min(0, { message: "Debe ser ≥ 0" }))
});

export type CommonAreaFormValues = z.infer<typeof schema>;

export const CommonAreaForm = (
    { commonAreaSelected, isUploading }: {
        commonAreaSelected: CommonArea | null; isUploading: (uploading: boolean) => void
    }
) => {

    const [newImageUploaded, setNewImageUploaded] = useState<boolean>(false)
    const [uploading, setUploading] = useState<boolean>(false)

    const {
        formState: { errors },
        control
    } = useFormContext<CommonAreaFormValues>();

    return (
        <div className="space-y-8">
            <FormItem
                label="Nombre de la zona comun"
                invalid={Boolean(errors.name)}
                errorMessage={errors.name?.message}
            >
                <Controller
                    name="name"
                    control={control}
                    render={({ field }) =>
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Nombre"
                            {...field}
                        />
                    }
                />
            </FormItem>

            <FormItem
                label="Descripcion de la zona comun"
                invalid={Boolean(errors.description)}
                errorMessage={errors.description?.message}
            >
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) =>
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Descripcion"
                            textArea
                            {...field}
                        />
                    }
                />
            </FormItem>

            <FormItem
                label="Necesario reservar?"
                invalid={Boolean(errors.is_bookable)}
                errorMessage={errors.is_bookable?.message}
            >
                <Controller
                    name="is_bookable"
                    control={control}
                    render={({ field }) => <Checkbox {...field} defaultChecked={commonAreaSelected?.is_bookable ?? false} />}
                />
            </FormItem>

            <FormItem
                label="Capacidad de reserva"
                invalid={Boolean(errors.daily_capacity)}
                errorMessage={errors.daily_capacity?.message}
            >
                <Controller
                    name="daily_capacity"
                    control={control}
                    render={({ field }) =>
                        <Input
                            type="number"
                            autoComplete="off"
                            placeholder=""
                            min={0}
                            {...field}
                        />
                    }
                />
            </FormItem>

            <FormItem
                label=""
                invalid={Boolean(errors.file_id)}
                errorMessage={errors.file_id?.message}
            >
                <Controller
                    name="file_id"
                    control={control}
                    render={({ field }) => {
                        return <Uploader
                            onUploadResult={(imageUploaded: string) => {
                                field.onChange(imageUploaded)
                            }}
                            onUploading={(uploading: boolean) => {
                                setNewImageUploaded(true)
                                setUploading(uploading)
                                isUploading(uploading)
                            }}
                        />
                    }}
                />
            </FormItem>

            {commonAreaSelected && !newImageUploaded && (
                <div className="relative rounded-tl-lg rounded-tr-lg overflow-hidden h-40 w-full">
                    <img
                        src={commonAreaSelected.imagesUrls.length > 0 ? commonAreaSelected.imagesUrls[0] : "/img/no-image/3.jpg"}
                        alt="card header"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
            )}

        </div>
    )
}

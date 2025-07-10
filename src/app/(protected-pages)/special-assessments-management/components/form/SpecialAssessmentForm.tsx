/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */

'use client'

import { SpecialAssessment } from '@/@types/specialAssessment';
import { Checkbox, FormItem, Input, Upload } from '@/components/ui';
import { Controller, useFormContext } from 'react-hook-form';
import { z } from 'zod';

import Uploader from '@/components/upload/Uploader';
import { useState } from 'react';

export const schema = z.object({
    title: z.string({ message: "El titulo es obligatorio" }).min(1, { message: "El titulo es obligatorio" }),
    description: z.string({ message: "La descripcion es obligatoria" }).min(1, { message: "La descripcion es obligatoria" }),
    file_id: z.string().optional(),
    is_votable: z.boolean().default(false),
    is_approved: z.boolean().optional().default(false),
    total_amount: z.preprocess(
        val => {
            if (typeof val === 'string' && val.trim() !== '') {
                const parsed = parseFloat(val);
                return isNaN(parsed) ? val : parsed;
            }
            return val;
        },
        z.number({ message: "Debe ser un número válido" })
            .min(0, { message: "Debe ser ≥ 0" })
            .transform(val => Math.round(val * 100) / 100)
    ),
    individual_amount: z.preprocess(
        val => {
            if (typeof val === 'string' && val.trim() !== '') {
                const parsed = parseFloat(val);
                return isNaN(parsed) ? val : parsed;
            }
            return val;
        },
        z.number({ message: "Debe ser un número válido" })
            .min(0, { message: "Debe ser ≥ 0" })
            .transform(val => Math.round(val * 100) / 100)
    )
});

export type SpecialAssessmentFormValues = z.infer<typeof schema>;
export type SpecialAssessmentFormValuesNew = Omit<SpecialAssessmentFormValues, 'is_approved'>

export const SpecialAssessmentForm = (
    { specialAssessmentSelected, isUploading }: {
        specialAssessmentSelected: SpecialAssessment | null; isUploading: (uploading: boolean) => void
    }
) => {

    const [newImageUploaded, setNewImageUploaded] = useState<boolean>(false)
    const [uploading, setUploading] = useState<boolean>(false)

    const {
        formState: { errors },
        control
    } = useFormContext<SpecialAssessmentFormValues>();

    return (
        <div className="space-y-8">
            <FormItem
                label="Nombre"
                invalid={Boolean(errors.title)}
                errorMessage={errors.title?.message}
            >
                <Controller
                    name="title"
                    control={control}
                    render={({ field }) =>
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Titulo"
                            {...field}
                        />
                    }
                />
            </FormItem>

            <FormItem
                label="Descripcion"
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
                            placeholder=""
                            {...field}
                            textArea
                        />
                    }
                />
            </FormItem>

            <FormItem
                label="Importe total"
                invalid={Boolean(errors.total_amount)}
                errorMessage={errors.total_amount?.message}
            >
                <Controller
                    name="total_amount"
                    control={control}
                    render={({ field }) =>
                        <Input
                            type="number"
                            autoComplete="off"
                            placeholder=""
                            {...field}
                        />
                    }
                />
            </FormItem>

            <FormItem
                label="Importe individual"
                invalid={Boolean(errors.individual_amount)}
                errorMessage={errors.individual_amount?.message}
            >
                <Controller
                    name="individual_amount"
                    control={control}
                    render={({ field }) =>
                        <Input
                            type="number"
                            autoComplete="off"
                            placeholder=""
                            {...field}
                        />
                    }
                />
            </FormItem>

            <FormItem
                label="Se somete a votacion?"
                invalid={Boolean(errors.is_votable)}
                errorMessage={errors.is_votable?.message}
            >
                <Controller
                    name="is_votable"
                    control={control}
                    render={({ field }) => <Checkbox
                        {...field}
                        defaultChecked={specialAssessmentSelected?.is_votable ?? false}
                        disabled={specialAssessmentSelected?.is_approved}
                    />}
                />
            </FormItem>

            {specialAssessmentSelected && (
                <FormItem
                    label="Se ha resuelto?"
                    invalid={Boolean(errors.is_approved)}
                    errorMessage={errors.is_approved?.message}
                >
                    <Controller
                        name="is_approved"
                        control={control}
                        render={({ field }) => <Checkbox
                            {...field}
                            defaultChecked={specialAssessmentSelected?.is_approved ?? false}
                            disabled={specialAssessmentSelected?.is_approved}
                        />}
                    />
                </FormItem>
            )}



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

            {specialAssessmentSelected && !newImageUploaded && (
                <div className="relative rounded-tl-lg rounded-tr-lg overflow-hidden h-40 w-full">
                    <img
                        src={specialAssessmentSelected.imagesUrls.length > 0 ? specialAssessmentSelected.imagesUrls[0] : "/img/no-image/3.jpg"}
                        alt="card header"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
            )}


        </div>
    )
}

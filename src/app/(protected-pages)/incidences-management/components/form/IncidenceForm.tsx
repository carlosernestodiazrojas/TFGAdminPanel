
'use client'

import { Incidence } from '@/@types/incidence';
import { Checkbox, FormItem, Input, Upload } from '@/components/ui';
import { Controller, useFormContext } from 'react-hook-form';
import { z } from 'zod';

import Uploader from '@/components/upload/Uploader';
import { useState } from 'react';

export const schema = z.object({
    name: z.string({ message: "El titulo es obligatorio" }).min(1, { message: "El titulo es obligatorio" }),
    description: z.string({ message: "La descripcion es obligatoria" }).min(1, { message: "La descripcion es obligatoria" }),
    file_id: z.string().optional(),
    is_votable: z.boolean().default(false),
    is_solved: z.boolean().default(false)
});

export type IncidenceFormValues = z.infer<typeof schema>;
export type IncidenceFormValuesNew = Omit<IncidenceFormValues, 'is_solved'>

export const IncidenceForm = (
    { incidenceSelected, isUploading }: {
        incidenceSelected: Incidence | null; isUploading: (uploading: boolean) => void
    }
) => {

    const [newImageUploaded, setNewImageUploaded] = useState<boolean>(false)
    const [uploading, setUploading] = useState<boolean>(false)

    const {
        formState: { errors },
        control
    } = useFormContext<IncidenceFormValues>();

    return (
        <div className="space-y-8">
            <FormItem
                label="Nombre"
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
                label="Se somete a votacion?"
                invalid={Boolean(errors.is_votable)}
                errorMessage={errors.is_votable?.message}
            >
                <Controller
                    name="is_votable"
                    control={control}
                    render={({ field }) => <Checkbox
                        {...field}
                        defaultChecked={incidenceSelected?.is_votable ?? false}
                        disabled={incidenceSelected?.is_solved}
                    />}
                />
            </FormItem>

            {incidenceSelected && (
                <FormItem
                    label="Se ha resuelto?"
                    invalid={Boolean(errors.is_solved)}
                    errorMessage={errors.is_solved?.message}
                >
                    <Controller
                        name="is_solved"
                        control={control}
                        render={({ field }) => <Checkbox
                            {...field}
                            defaultChecked={incidenceSelected?.is_solved ?? false}
                            disabled={incidenceSelected?.is_solved}
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

            {incidenceSelected && !newImageUploaded && (
                <div className="relative rounded-tl-lg rounded-tr-lg overflow-hidden h-40 w-full">
                    <img
                        src={incidenceSelected.imagesUrls.length > 0 ? incidenceSelected.imagesUrls[0] : "/img/no-image/3.jpg"}
                        alt="card header"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
            )}


        </div>
    )
}

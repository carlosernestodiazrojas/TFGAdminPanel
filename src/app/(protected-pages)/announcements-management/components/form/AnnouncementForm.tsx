/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */


'use client'

import { Announcement } from '@/@types/announcement';
import { FormItem, Input, Upload } from '@/components/ui';
import { Controller, useFormContext } from 'react-hook-form';
import { z } from 'zod';

import DatePicker from '@/components/ui/DatePicker'
import Uploader from '@/components/upload/Uploader';
import { useState } from 'react';

export const schema = z.object({
    title: z.string({ message: "El titulo es obligatorio" }).min(1, { message: "El titulo es obligatorio" }),
    description: z.string({ message: "La descripcion es obligatoria" }).min(1, { message: "La descripcion es obligatoria" }),
    file_id: z.string().optional(),
    from: z.preprocess(
        val => {
            if (typeof val === 'object') {
                return String(val);
            }
            return val;
        },
        z.string().min(1, { message: "Debe seleccionar la fecha" })),
    to: z.preprocess(
        val => {
            if (typeof val === 'object') {
                return String(val);
            }
            return val;
        },
        z.string().min(1, { message: "Debe seleccionar la fecha" })),
});

export type AnnouncementFormValues = z.infer<typeof schema>;

export const AnnouncementForm = (
    { announcementSelected, isUploading }: {
        announcementSelected: Announcement | null; isUploading: (uploading: boolean) => void
    }
) => {

    const [newImageUploaded, setNewImageUploaded] = useState<boolean>(false)
    const [uploading, setUploading] = useState<boolean>(false)

    const {
        formState: { errors },
        control,
        getValues
    } = useFormContext<AnnouncementFormValues>();

    return (
        <div className="space-y-8">
            <FormItem
                label="Titulo"
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
                label="Visible desde"
                invalid={Boolean(errors.from)}
                errorMessage={errors.from?.message}
            >
                <Controller
                    name="from"
                    control={control}
                    render={({ field }) => {
                        const dateValue = field.value ? new Date(field.value) : null;
                        return <DatePicker
                            placeholder="Seleccionar"
                            value={dateValue}
                            onChange={(d: Date | null) => {
                                field.onChange(d ? d.toISOString() : "");
                            }}
                            inputFormat='DD/MM/YYYY'
                        />
                    }}
                />
            </FormItem>

            <FormItem
                label="Hasta"
                invalid={Boolean(errors.to)}
                errorMessage={errors.to?.message}
            >
                <Controller
                    name="to"
                    control={control}
                    render={({ field }) => {
                        const dateValue = field.value ? new Date(field.value) : null;
                        return <DatePicker
                            placeholder="Seleccionar"
                            value={dateValue}
                            onChange={(d: Date | null) => {
                                field.onChange(d ? d.toISOString() : "");
                            }}
                            inputFormat='DD/MM/YYYY'
                        />
                    }}
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

            {announcementSelected && !newImageUploaded && (
                <div className="relative rounded-tl-lg rounded-tr-lg overflow-hidden h-40 w-full">
                    <img
                        src={announcementSelected.imagesUrls.length > 0 ? announcementSelected.imagesUrls[0] : "/img/no-image/3.jpg"}
                        alt="card header"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                </div>
            )}


        </div>
    )
}

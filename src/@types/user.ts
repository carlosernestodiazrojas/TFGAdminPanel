/*
 * Copyright (C) 2025 Carlos Ernesto Diaz Rojas
 * Licencia GPL-3.0 *
 * Trabajo de fin de estudio
 * Grado en Ingeniería informática, UNIR
 */
import { Hoa } from "./hoa";
import { Role } from "./hoa";
import { Property } from "./property";

export interface UserResponse {
    id: string;
    email: string;
    password: string;
    name: string;
    last_name: string;
    active: boolean;
    role: Role;
    hoa: Hoa | null;
    property: Property | null;
    imagesUrls: string[]
    setImagesUrl: (imagesUrls: string[]) => void
}


export interface UserInterface {
    id: string;
    email: string;
    password: string;
    name: string;
    last_name: string;
    role_id: string;
    hoa_id: string;
    property_id: string;
    file_id: string;
    imagesUrls: string[];
}
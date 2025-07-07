
export type Hoa = {
    id: string
    name: string
    address: string
    president_id: string
    admin_id: string
    imagesUrls: string[]
    statistics: HoaSummary
}

export interface GetHoaParams {
    id: string
}

export interface HoaSummary {
    total_properties: number;
    storage_room: {
        count: number;
        percentage: number;
    };
    parking_space: {
        count: number;
        percentage: number;
    };
    current_on_payments: {
        count: number;
        percentage: number;
    };
    property_types: {
        interior: {
            count: number;
            percentage: number;
        };
        exterior: {
            count: number;
            percentage: number;
        };
        atico: {
            count: number;
            percentage: number;
        };
        bajo: {
            count: number;
            percentage: number;
        };
        local: {
            count: number;
            percentage: number;
        };
    };
}

interface Role {
    id: string;
    code: number;
    name: string;
}


export interface UserResponse {
    id: string;
    email: string;
    name: string;
    last_name: string;
    role: Role;
    hoa: Hoa;
    images: string[];
    imagesUrls: string[];
}


export interface CheckAvailabilityRequest {
    id: number;
    start_date: string;
    end_date: string;
}

export interface CheckAvailabilityResponse {
    vehicle?: boolean;
    message?: string;
}

export interface ApiError {
    errors: {
        type: string;
        value: string;
        msg: string;
        path: string;
        location: string;
    }[];
}

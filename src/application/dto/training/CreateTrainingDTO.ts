export interface CreateTrainingDTO {
    title: string;
    description?: string;
    url?: string;
    tiempo?: Date | string; // Date o string en formato "HH:MM" que se convertirá
    target_audience?: string;
    created_by: string;
    status_id?: string;
    school_year_id?: string;
}
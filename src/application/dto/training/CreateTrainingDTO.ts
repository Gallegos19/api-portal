export interface CreateTrainingDTO {
    title: string;
    description?: string;
    id_archive?: string;
    target_audience?: string;
    created_by: string;
    status_id?: string;
    school_year_id?: string;
}
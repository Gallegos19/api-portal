export interface CreateReportDTO {
    title: string;
    description?: string;
    type?: string;
    id_archive?: string;
    created_by: string;
}
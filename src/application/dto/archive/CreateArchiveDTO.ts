export interface CreateArchiveDTO {
    file_name: string;
    file_type?: string;
    mime_type?: string;
    storage_url: string;
    uploaded_by: string;
  }
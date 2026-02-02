export interface CreateArchiveDTO {
    file_buffer: Buffer; // Buffer del archivo a subir
    file_name: string; // Nombre original del archivo
    file_type?: string; // Tipo de archivo (ej: 'documento', 'imagen', etc.)
    mime_type: string; // MIME type del archivo (ej: 'application/pdf', 'image/jpeg')
    folder?: string; // Carpeta opcional donde almacenar el archivo en R2
    uploaded_by: string; // ID del usuario que sube el archivo
    status_id?: string;
    school_year_id?: string;
  }
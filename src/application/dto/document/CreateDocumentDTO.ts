export interface CreateDocumentDTO {
    title: string;
    description?: string;
    document_type?: 'personal' | 'academico'; // Tipo de documento: personal o academico
    id_intern?: string;
    id_archive?: string;
    status_id?: string;
    school_year_id?: string;
  }
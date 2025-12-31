export interface ArchiveProps {
    id: string;
    file_name: string;
    file_type?: string;
    mime_type?: string;
    storage_url: string;
    uploaded_at: Date;
    uploaded_by: string;
    status_id?: string;
    school_year_id?: string;
  }
  
  export class Archive {
    private props: ArchiveProps;
  
    constructor(props: ArchiveProps) {
      this.props = props;
    }
  
    get id(): string {
      return this.props.id;
    }
  
    get fileName(): string {
      return this.props.file_name;
    }
  
    get fileType(): string | undefined {
      return this.props.file_type;
    }
  
    get mimeType(): string | undefined {
      return this.props.mime_type;
    }
  
    get storageUrl(): string {
      return this.props.storage_url;
    }
  
    get uploadedAt(): Date {
      return this.props.uploaded_at;
    }
  
    get uploadedBy(): string {
      return this.props.uploaded_by;
    }
  
  get statusId(): string | undefined {
    return this.props.status_id;
  }

  get schoolYearId(): string | undefined {
    return this.props.school_year_id;
  }

  // Methods to update properties
  updateFileName(fileName: string): void {
    this.props.file_name = fileName;
  }

  updateFileType(fileType?: string): void {
    this.props.file_type = fileType;
  }

  updateMimeType(mimeType?: string): void {
    this.props.mime_type = mimeType;
  }

  updateStorageUrl(storageUrl: string): void {
    this.props.storage_url = storageUrl;
  }

  updateStatusId(statusId: string): void {
    this.props.status_id = statusId;
  }

  updateSchoolYearId(schoolYearId: string): void {
    this.props.school_year_id = schoolYearId;
  }

  // Static factory method
  static create(props: Omit<ArchiveProps, 'id' | 'uploaded_at'> & { id?: string; uploaded_at?: Date }): Archive {
    return new Archive({
      id: props.id || crypto.randomUUID(),
      uploaded_at: props.uploaded_at || new Date(),
      file_name: props.file_name,
      file_type: props.file_type,
      mime_type: props.mime_type,
      storage_url: props.storage_url,
      uploaded_by: props.uploaded_by,
      status_id: props.status_id,
      school_year_id: props.school_year_id
    });
  }
  
  // Method to convert entity to a plain object
  toJSON(): ArchiveProps {
    return { ...this.props };
  }
}
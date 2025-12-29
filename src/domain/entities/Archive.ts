export interface ArchiveProps {
    id: string;
    file_name: string;
    file_type?: string;
    mime_type?: string;
    storage_url: string;
    uploaded_at: Date;
    uploaded_by: string;
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
  
    // Static factory method
    static create(props: Omit<ArchiveProps, 'id' | 'uploaded_at'> & { id?: string, uploaded_at?: Date }): Archive {
      return new Archive({
        id: props.id || crypto.randomUUID(),
        uploaded_at: props.uploaded_at || new Date(),
        ...props
      });
    }
  
    // Method to convert entity to a plain object
    toJSON(): ArchiveProps {
      return { ...this.props };
    }
  }
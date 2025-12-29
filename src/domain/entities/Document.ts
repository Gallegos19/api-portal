export interface DocumentProps {
    id: string;
    title: string;
    description?: string;
    id_intern?: string;
    id_archive?: string;
    created_at: Date;
  }
  
  export class Document {
    private props: DocumentProps;
  
    constructor(props: DocumentProps) {
      this.props = props;
    }
  
    get id(): string {
      return this.props.id;
    }
  
    get title(): string {
      return this.props.title;
    }
  
    get description(): string | undefined {
      return this.props.description;
    }
  
    get internId(): string | undefined {
      return this.props.id_intern;
    }
  
    get archiveId(): string | undefined {
      return this.props.id_archive;
    }
  
    get createdAt(): Date {
      return this.props.created_at;
    }
  
    // Methods to update properties
    updateTitle(title: string): void {
      this.props.title = title;
    }
  
    updateDescription(description: string): void {
      this.props.description = description;
    }
  
    // Static factory method
    static create(props: Omit<DocumentProps, 'id' | 'created_at'> & { id?: string, created_at?: Date }): Document {
      return new Document({
        id: props.id || crypto.randomUUID(),
        created_at: props.created_at || new Date(),
        ...props
      });
    }
  
    // Method to convert entity to a plain object
    toJSON(): DocumentProps {
      return { ...this.props };
    }
  }
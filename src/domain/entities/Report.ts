export interface ReportProps {
    id: string;
    title: string;
    description?: string;
    type?: string;
    id_archive?: string;
    created_at: Date;
    created_by: string;
  }
  
  export class Report {
    private props: ReportProps;
  
    constructor(props: ReportProps) {
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
  
    get type(): string | undefined {
      return this.props.type;
    }
  
    get archiveId(): string | undefined {
      return this.props.id_archive;
    }
  
    get createdAt(): Date {
      return this.props.created_at;
    }
  
    get createdBy(): string {
      return this.props.created_by;
    }
  
    // Methods to update properties
    updateTitle(title: string): void {
      this.props.title = title;
    }
  
    updateDescription(description?: string): void {
      this.props.description = description;
    }
  
    updateType(type?: string): void {
      this.props.type = type;
    }
  
    updateArchiveId(archiveId?: string): void {
      this.props.id_archive = archiveId;
    }
  
    // Static factory method
    static create(props: Omit<ReportProps, 'id' | 'created_at'> & { id?: string, created_at?: Date }): Report {
      return new Report({
        id: props.id || crypto.randomUUID(),
        created_at: props.created_at || new Date(),
        ...props
      });
    }
  
    // Method to convert entity to a plain object
    toJSON(): ReportProps {
      return { ...this.props };
    }
  }
export interface TrainingProps {
    id: string;
    title: string;
    description?: string;
    id_archive?: string;
    target_audience?: string;
    created_at: Date;
    created_by: string;
  }
  
  export class Training {
    private props: TrainingProps;
  
    constructor(props: TrainingProps) {
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
  
    get archiveId(): string | undefined {
      return this.props.id_archive;
    }
  
    get targetAudience(): string | undefined {
      return this.props.target_audience;
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
  
    updateArchiveId(archiveId?: string): void {
      this.props.id_archive = archiveId;
    }
  
    updateTargetAudience(targetAudience?: string): void {
      this.props.target_audience = targetAudience;
    }
  
    // Static factory method
    static create(props: Omit<TrainingProps, 'id' | 'created_at'> & { id?: string, created_at?: Date }): Training {
      return new Training({
        id: props.id || crypto.randomUUID(),
        created_at: props.created_at || new Date(),
        ...props
      });
    }
  
    // Method to convert entity to a plain object
    toJSON(): TrainingProps {
      return { ...this.props };
    }
  }
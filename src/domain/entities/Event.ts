export interface EventProps {
    id: string;
    title: string;
    description?: string;
    created_at: Date;
    created_by: string;
    status_id?: string;
    school_year_id?: string;
  }
  
  export class Event {
    private props: EventProps;
  
    constructor(props: EventProps) {
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
  
    get createdAt(): Date {
      return this.props.created_at;
    }
  
    get createdBy(): string {
      return this.props.created_by;
    }
  
  get statusId(): string | undefined {
    return this.props.status_id;
  }

  get schoolYearId(): string | undefined {
    return this.props.school_year_id;
  }

  // Methods to update properties
  updateTitle(title: string): void {
    this.props.title = title;
  }

  updateDescription(description?: string): void {
    this.props.description = description;
  }

  updateStatusId(statusId: string): void {
    this.props.status_id = statusId;
  }

  updateSchoolYearId(schoolYearId: string): void {
    this.props.school_year_id = schoolYearId;
  }

  // Static factory method
  static create(props: Omit<EventProps, 'id' | 'created_at'> & { id?: string; created_at?: Date }): Event {
    return new Event({
      id: props.id || crypto.randomUUID(),
      created_at: props.created_at || new Date(),
      title: props.title,
      description: props.description,
      created_by: props.created_by,
      status_id: props.status_id,
      school_year_id: props.school_year_id
    });
  }
  
  // Method to convert entity to a plain object
  toJSON(): EventProps {
    return { ...this.props };
  }
}
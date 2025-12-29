export interface EventProps {
    id: string;
    title: string;
    description?: string;
    created_at: Date;
    created_by: string;
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
  
    // Methods to update properties
    updateTitle(title: string): void {
      this.props.title = title;
    }
  
    updateDescription(description?: string): void {
      this.props.description = description;
    }
  
    // Static factory method
    static create(props: Omit<EventProps, 'id' | 'created_at'> & { id?: string, created_at?: Date }): Event {
      return new Event({
        id: props.id || crypto.randomUUID(),
        created_at: props.created_at || new Date(),
        ...props
      });
    }
  
    // Method to convert entity to a plain object
    toJSON(): EventProps {
      return { ...this.props };
    }
  }
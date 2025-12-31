export interface CoordinatorProps {
    id: string;
    id_user: string;
    id_region: string;
    status_id?: string;
  }
  
  export class Coordinator {
    private props: CoordinatorProps;
  
    constructor(props: CoordinatorProps) {
      this.props = props;
    }
  
  get id(): string {
    return this.props.id;
  }

  get userId(): string {
    return this.props.id_user;
  }

  get regionId(): string {
    return this.props.id_region;
  }

  get statusId(): string | undefined {
    return this.props.status_id;
  }

  // Methods to update properties
  updateUserId(userId: string): void {
    this.props.id_user = userId;
  }

  updateStatusId(statusId: string): void {
    this.props.status_id = statusId;
  }

  updateRegionId(regionId: string): void {
    this.props.id_region = regionId;
  }

  // Static factory method
  static create(props: Omit<CoordinatorProps, 'id'> & { id?: string }): Coordinator {
    return new Coordinator({
      id: props.id || crypto.randomUUID(),
      id_user: props.id_user,
      id_region: props.id_region
    });
  }    // Method to convert entity to a plain object
    toJSON(): CoordinatorProps {
      return { ...this.props };
    }
  }
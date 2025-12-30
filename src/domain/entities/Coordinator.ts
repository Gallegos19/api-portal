export interface CoordinatorProps {
    id: string;
    id_user: string;
    id_region: string;
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

  // Methods to update properties
  updateUserId(userId: string): void {
    this.props.id_user = userId;
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
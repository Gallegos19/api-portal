export interface RegionProps {
    id: string;
    name_region: string;
    status_id?: string;
  id_coordinator?: string;
  }
  
  export class Region {
    private props: RegionProps;
  
    constructor(props: RegionProps) {
      this.props = props;
    }
  
    get id(): string {
      return this.props.id;
    }
  
    get nameRegion(): string {
      return this.props.name_region;
    }
  
  get statusId(): string | undefined {
    return this.props.status_id;
  }

  get coordinatorId(): string | undefined {
    return this.props.id_coordinator;
  }

  // Methods to update properties
  updateNameRegion(nameRegion: string): void {
    this.props.name_region = nameRegion;
  }

  updateStatusId(statusId: string): void {
    this.props.status_id = statusId;
  }

  updateCoordinatorId(coordinatorId?: string): void {
    this.props.id_coordinator = coordinatorId;
  }

  // Static factory method
  static create(props: Omit<RegionProps, 'id'> & { id?: string }): Region {
    return new Region({
      id: props.id || crypto.randomUUID(),
      name_region: props.name_region,
      status_id: props.status_id,
      id_coordinator: props.id_coordinator
    });
  }
  
  // Method to convert entity to a plain object
  toJSON(): RegionProps {
    return { ...this.props };
  }
}
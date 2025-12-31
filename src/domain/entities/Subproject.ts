export interface SubprojectProps {
    id: string;
    name_subproject: string;
    id_region?: string;
    id_social_facilitator?: string;
    id_coordinator?: string;
    status_id?: string;
  }
  
  export class Subproject {
    private props: SubprojectProps;
  
    constructor(props: SubprojectProps) {
      this.props = props;
    }
  
    get id(): string {
      return this.props.id;
    }
  
    get nameSubproject(): string {
      return this.props.name_subproject;
    }
  
  get regionId(): string | undefined {
    return this.props.id_region;
  }

  get socialFacilitatorId(): string | undefined {
    return this.props.id_social_facilitator;
  }

  get coordinatorId(): string | undefined {
    return this.props.id_coordinator;
  }

  get statusId(): string | undefined {
    return this.props.status_id;
  }

  // Methods to update properties
    updateNameSubproject(nameSubproject: string): void {
      this.props.name_subproject = nameSubproject;
    }
  
  updateRegionId(regionId?: string): void {
    this.props.id_region = regionId;
  }

  updateSocialFacilitatorId(socialFacilitatorId?: string): void {
    this.props.id_social_facilitator = socialFacilitatorId;
  }

  updateCoordinatorId(coordinatorId?: string): void {
    this.props.id_coordinator = coordinatorId;
  }

  updateStatusId(statusId: string): void {
    this.props.status_id = statusId;
  }

  // Static factory method
  static create(props: Omit<SubprojectProps, 'id'> & { id?: string }): Subproject {
    return new Subproject({
      id: props.id || crypto.randomUUID(),
      name_subproject: props.name_subproject,
      id_region: props.id_region,
      id_social_facilitator: props.id_social_facilitator,
      id_coordinator: props.id_coordinator
    });
  }    // Method to convert entity to a plain object
    toJSON(): SubprojectProps {
      return { ...this.props };
    }
  }
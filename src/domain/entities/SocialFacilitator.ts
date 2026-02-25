export interface SocialFacilitatorProps {
    id: string;
    id_user: string;
    id_region: string;
    id_coordinator?: string;
    id_social_facilitator?: string;
    status_id?: string;
  }
  
  export class SocialFacilitator {
    private props: SocialFacilitatorProps;
  
    constructor(props: SocialFacilitatorProps) {
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

    get coordinatorId(): string | undefined {
      return this.props.id_coordinator;
    }

    get socialFacilitatorId(): string | undefined {
      return this.props.id_social_facilitator;
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

    updateCoordinatorId(coordinatorId?: string): void {
      this.props.id_coordinator = coordinatorId;
    }

    updateSocialFacilitatorId(socialFacilitatorId?: string): void {
      this.props.id_social_facilitator = socialFacilitatorId;
    }

    // Static factory method
    static create(props: Omit<SocialFacilitatorProps, 'id'> & { id?: string }): SocialFacilitator {
      return new SocialFacilitator({
        id: props.id || crypto.randomUUID(),
        id_user: props.id_user,
        id_region: props.id_region,
        id_coordinator: props.id_coordinator,
        id_social_facilitator: props.id_social_facilitator,
        status_id: props.status_id
      });
    }
    
    // Method to convert entity to a plain object
    toJSON(): SocialFacilitatorProps {
      return { ...this.props };
    }
  }
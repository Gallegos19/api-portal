export interface SocialFacilitatorProps {
    id: string;
    id_user: string;
    id_region: string;
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
  
  // Static factory method
  static create(props: Omit<SocialFacilitatorProps, 'id'> & { id?: string }): SocialFacilitator {
    return new SocialFacilitator({
      id: props.id || crypto.randomUUID(),
      id_user: props.id_user,
      id_region: props.id_region
    });
  }
  
  // Method to convert entity to a plain object
    toJSON(): SocialFacilitatorProps {
      return { ...this.props };
    }
  }
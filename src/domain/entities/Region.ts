export interface RegionProps {
    id: string;
    name_region: string;
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
  
    // Methods to update properties
    updateNameRegion(nameRegion: string): void {
      this.props.name_region = nameRegion;
    }
  
    // Static factory method
    static create(props: Omit<RegionProps, 'id'> & { id?: string }): Region {
      return new Region({
        id: props.id || crypto.randomUUID(),
        name_region: props.name_region
      });
    }
  
    // Method to convert entity to a plain object
    toJSON(): RegionProps {
      return { ...this.props };
    }
  }
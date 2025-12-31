export interface SuccessStoryProps {
    id: string;
    title: string;
    description?: string;
    id_photo?: string;
    created_at: Date;
    created_by: string;
    status_id?: string;
    school_year_id?: string;
  }
  
  export class SuccessStory {
    private props: SuccessStoryProps;
  
    constructor(props: SuccessStoryProps) {
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
  
    get photoId(): string | undefined {
      return this.props.id_photo;
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

  updatePhotoId(photoId?: string): void {
    this.props.id_photo = photoId;
  }

  updateStatusId(statusId: string): void {
    this.props.status_id = statusId;
  }

  updateSchoolYearId(schoolYearId: string): void {
    this.props.school_year_id = schoolYearId;
  }

  // Static factory method
  static create(props: Omit<SuccessStoryProps, 'id' | 'created_at'> & { id?: string; created_at?: Date }): SuccessStory {
    return new SuccessStory({
      id: props.id || crypto.randomUUID(),
      created_at: props.created_at || new Date(),
      title: props.title,
      description: props.description,
      id_photo: props.id_photo,
      created_by: props.created_by,
      status_id: props.status_id,
      school_year_id: props.school_year_id
    });
  }
  
  // Method to convert entity to a plain object
  toJSON(): SuccessStoryProps {
    return { ...this.props };
  }
}
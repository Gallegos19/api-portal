export interface TrainingProps {
    id: string;
    title: string;
    description?: string;
    url?: string;
    tiempo?: Date; // Duración como TIME (solo hora:minuto:segundo)
    target_audience?: string;
    created_at: Date;
    created_by: string;
    status_id?: string;
    school_year_id?: string;
  }
  
  export class Training {
    private props: TrainingProps;
  
    constructor(props: TrainingProps) {
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
  
  get url(): string | undefined {
    return this.props.url;
  }

  get tiempo(): Date | undefined {
    return this.props.tiempo;
  }

  get targetAudience(): string | undefined {
    return this.props.target_audience;
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

  updateUrl(url?: string): void {
    this.props.url = url;
  }

  updateTiempo(tiempo?: Date): void {
    this.props.tiempo = tiempo;
  }

  updateTargetAudience(targetAudience?: string): void {
    this.props.target_audience = targetAudience;
  }

  updateStatusId(statusId: string): void {
    this.props.status_id = statusId;
  }

  updateSchoolYearId(schoolYearId: string): void {
    this.props.school_year_id = schoolYearId;
  }

  // Static factory method
  static create(props: Omit<TrainingProps, 'id' | 'created_at'> & { id?: string; created_at?: Date }): Training {
    return new Training({
      id: props.id || crypto.randomUUID(),
      created_at: props.created_at || new Date(),
      title: props.title,
      description: props.description,
      url: props.url,
      tiempo: props.tiempo,
      target_audience: props.target_audience,
      created_by: props.created_by,
      status_id: props.status_id,
      school_year_id: props.school_year_id
    });
  }
  
  // Method to convert entity to a plain object
  toJSON(): TrainingProps {
    return { ...this.props };
  }
}
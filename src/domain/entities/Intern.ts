export interface InternProps {
    id: string;
    chid: string;
    id_user: string;
    status: boolean;
    address?: string;
    education_level?: string;
    career_name?: string;
    grade?: string;
    name_tutor?: string;
    service?: string;
    documentation?: string;
    id_subproject?: string;
    id_social_facilitator?: string;
    start_date?: Date;
    end_date?: Date;
    status_id?: string;
    school_year_id?: string;
  }
  
  export class Intern {
    private props: InternProps;
  
    constructor(props: InternProps) {
      this.props = props;
    }
  
  get id(): string {
    return this.props.id;
  }

  get chid(): string {
    return this.props.chid;
  }

  get userId(): string {
    return this.props.id_user;
  }    get status(): boolean {
      return this.props.status;
    }
  
    get address(): string | undefined {
      return this.props.address;
    }
  
    get educationLevel(): string | undefined {
      return this.props.education_level;
    }
  
    get careerName(): string | undefined {
      return this.props.career_name;
    }
  
    get grade(): string | undefined {
      return this.props.grade;
    }
  
    get nameTutor(): string | undefined {
      return this.props.name_tutor;
    }
  
    get service(): string | undefined {
      return this.props.service;
    }
  
    get documentation(): string | undefined {
      return this.props.documentation;
    }
  
    get subprojectId(): string | undefined {
      return this.props.id_subproject;
    }
  
    get socialFacilitatorId(): string | undefined {
      return this.props.id_social_facilitator;
    }
  
    get startDate(): Date | undefined {
      return this.props.start_date;
    }
  
    get endDate(): Date | undefined {
      return this.props.end_date;
    }
  
  get statusId(): string | undefined {
    return this.props.status_id;
  }

  get schoolYearId(): string | undefined {
    return this.props.school_year_id;
  }

  // Methods to update properties
  updateStatus(status: boolean): void {
    this.props.status = status;
  }

  updateStatusId(statusId: string): void {
    this.props.status_id = statusId;
  }

  updateSchoolYearId(schoolYearId: string): void {
    this.props.school_year_id = schoolYearId;
  }

  updateAddress(address: string): void {
    this.props.address = address;
  }
  
  updateEducationLevel(educationLevel: string): void {
    this.props.education_level = educationLevel;
  }
  
    updateCareerName(careerName: string): void {
      this.props.career_name = careerName;
    }
  
    updateGrade(grade: string): void {
      this.props.grade = grade;
    }
  
    updateNameTutor(nameTutor: string): void {
      this.props.name_tutor = nameTutor;
    }
  
    updateService(service: string): void {
      this.props.service = service;
    }
  
    updateDocumentation(documentation: string): void {
      this.props.documentation = documentation;
    }
  
    updateSubprojectId(subprojectId: string): void {
      this.props.id_subproject = subprojectId;
    }
  
    updateSocialFacilitatorId(socialFacilitatorId: string): void {
      this.props.id_social_facilitator = socialFacilitatorId;
    }
  
    updateStartDate(startDate: Date): void {
      this.props.start_date = startDate;
    }
  
    updateEndDate(endDate: Date): void {
      this.props.end_date = endDate;
    }
  
  // Static factory method
  static create(props: Omit<InternProps, 'id'> & { id?: string }): Intern {
    return new Intern({
      id: props.id || crypto.randomUUID(),
      chid: props.chid,
      id_user: props.id_user,
      status: props.status ?? true,
      address: props.address,
      education_level: props.education_level,
      career_name: props.career_name,
      grade: props.grade,
      name_tutor: props.name_tutor,
      service: props.service,
      documentation: props.documentation,
      id_subproject: props.id_subproject,
      id_social_facilitator: props.id_social_facilitator,
      start_date: props.start_date,
      end_date: props.end_date
    });
  }    // Method to convert entity to a plain object
    toJSON(): InternProps {
      return { ...this.props };
    }
  }
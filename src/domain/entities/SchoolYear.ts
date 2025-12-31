export class SchoolYear {
  private constructor(
    public readonly id: string,
    private name: string,
    private startDate: Date,
    private endDate: Date,
    private isActive: boolean,
    public readonly createdAt: Date
  ) {}

  static create(props: {
    id: string;
    name: string;
    start_date: Date;
    end_date: Date;
    is_active: boolean;
    created_at: Date;
  }): SchoolYear {
    return new SchoolYear(
      props.id,
      props.name,
      props.start_date,
      props.end_date,
      props.is_active,
      props.created_at
    );
  }

  // Getters
  getName(): string {
    return this.name;
  }

  getStartDate(): Date {
    return this.startDate;
  }

  getEndDate(): Date {
    return this.endDate;
  }

  getIsActive(): boolean {
    return this.isActive;
  }

  // Update methods
  updateName(name: string): void {
    this.name = name;
  }

  updateStartDate(startDate: Date): void {
    this.startDate = startDate;
  }

  updateEndDate(endDate: Date): void {
    this.endDate = endDate;
  }

  updateIsActive(isActive: boolean): void {
    this.isActive = isActive;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      start_date: this.startDate,
      end_date: this.endDate,
      is_active: this.isActive,
      created_at: this.createdAt
    };
  }
}

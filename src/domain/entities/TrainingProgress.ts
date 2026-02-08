export interface TrainingProgressProps {
  id: string;
  id_training: string;
  id_user: string;
  completed: boolean;
  progress_percentage: number;
  completed_at?: Date;
  started_at: Date;
  last_viewed_at: Date;
}

export class TrainingProgress {
  private props: TrainingProgressProps;

  constructor(props: TrainingProgressProps) {
    this.props = props;
  }

  get id(): string {
    return this.props.id;
  }

  get trainingId(): string {
    return this.props.id_training;
  }

  get userId(): string {
    return this.props.id_user;
  }

  get completed(): boolean {
    return this.props.completed;
  }

  get progressPercentage(): number {
    return this.props.progress_percentage;
  }

  get completedAt(): Date | undefined {
    return this.props.completed_at;
  }

  get startedAt(): Date {
    return this.props.started_at;
  }

  get lastViewedAt(): Date {
    return this.props.last_viewed_at;
  }

  // Methods to update properties
  updateProgressPercentage(percentage: number): void {
    if (percentage < 0 || percentage > 100) {
      throw new Error('Progress percentage must be between 0 and 100');
    }
    this.props.progress_percentage = percentage;
    this.props.last_viewed_at = new Date();
    
    // Si llega al 100%, marcar como completado
    if (percentage === 100 && !this.props.completed) {
      this.markAsCompleted();
    }
  }

  markAsCompleted(): void {
    this.props.completed = true;
    this.props.completed_at = new Date();
    this.props.progress_percentage = 100;
    this.props.last_viewed_at = new Date();
  }

  updateLastViewedAt(): void {
    this.props.last_viewed_at = new Date();
  }

  // Static factory method
  static create(
    props: Omit<TrainingProgressProps, 'id' | 'started_at' | 'last_viewed_at'> & { 
      id?: string; 
      started_at?: Date;
      last_viewed_at?: Date;
    }
  ): TrainingProgress {
    const now = new Date();
    return new TrainingProgress({
      id: props.id || crypto.randomUUID(),
      started_at: props.started_at || now,
      last_viewed_at: props.last_viewed_at || now,
      id_training: props.id_training,
      id_user: props.id_user,
      completed: props.completed ?? false,
      progress_percentage: props.progress_percentage ?? 0,
      completed_at: props.completed_at
    });
  }

  // Method to convert entity to a plain object
  toJSON(): TrainingProgressProps {
    return { ...this.props };
  }
}

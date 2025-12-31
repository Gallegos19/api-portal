export class Status {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly createdAt: Date
  ) {}

  static create(props: {
    id: string;
    name: string;
    created_at: Date;
  }): Status {
    return new Status(
      props.id,
      props.name,
      props.created_at
    );
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      created_at: this.createdAt
    };
  }
}

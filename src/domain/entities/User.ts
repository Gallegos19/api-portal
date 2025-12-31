export interface UserProps {
    id: string;
    first_name: string;
    last_name: string;
    birth_date?: Date;
    sex?: string;
    phone?: string;
    email: string;
    password: string; 
    role?: string;
    profile_photo_id?: string;
    status_id?: string;
    created_at: Date;
  }
  
  export class User {
    private props: UserProps;
  
    constructor(props: UserProps) {
      this.props = props;
    }
  
    get id(): string {
      return this.props.id;
    }
  
    get firstName(): string {
      return this.props.first_name;
    }
  
    get lastName(): string {
      return this.props.last_name;
    }
  
    get fullName(): string {
      return `${this.props.first_name} ${this.props.last_name}`;
    }
  
    get birthDate(): Date | undefined {
      return this.props.birth_date;
    }
  
    get sex(): string | undefined {
      return this.props.sex;
    }
  
    get phone(): string | undefined {
      return this.props.phone;
    }
  
    get email(): string {
      return this.props.email;
    }

    get password(): string  {
      return this.props.password;
    }
  
    get role(): string | undefined {
      return this.props.role;
    }
  
    get profilePhotoId(): string | undefined {
      return this.props.profile_photo_id;
    }

    get statusId(): string | undefined {
      return this.props.status_id;
    }
  
    get createdAt(): Date {
      return this.props.created_at;
    }
  
    // Methods to update properties
    updateFirstName(firstName: string): void {
      this.props.first_name = firstName;
    }
  
    updateLastName(lastName: string): void {
      this.props.last_name = lastName;
    }
  
    updateEmail(email: string): void {
      this.props.email = email;
    }

    updatePassword(password: string): void {
      this.props.password = password;
    }
  
    updatePhone(phone: string): void {
      this.props.phone = phone;
    }

    updateStatusId(statusId: string): void {
      this.props.status_id = statusId;
    }
  
    // Static factory method
    static create(props: Omit<UserProps, 'id' | 'created_at'> & { id?: string, created_at?: Date }): User {
      return new User({
        id: props.id || crypto.randomUUID(),
        created_at: props.created_at || new Date(),
        ...props
      });
    }
  
    // Method to convert entity to a plain object
    toJSON(): UserProps {
      return { ...this.props };
    }
  }
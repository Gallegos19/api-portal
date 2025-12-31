export interface CreateUserDTO {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    birth_date?: Date;
    sex?: string;
    phone?: string;
    role?: string;
    status_id?: string;
  }
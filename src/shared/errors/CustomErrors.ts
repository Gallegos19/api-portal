export class UserAlreadyExistsError extends Error {
    constructor(email: string) {
      super(`User with email ${email} already exists`);
      this.name = 'UserAlreadyExistsError';
    }
  }
  
  export class InvalidCredentialsError extends Error {
    constructor() {
      super('Invalid email or password');
      this.name = 'InvalidCredentialsError';
    }
  }
  
  export class ResourceNotFoundError extends Error {
    constructor(resource: string, id: string) {
      super(`${resource} with id ${id} not found`);
      this.name = 'ResourceNotFoundError';
    }
  }
  
  export class UnauthorizedError extends Error {
    constructor() {
      super('You are not authorized to perform this action');
      this.name = 'UnauthorizedError';
    }
  }
  
  export class ValidationError extends Error {
    constructor(message: string) {
      super(message);
      this.name = 'ValidationError';
    }
  }
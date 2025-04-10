export class NotFoundException extends Error {
    public status?: number;
    public message: string;
  
    constructor(message: string, status?: number) {
      super(message);
      this.status = status ?? 404; 
      this.message = message;
      Error.captureStackTrace(this, this.constructor);
    }
  }
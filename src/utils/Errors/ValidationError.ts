import CustomError from './CustomError';

class ValidationError extends CustomError {
  errorCode = 400;
  errorType = 'VALIDATION_ERROR';

  constructor(message: string) {
    super(message);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}

export { ValidationError };

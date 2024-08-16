abstract class CustomError extends Error {
  abstract errorCode: number;
  abstract errorType: string;
  private property?: string;

  constructor(message: string, property?: string) {
    super(message);
    this.property = property;
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  abstract serializeErrors(): { message: string; property?: string }[];
}

export default CustomError;

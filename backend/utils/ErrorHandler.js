class ErrorHandler extends Error {
  constructor(message, statusCode) {
    // Call the parent (Error) constructor to set the message
    super(message);
    this.statusCode = statusCode;

    // Captures the stack trace and omits the constructor from it
    // This helps in debugging by showing where the error was actually thrown
    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = ErrorHandler;

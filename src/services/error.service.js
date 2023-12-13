class BadRequestException extends Error {
  constructor(message, code = 999) {
    super(message);
    this.code = code;

    Error.captureStackTrace(this, BadRequestException);
  }
}

module.exports = {
  BadRequestException
}
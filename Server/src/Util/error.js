const { extend } = require("joi");

class ValidationError extends Error {
  constructor(code = 400, message) {
    super(message);
    this.name = "ValidationError";
    this.code = code;
  }
}

class HttpError extends Error {
  constructor(code = 400, message, data) {
    super(message);
    this.name = "HttpError";
    this.code = code;
    this.data = data;
  }
}

class GeneralError extends Error {
  constructor(code = 500, message, method) {
    super(message);
    this.name = "GeneralError";
    this.code = code;
    this.method = method;
  }
}

module.exports = {
  ValidationError,
  HttpError,
  GeneralError,
};

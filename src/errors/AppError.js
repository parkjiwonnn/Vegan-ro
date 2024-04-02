class AppError extends Error {
  constructor(name, description, httpCode) {
    super(description)

    this.name = name
    this.httpCode = httpCode
    Error.captureStackTrace(this)
  }
}

module.exports = AppError

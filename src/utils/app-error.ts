class AppError {
  message: string | unknown
  statusCode: number
  constructor( message: string, statusCode: number = 400) {
    this.message = message
    this.statusCode = statusCode
  }
}
export {AppError}
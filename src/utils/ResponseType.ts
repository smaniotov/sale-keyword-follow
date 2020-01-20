import * as httpStatusCodes from 'http-status-codes';

export default class ResponseType {
  static error = (
    message: string,
    statusCode: number,
    extra = {},
  ): { statusCode: number; message: string } => ({
    message,
    statusCode,
    ...extra,
  });

  static conflict = (message, extra = {}) => (
    ResponseType.error(message, httpStatusCodes.CONFLICT, extra)
  );

  static validationError = (message, extra = {}) => (
    ResponseType.error(message, httpStatusCodes.BAD_REQUEST, extra)
  );

  static unauthorized = (message, extra = {}) => (
    ResponseType.error(message, httpStatusCodes.UNAUTHORIZED, extra)
  );

  static forbidden = (message, extra = {}) => (
    ResponseType.error(message, httpStatusCodes.FORBIDDEN, extra)
  );

  static notFound = (message, extra = {}) => (
    ResponseType.error(message, httpStatusCodes.NOT_FOUND, extra)
  );

  static badRequest = (message, extra = {}) => (
    ResponseType.error(message, httpStatusCodes.BAD_REQUEST, extra)
  );

  static internalError = (message, extra = {}) => (
    ResponseType.error(message, httpStatusCodes.INTERNAL_SERVER_ERROR, extra)
  );
}

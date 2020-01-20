enum ErrorEnum {
  PersistedQueryNotFound = 'PERSISTED_QUERY_NOT_FOUND',
  GraphQLParseFailed = 'GRAPHQL_PARSE_FAILED',
  Unauthenticated = 'UNAUTHENTICATED',
  Forbidden = 'FORBIDDEN',
  PersistedQueryNotSupported = 'PERSISTED_QUERY_NOT_SUPPORTED',
  InputError = 'BAD_USER_INPUT',
  InternalServerError = 'INTERNAL_SERVER_ERROR',
  Conflict = 'CONFLICT',
  GraphqlValidationFailed = 'GRAPHQL_VALIDATION_FAILED',
  BadUserInput = 'BAD_USER_INPUT'
}

export default ErrorEnum;

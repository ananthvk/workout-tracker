class StatusError extends Error {
  statusCode: number | undefined;
}

/* c8 ignore start */
class PostgresError extends Error {
  code: string | undefined;
}
/* c8 ignore stop */
export { StatusError, PostgresError };

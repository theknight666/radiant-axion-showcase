/**
 * Standard client error logging utility for Axionis Growth Agency application.
 */

export function reportAppError(error: unknown, context: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;

  const message =
    error instanceof Response
      ? `HTTP Response Error ${error.status}${error.url ? ` at ${error.url}` : ""}`
      : error instanceof Error
        ? error.message
        : String(error);

  const stack = error instanceof Error ? error.stack : undefined;

  console.error("[Axionis Error Boundary]", {
    message,
    stack,
    route: window.location.pathname,
    ...context,
  });
}

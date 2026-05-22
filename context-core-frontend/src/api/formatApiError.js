export default function formatApiError(err, fallbackMessage = "Something went wrong.") {
  const detail = err?.response?.data?.detail;

  if (typeof detail === "string" && detail.trim()) {
    return detail;
  }

  if (Array.isArray(detail)) {
    const message = detail
      .map((d) => d?.msg)
      .filter(Boolean)
      .join(", ");
    if (message) return message;
  }

  const message = err?.response?.data?.message || err?.message;
  if (typeof message === "string" && message.trim()) {
    return message;
  }

  return fallbackMessage;
}


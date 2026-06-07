/**
 * @param {string} query
 */
export function encodeQueryParam(query) {
  if (!query || !query.trim()) {
    const url = new URL(window.location.href);
    url.searchParams.delete("q");
    window.history.replaceState({}, "", url.toString());
    return;
  }

  const url = new URL(window.location.href);
  url.searchParams.set("q", query.trim());
  window.history.replaceState({}, "", url.toString());
}

/**
 * @returns {string}
 */
export function decodeQueryParam() {
  const params = new URLSearchParams(window.location.search);
  return params.get("q") ?? "";
}

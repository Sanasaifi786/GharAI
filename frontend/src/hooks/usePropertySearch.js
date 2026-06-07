import { useState, useCallback } from "react";
import properties from "../data/properties.js";
import { filterProperties } from "../data/filterProperties.js";
import { parseQuery } from "../services/parseQuery.js";
import { encodeQueryParam } from "../utils/urlParams.js";

export function usePropertySearch() {
  const [results, setResults] = useState(properties);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState(null);

  const search = useCallback(async (userQuery) => {
    if (!userQuery.trim()) {
      setResults(properties);
      setQuery("");
      setFilters(null);
      return;
    }

    setLoading(true);
    setError(null);
    setQuery(userQuery);
    encodeQueryParam(userQuery);

    try {
      const parsed = await parseQuery(userQuery);
      setFilters(parsed);
      const matched = filterProperties(properties, parsed);
      setResults(matched);
    } catch (err) {
      console.error("Search error:", err);
      setError("Something went wrong. Please try again.");
      setResults(properties);
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, error, query, filters, search };
}

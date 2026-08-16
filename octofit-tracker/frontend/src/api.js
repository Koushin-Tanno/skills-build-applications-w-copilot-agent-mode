import { useEffect, useState } from 'react';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000';

function getCollectionItems(payload) {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (Array.isArray(payload?.results)) {
    return payload.results;
  }

  if (Array.isArray(payload?.items)) {
    return payload.items;
  }

  if (Array.isArray(payload?.data)) {
    return payload.data;
  }

  if (Array.isArray(payload?.data?.results)) {
    return payload.data.results;
  }

  if (Array.isArray(payload?.data?.items)) {
    return payload.data.items;
  }

  return [];
}

function getPagination(payload, itemCount) {
  if (!payload || Array.isArray(payload)) {
    return { count: itemCount, next: null, previous: null };
  }

  const source = payload.data && !Array.isArray(payload.data) ? payload.data : payload;
  return {
    count: source.count ?? source.total ?? itemCount,
    next: source.next ?? null,
    previous: source.previous ?? null,
  };
}

export async function fetchCollection(endpoint, signal) {
  const response = await fetch(`${API_BASE_URL}/api/${endpoint}/`, { signal });
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const payload = await response.json();
  const items = getCollectionItems(payload);
  return { items, pagination: getPagination(payload, items.length) };
}

export function useApiCollection(endpoint) {
  const [state, setState] = useState({
    items: [],
    pagination: { count: 0, next: null, previous: null },
    loading: true,
    error: '',
  });

  useEffect(() => {
    const controller = new AbortController();
    setState((current) => ({ ...current, loading: true, error: '' }));

    fetchCollection(endpoint, controller.signal)
      .then(({ items, pagination }) => {
        setState({ items, pagination, loading: false, error: '' });
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setState((current) => ({ ...current, loading: false, error: error.message }));
        }
      });

    return () => controller.abort();
  }, [endpoint]);

  return state;
}

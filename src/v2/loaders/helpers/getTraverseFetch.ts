interface TraverseFetchProps {
  apiKey: string;
  baseUrl: string;
}

export const getTraverseFetch = (pathname: string, opts: TraverseFetchProps) =>
  fetch(`${opts.baseUrl}${pathname}`, {
    headers: {
      "x-api-key": opts.apiKey,
    },
  });

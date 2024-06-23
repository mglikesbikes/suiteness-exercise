/**
 * Fetcher handles client<->server data transfer by working with
 * transactions that represent different views of data.
 * Use a fetcher to initialize a transaction with remote data.
 *
 * Goals:
 *  - Align with Qwik's "resumability" architecture
 *  - Work around QRL restrictions, while preserving type safety
 */
interface FetcherOptions {
  apiKey: string;
  baseUrl?: string;
}

export abstract class Fetchable {
  abstract get pathname(): string;
  abstract fromJSON(json: any): void;

  get searchParams(): URLSearchParams | undefined {
    return undefined;
  }
  get formData(): FormData | undefined {
    return undefined;
  }
  get method(): "get" | "post" | "put" | "delete" {
    return "get";
  }
}

export class Fetcher {
  options: FetcherOptions;

  constructor({
    apiKey,
    baseUrl = "https://traverse-assignment-api.esdee.workers.dev",
  }: FetcherOptions) {
    this.options = { apiKey, baseUrl };
  }

  async fetch(transaction: Fetchable) {
    const url = new URL(`${this.options.baseUrl}${transaction.pathname}`);

    if (transaction.searchParams)
      Array.from(transaction.searchParams.entries()).map((p) =>
        url.searchParams.append(p[0], p[1]),
      );

    const req = await fetch(url, {
      headers: this.headers,
      body: transaction.formData,
      method: transaction.method,
    });

    try {
      transaction.fromJSON(await req.json());
    } catch (e) {
      transaction.fromJSON({ message: "request failed" });
    }
  }

  private get headers() {
    return {
      "x-api-key": this.options.apiKey,
    };
  }
}

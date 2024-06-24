/**
 * Fetcher handles client<->server data transfer by working with
 * transactions that represent different "views" of data.
 * Use a fetcher to initialize a transaction with remote data.
 *
 * Goals:
 *  - Align with Qwik's "resumability" architecture
 *  - Work around QRL restrictions, while preserving type safety
 *  - Allow for "computed" properties
 *  - Allow for "views" of data, for client-side sorting etc. (soon™)
 */
interface FetcherOptions {
  apiKey: string;
  baseUrl?: string;
}

type ComputedAttrs = Record<string, ComputableFunc>;
type ComputableFunc = (...args: any) => any;

// The actual public-facing type of a computed attribute; it extends the base object with a `computed` key based on the class's computed attributes object
export type Computed<T extends ComputedAttrs> = {
  computed: {
    [K in keyof T]: ReturnType<T[K]>;
  };
};

/**
 * Every transaction ("get bookings") is a Fetchable, for code reusability.
 *  - A pathname to the resource (e.g. "/ping")
 *  - Parsing from raw JSON into a type-safe object
 *  - Computed attributes (performed server-side)
 *  - Helpers to set search params, form data, and HTTP method
 *
 * Were this to be continued, I'd add the ability to:
 *  - Extend fetchables with client-side mutations (think, filter/sort) called Views
 */
export abstract class Fetchable {
  abstract get pathname(): string;
  abstract fromJSON(json: any): void;
  computed: ComputedAttrs = {};

  get searchParams(): URLSearchParams | undefined {
    return undefined;
  }
  get formData(): FormData | undefined {
    return undefined;
  }
  get method(): "get" | "post" | "put" | "delete" {
    return "get";
  }

  // Add computed attributes to a list of objects
  protected computeAll(list: any[]): any[] {
    return list.map((obj) => {
      return this.compute(obj);
    });
  }

  // Compute a single attribute
  protected compute(obj: any): any {
    obj.computed = {};

    Object.keys(this.computed).forEach((key) => {
      obj.computed[key] = this.computed[key](obj);
    });

    return obj;
  }
}

/**
 * Serverless frameworks make it easy to have messy data practices; enter Fetcher.
 * Fetcher calls API endpoints and hands off the response to a transaction (Fetchable) object for further processing.
 */
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

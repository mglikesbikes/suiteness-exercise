// This file can be used to add references for global types like `vite/client`.

import { type PlatformCloudflarePages } from "@builder.io/qwik-city/middleware/cloudflare-pages";

// Add global `vite/client` types. For more info, see: https://vitejs.dev/guide/features#client-types
/// <reference types="vite/client" />
/// <reference types="@cloudflare/workers-types" />

declare global {
  // our own PlatformRequest, since we made dev mode == cloudflare
  //
  // export const onRequest: RequestHandler<PlatformRequest> =
  // ({ platform }) => { /* platform now has full intellisense */ }
  interface PlatformRequest extends PlatformCloudflarePages {
    env: {
      TRAVERSE_API_KEY: string;
    };
  }
}

import { routeLoader$ } from "@builder.io/qwik-city";
import { PingSchema, type Ping } from "../schemas/data/PingSchema";
import { getTraverseFetch } from "./Api";

type UsePing = Ping;

// eslint-disable-next-line qwik/loader-location
export const usePing = routeLoader$<UsePing>(async (event) => {
  const req = await getTraverseFetch("/ping", {
    apiKey: event.platform.env.TRAVERSE_API_KEY,
    baseUrl: event.platform.env.TRAVERSE_API_ROOT,
  });

  try {
    const res = await req.json();
    const parsed = PingSchema.safeParse(res);

    if (parsed.success) {
      return parsed.data;
    } else {
      return {
        message: parsed.error.toString(),
      };
    }
  } catch (e) {
    return {
      message: `Request failed`,
    };
  }
});

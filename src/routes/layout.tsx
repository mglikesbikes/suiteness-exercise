import { component$, Slot } from "@builder.io/qwik";
import { routeLoader$, type RequestHandler } from "@builder.io/qwik-city";
import { Footer } from "~/components/global/Footer";
import { Header } from "~/components/global/Header";
import { Main } from "~/components/global/Main";
import { Fetcher } from "~/data/Fetcher";
import { GetPing } from "~/data/transactions/GetPing";

export const onGet: RequestHandler<PlatformRequest> = async ({
  cacheControl,
}) => {
  // Control caching for this request for best performance and to reduce hosting costs:
  // https://qwik.dev/docs/caching/
  cacheControl({
    // Always serve a cached response by default, up to a week stale
    staleWhileRevalidate: 60 * 60 * 24 * 7,
    // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
    maxAge: 5,
  });
};

export const usePing = routeLoader$(async (event) => {
  const fetcher = new Fetcher({ apiKey: event.platform.env.TRAVERSE_API_KEY });

  const ping = new GetPing();
  await fetcher.fetch(ping);

  return ping.data;
});

export default component$(() => {
  const ping = usePing();

  return (
    <>
      <Header email={ping.value.email} />
      <Main>
        <Slot />
      </Main>
      <Footer />
    </>
  );
});

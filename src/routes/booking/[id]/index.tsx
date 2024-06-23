import { component$ } from "@builder.io/qwik";
import { routeLoader$ } from "@builder.io/qwik-city";
import ErrorCard from "~/components/global/ErrorCard";
import { Fetcher } from "~/data/Fetcher";
import { GetBookingById } from "~/data/transactions/GetBookingById";

export const useBookingDetail = routeLoader$(async (event) => {
  const fetcher = new Fetcher({ apiKey: event.platform.env.TRAVERSE_API_KEY });
  const getById = new GetBookingById(event.params.id);
  await fetcher.fetch(getById);

  return getById.data;
});

export default component$(() => {
  const detail = useBookingDetail();

  if (detail.value.message || !detail.value.booking)
    return <ErrorCard message={detail.value.message} />;

  return <pre>{JSON.stringify(detail, null, 2)}</pre>;
});

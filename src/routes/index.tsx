import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import BookingList from "~/components/bookings/BookingList";
import ErrorCard from "~/components/global/ErrorCard";
import { Fetcher } from "~/data/Fetcher";
import { GetBookings } from "~/data/transactions/GetBookings";

export const useBookings = routeLoader$(async (event) => {
  const fetcher = new Fetcher({ apiKey: event.platform.env.TRAVERSE_API_KEY });
  const bookings = new GetBookings();
  await fetcher.fetch(bookings);

  return bookings.data;
});

export default component$(() => {
  const bookings = useBookings();

  if (bookings.value.bookings.length)
    return <BookingList bookings={bookings.value.bookings} />;
  else if (bookings.value.ok === true)
    return <p class="text-slate-500">No bookings found.</p>;
  else return <ErrorCard message={bookings.value.message} />;
});

export const head: DocumentHead = {
  title: "Bookings | Suiteness Admin",
  meta: [
    {
      name: "description",
      content: "Manage your Suiteness bookings",
    },
  ],
};

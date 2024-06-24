import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { BookingList } from "~/components/booking/BookingList";
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

  const list = bookings.value.bookings.filter((b) => b.id === 807);
  console.log(">>", list);

  return <BookingList data={bookings.value} />;
});

export const head: DocumentHead = {
  title: "My Bookings | Suiteness Admin",
  meta: [
    {
      name: "description",
      content: "Manage your Suiteness bookings",
    },
  ],
};

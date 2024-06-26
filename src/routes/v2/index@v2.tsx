import { component$ } from "@builder.io/qwik";
import ErrorCard from "~/components/global/ErrorCard";
import GlobalHeader from "~/v2/components/global/GlobalHeader";
import { PageWidth } from "~/v2/components/global/PageWidth";
import { useBookings } from "~/v2/loaders/Bookings";
import { type DocumentHead } from "@builder.io/qwik-city";
import { BookingList } from "~/v2/components/booking/list/BookingList";

export { useBookings };

export default component$(() => {
  const bookings = useBookings();

  let child;

  if (bookings.value.message)
    child = <ErrorCard message={bookings.value.message} />;
  else if (bookings.value.bookings.length === 0)
    child = (
      <p>
        <em class="text-slate-500">No results</em>
      </p>
    );
  else child = <BookingList bookings={bookings.value.bookings} />;

  return (
    <>
      <GlobalHeader
        label={bookings.value.message ? "Something went wrong" : "My Bookings"}
        count={bookings.value.bookings.length}
      />
      <main>
        <PageWidth>{child}</PageWidth>
      </main>
    </>
  );
});

export const head: DocumentHead = (props) => {
  const bookings = props.resolveValue(useBookings);

  if (bookings.message)
    return {
      title: "Something went wrong",
    };

  return {
    title: `My Bookings (${bookings.bookings.length}) | Suiteness`,
  };
};

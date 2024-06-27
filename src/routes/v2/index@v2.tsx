import {
  component$,
  useComputed$,
  useContext,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import ErrorCard from "~/components/global/ErrorCard";
import GlobalHeader from "~/v2/components/global/GlobalHeader";
import { PageWidth } from "~/v2/components/global/PageWidth";
import { useBookings } from "~/v2/loaders/Bookings";
import { useLocation, type DocumentHead } from "@builder.io/qwik-city";
import { BookingList } from "~/v2/components/booking/list/BookingList";
import {
  BookingListFilter,
  BookingListFilterContext,
  type BookingListFilterSelection,
} from "~/v2/components/booking/list/BookingListFilter";
import { type BookingStatusLabel } from "~/v2/loaders/helpers/getBookingStatus";
import { type BookingWithStatusAndDuration } from "~/v2/schemas/data/BookingSchema";

export { useBookings };

export default component$(() => {
  const bookings = useBookings();
  const location = useLocation();

  useContextProvider(
    BookingListFilterContext,
    useStore<BookingListFilterSelection>({
      status: location.url.searchParams.get("status") as BookingStatusLabel,
    }),
  );

  const filterContext = useContext(BookingListFilterContext);

  const filteredBookings = useComputed$<BookingWithStatusAndDuration[]>(() => {
    return bookings.value.bookings.filter((booking) => {
      return filterContext.status
        ? booking.status.label === filterContext.status
        : true;
    });
  });

  let child;

  if (bookings.value.message)
    child = <ErrorCard message={bookings.value.message} />;
  else if (bookings.value.bookings.length === 0)
    child = (
      <p>
        <em class="text-slate-500">No results</em>
      </p>
    );
  else {
    child = (
      <>
        <BookingListFilter />
        <BookingList bookings={filteredBookings.value} />
      </>
    );
  }

  return (
    <>
      <GlobalHeader
        label={bookings.value.message ? "Something went wrong" : "My Bookings"}
        count={filteredBookings.value.length}
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

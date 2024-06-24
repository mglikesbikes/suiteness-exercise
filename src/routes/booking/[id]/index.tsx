import { component$ } from "@builder.io/qwik";
import { type DocumentHead, routeLoader$ } from "@builder.io/qwik-city";
import { BookingDetail } from "~/components/booking/BookingDetail";
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

  return <BookingDetail booking={detail.value} />;
});

export const head: DocumentHead = (props) => {
  const detail = props.resolveValue(useBookingDetail);
  const booking = detail.booking;

  if (booking) {
    return {
      title: `Booking ID #${booking.id} ${booking.hotel.name} | Suiteness Admin`,
    };
  }

  return {
    title: `Something went wrong: ${detail.message}`,
  };
};

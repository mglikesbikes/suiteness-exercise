import { component$ } from "@builder.io/qwik";
import { type BookingWithStatusAndDuration } from "~/v2/schemas/data/BookingSchema";

interface BookingListItemProps {
  booking: BookingWithStatusAndDuration;
}

export const BookingListItem = component$((props: BookingListItemProps) => {
  return <li>{props.booking.hotelName}</li>;
});

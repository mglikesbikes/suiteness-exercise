import { component$ } from "@builder.io/qwik";
import { type BookingWithStatusAndDuration } from "~/v2/schemas/data/BookingSchema";
import { BookingListItem } from "./BookingListItem";

interface BookingListProps {
  bookings: BookingWithStatusAndDuration[];
}

export const BookingList = component$((props: BookingListProps) => {
  return (
    <ul role="list">
      {props.bookings.map((booking) => (
        <BookingListItem key={booking.id} booking={booking} />
      ))}
    </ul>
  );
});

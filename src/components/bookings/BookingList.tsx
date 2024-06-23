import { component$ } from "@builder.io/qwik";
import BookingItem from "./BookingItem";
import { type BookingSchema } from "~/data/schemas/booking";

interface Props {
  bookings: BookingSchema[];
}

export default component$((props: Props) => {
  return (
    <ul class="flex flex-col gap-2">
      {props.bookings.map((b) => (
        <BookingItem key={b.id} booking={b} />
      ))}
    </ul>
  );
});

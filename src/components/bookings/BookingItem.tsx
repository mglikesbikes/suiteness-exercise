import { component$ } from "@builder.io/qwik";
import { Link, useNavigate } from "@builder.io/qwik-city";
import { type BookingSchema } from "~/data/schemas/booking";

type Props = {
  booking: BookingSchema;
};

export default component$((props: Props) => {
  const navigate = useNavigate();
  return (
    <li
      key={props.booking.id}
      class="flex flex-col gap-4 border border-slate-500 bg-slate-50 p-4 focus-within:bg-slate-100 hover:bg-slate-100"
      onClick$={() => navigate(`/booking/${props.booking.id}`)}
    >
      <div class="flex justify-between">
        <h2 class="flex flex-col">
          <span class="text-sm text-slate-500">
            Booking #{props.booking.id}
          </span>
          <span class="text-lg font-bold">{props.booking.hotelName}</span>
        </h2>
        <Link
          href={`/booking/${props.booking.id}`}
          aria-label={`Details for booking ${props.booking.id} at the ${props.booking.hotelName}`}
          class="text-slate-500 underline"
        >
          All Details
        </Link>
      </div>
    </li>
  );
});

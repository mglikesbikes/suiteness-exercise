import { component$, useStylesScoped$ } from "@builder.io/qwik";
import { formatCurrency } from "~/data/formatters/currency";
import { type GetBookingsData } from "~/data/transactions/GetBookings";
import ErrorCard from "../global/ErrorCard";
import { Link, useNavigate } from "@builder.io/qwik-city";
import { HiArrowRightCircleSolid } from "@qwikest/icons/heroicons";
import { plural } from "~/utils/plural";

type ListProps = {
  data: GetBookingsData;
};

export const BookingList = component$((props: ListProps) => {
  if (props.data.bookings.length)
    return (
      <ul class="flex flex-col gap-2">
        {props.data.bookings.map((booking) => (
          <BookingListItem key={booking.id} booking={booking} />
        ))}
      </ul>
    );
  else if (props.data.ok === true)
    return <p class="text-slate-500">No bookings found.</p>;
  else return <ErrorCard message={props.data.message} />;
});

type ListItemProps = {
  booking: GetBookingsData["bookings"][number];
};

export const BookingListItem = component$((props: ListItemProps) => {
  const navigate = useNavigate();

  useStylesScoped$(`
    .list-item {
      div {
        padding: .5rem 1rem;
      }
    }
  `);

  return (
    <li
      aria-label={`Booking ID #${props.booking.id}`}
      class="list-item cursor-pointer overflow-hidden rounded-lg border border-slate-500 bg-slate-100 shadow-md focus-within:bg-slate-200 hover:bg-slate-200 hover:shadow-lg active:bg-slate-300"
      onClick$={() => navigate(`/booking/${props.booking.id}`)}
    >
      <h2 class="flex flex-col p-4">
        <span class="text-xs font-bold uppercase text-slate-500">
          ID #{props.booking.id}:
        </span>
        <span class="text-xl font-bold">{props.booking.hotelName}</span>
      </h2>
      <dl class="justify-start md:flex">
        {props.booking.computed.status && (
          <div
            class={{
              "rounded-tr-lg": true,
              "md:border-r md:border-t": true,
              "border-red-900 bg-red-100 text-red-900":
                props.booking.computed.status.priority === 1,
              "border-yellow-900 bg-yellow-100 text-yellow-900":
                props.booking.computed.status.priority === 2,
              "border-green-900 bg-green-100 text-green-900":
                props.booking.computed.status.priority === 3,
            }}
          >
            <dt class="text-xs font-bold uppercase opacity-60">Status</dt>
            <dd
              class={{
                "font-bold": props.booking.computed.status.priority < 3,
              }}
            >
              {props.booking.computed.status.label}
            </dd>
          </div>
        )}
        <div>
          <dt class="text-xs font-bold uppercase text-slate-500 ">Total</dt>
          <dd>
            {formatCurrency(props.booking.total, props.booking.currencyCode)}
          </dd>
        </div>
        <div>
          <dt class="text-xs font-bold uppercase text-slate-500">
            Total nights
          </dt>
          <dd>{props.booking.computed.duration.label}</dd>
        </div>
        <div>
          <dt class="text-xs font-bold uppercase text-slate-500">Occupancy</dt>
          <dd>{plural(props.booking.occupancy, "adult", "adults")}</dd>
        </div>
        <div class="ml-auto">
          <dt
            class="hidden text-xs font-bold uppercase text-slate-500 md:block"
            aria-label="More details"
          >
            &nbsp;
          </dt>
          <dd>
            <Link
              href={`/booking/${props.booking.id}`}
              aria-label={`All details for booking ID #${props.booking.id}`}
              class="flex items-center gap-2 font-bold hover:underline"
            >
              All details
              <HiArrowRightCircleSolid />
            </Link>
          </dd>
        </div>
      </dl>
    </li>
  );
});

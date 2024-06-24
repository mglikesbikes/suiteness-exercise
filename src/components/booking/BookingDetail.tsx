import { component$ } from "@builder.io/qwik";
import { type GetBookingByIdData } from "~/data/transactions/GetBookingById";
import ErrorCard from "../global/ErrorCard";
import { Link } from "@builder.io/qwik-city";
import { HiArrowLeftCircleSolid } from "@qwikest/icons/heroicons";
import { formatCurrency } from "~/data/formatters/currency";
import { plural } from "~/utils/plural";
import { AttributeDisplay } from "../global/AttributeDisplay";
import { formatDate } from "~/data/formatters/date";
import { formatTime } from "~/data/formatters/time";

interface BookingDetailProps {
  booking: GetBookingByIdData;
}

export const BookingDetail = component$((props: BookingDetailProps) => {
  const booking = props.booking.booking;

  if (props.booking.message || !booking)
    return (
      <div class="flex flex-col gap-8">
        <nav>
          <Link href="/" class="inline-flex items-center gap-2 font-bold">
            <HiArrowLeftCircleSolid />
            All listings
          </Link>
        </nav>
        <ErrorCard message={props.booking.message} />
      </div>
    );

  return (
    <div class="flex flex-col gap-8">
      <nav>
        <Link href="/" class="inline-flex items-center gap-2 font-bold">
          <HiArrowLeftCircleSolid />
          All listings
        </Link>
      </nav>
      <section class="flex flex-col gap-4 rounded-lg border border-slate-500 bg-slate-100 p-4 md:gap-8">
        <h1 class="flex flex-col gap-0">
          <span class="text-xs font-bold uppercase text-slate-500">
            Booking ID #{booking.id}
          </span>
          <span class="text-2xl font-bold">{booking.hotel.name}</span>
        </h1>
        <dl class="flex flex-col gap-4 md:flex-row">
          {booking.computed.status && (
            <div
              class={{
                "p-2": true,
                "rounded-lg": true,
                border: true,
                "border-red-900 bg-red-100 text-red-900":
                  booking.computed.status.priority === 1,
                "border-yellow-900 bg-yellow-100 text-yellow-900":
                  booking.computed.status.priority === 2,
                "border-green-900 bg-green-100 text-green-900":
                  booking.computed.status.priority === 3,
              }}
            >
              <dt class="text-xs font-bold uppercase opacity-60">Status</dt>
              <dd
                class={{
                  "font-bold": booking.computed.status.priority < 3,
                }}
              >
                {booking.computed.status.label}
              </dd>
            </div>
          )}
          <AttributeDisplay label="Check in" class="p-2">
            {formatDate(booking.checkInDate)}
          </AttributeDisplay>
          <AttributeDisplay label="Total nights" class="p-2">
            {booking.computed.duration.label}
          </AttributeDisplay>
          <AttributeDisplay label="Occupancy" class="p-2">
            {plural(booking.occupancy, "adult", "adults")}
          </AttributeDisplay>
        </dl>
      </section>
      <section class="flex flex-col gap-2">
        <h2 class="text-xl font-bold">Booking Details</h2>
        <dl class="grid grid-cols-2 gap-4">
          <AttributeDisplay label="Check in">
            {formatDate(booking.checkInDate)}
          </AttributeDisplay>
          <AttributeDisplay label="Check out">
            {formatDate(booking.checkOutDate)}
          </AttributeDisplay>
          <AttributeDisplay label="Total nights">
            {booking.computed.duration.label}
          </AttributeDisplay>
          <AttributeDisplay label="Total">
            {formatCurrency(booking.total, booking.currencyCode)}
          </AttributeDisplay>
          <AttributeDisplay label="Occupancy">
            {plural(booking.occupancy, "adult", "adults")}
          </AttributeDisplay>
          <AttributeDisplay label="Created at">
            {formatTime(booking.createdAt)}
          </AttributeDisplay>
          <AttributeDisplay label="Paid at">
            {booking.paidInFullAt && formatTime(booking.paidInFullAt)}
            {!booking.paidInFullAt && <em class="text-slate-500">Not paid</em>}
          </AttributeDisplay>
          <AttributeDisplay label="Cancelled at">
            {booking.cancelledAt && formatTime(booking.cancelledAt)}
            {!booking.cancelledAt && (
              <em class="text-slate-500">Not cancelled</em>
            )}
          </AttributeDisplay>
          <AttributeDisplay class="w-full" label="Notes">
            {booking.notes ? (
              booking.notes
            ) : (
              <em class="text-slate-500">None</em>
            )}
          </AttributeDisplay>
        </dl>
      </section>
      <section class="flex flex-col gap-2">
        <h2 class="text-xl font-bold">Customer Details</h2>
        <dl class="grid grid-cols-2 gap-4">
          <AttributeDisplay label="Customer">
            {`${booking.customer.firstName} ${booking.customer.lastName}`}
          </AttributeDisplay>
          <AttributeDisplay label="Email">
            {booking.customer.email}
          </AttributeDisplay>
        </dl>
        <details>
          <summary class="cursor-pointer hover:underline">
            Related bookings{" "}
            <span class="text-slate-500">
              ({booking.customer.bookingIds.length})
            </span>
          </summary>
          <ul class="grid grid-cols-4 gap-2">
            {booking.customer.bookingIds.map((bookingId) => (
              <li key={bookingId}>
                <Link href={`/booking/${bookingId}`} class="hover:underline">
                  Booking ID #{bookingId}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </section>
      <section class="flex flex-col gap-2">
        <h2 class="text-xl font-bold">Room Details</h2>
        <dl class="grid grid-cols-2 gap-4">
          <AttributeDisplay label="Hotel">
            {booking.hotel.name}
          </AttributeDisplay>
          <AttributeDisplay label="Room name">
            {booking.room.name}
          </AttributeDisplay>
          <AttributeDisplay label="Max. occupancy">
            {booking.room.maxOccupancy}
          </AttributeDisplay>
          <AttributeDisplay label="Total units">
            {booking.room.maxUnits}
          </AttributeDisplay>
        </dl>
      </section>
    </div>
  );
});

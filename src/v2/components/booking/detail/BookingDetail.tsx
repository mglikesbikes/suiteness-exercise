import { component$ } from "@builder.io/qwik";
import { type BookingDetailWithStatusAndDuration } from "~/v2/schemas/data/BookingDetailSchema";
import { AttributeDisplay } from "../attributes/AttributeDisplay";
import { StatusAttr } from "../attributes/StatusAttr";
import { formatDate } from "~/data/formatters/date";
import { formatCurrency } from "~/data/formatters/currency";
import { plural } from "~/utils/plural";
import { formatTime } from "~/data/formatters/time";
import { Link } from "@builder.io/qwik-city";

interface BookingDetailProps {
  booking: BookingDetailWithStatusAndDuration;
}

export const BookingDetail = component$((props: BookingDetailProps) => {
  return (
    <div class="flex flex-col gap-8">
      <section class="flex flex-col gap-4 rounded-lg border border-slate-500 bg-slate-100 p-4 shadow sm:p-8">
        <h2 class="text-2xl font-bold">{props.booking.hotel.name}</h2>
        <dl class="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <StatusAttr status={props.booking.status} />
          <AttributeDisplay label="ID">{props.booking.id}</AttributeDisplay>
          <AttributeDisplay label="Check in">
            {formatDate(props.booking.checkInDate)}
          </AttributeDisplay>
          <AttributeDisplay label="Length">
            {props.booking.duration.label}
          </AttributeDisplay>
          <AttributeDisplay label="Total">
            {formatCurrency(props.booking.total, props.booking.currencyCode)}
          </AttributeDisplay>
        </dl>
      </section>
      <section>
        <h2 class="text-xl font-bold">Booking Details</h2>
        <dl class="grid gap-4 sm:grid-cols-2">
          <AttributeDisplay label="Check in">
            {formatDate(props.booking.checkInDate)}
          </AttributeDisplay>
          <AttributeDisplay label="Check out">
            {formatDate(props.booking.checkOutDate)}
          </AttributeDisplay>
          <AttributeDisplay label="Total nights">
            {props.booking.duration.label}
          </AttributeDisplay>
          <AttributeDisplay label="Total">
            {formatCurrency(props.booking.total, props.booking.currencyCode)}
          </AttributeDisplay>
          <AttributeDisplay label="Occupancy">
            {plural(props.booking.occupancy, "adult", "adults")}
          </AttributeDisplay>
          <AttributeDisplay label="Created at">
            {formatTime(props.booking.createdAt)}
          </AttributeDisplay>
          <AttributeDisplay label="Paid at">
            {props.booking.paidInFullAt &&
              formatTime(props.booking.paidInFullAt)}
            {!props.booking.paidInFullAt && (
              <em class="text-slate-500">Not paid</em>
            )}
          </AttributeDisplay>
          <AttributeDisplay label="Cancelled at">
            {props.booking.cancelledAt && formatTime(props.booking.cancelledAt)}
            {!props.booking.cancelledAt && (
              <em class="text-slate-500">Not cancelled</em>
            )}
          </AttributeDisplay>
          <AttributeDisplay class="w-full" label="Notes">
            {props.booking.notes ? (
              props.booking.notes
            ) : (
              <em class="text-slate-500">None</em>
            )}
          </AttributeDisplay>
        </dl>
      </section>
      <section>
        <h2 class="text-xl font-bold">Customer Details</h2>
        <dl class="grid gap-4 sm:grid-cols-2">
          <AttributeDisplay label="Customer">
            {`${props.booking.customer.firstName} ${props.booking.customer.lastName}`}
          </AttributeDisplay>
          <AttributeDisplay label="Email">
            {props.booking.customer.email}
          </AttributeDisplay>
        </dl>
        <details class="mt-2">
          <summary class="cursor-pointer hover:underline">
            Related bookings{" "}
            <span class="text-slate-500">
              ({props.booking.customer.bookingIds.length})
            </span>
          </summary>
          <ul class="grid grid-cols-2 gap-2 sm:grid-cols-4">
            {props.booking.customer.bookingIds.map((bookingId) => (
              <li key={bookingId}>
                <Link
                  href={`/v2/bookings/${bookingId}`}
                  class="hover:underline"
                >
                  Booking ID #{bookingId}
                </Link>
              </li>
            ))}
          </ul>
        </details>
      </section>
      <section>
        <h2 class="text-xl font-bold">Room Details</h2>
        <dl class="grid gap-4 sm:grid-cols-2">
          <AttributeDisplay label="Hotel">
            {props.booking.hotel.name}
          </AttributeDisplay>
          <AttributeDisplay label="Room name">
            {props.booking.room.name}
          </AttributeDisplay>
          <AttributeDisplay label="Max. occupancy">
            {props.booking.room.maxOccupancy}
          </AttributeDisplay>
          <AttributeDisplay label="Total units">
            {props.booking.room.maxUnits}
          </AttributeDisplay>
        </dl>
      </section>
    </div>
  );
});

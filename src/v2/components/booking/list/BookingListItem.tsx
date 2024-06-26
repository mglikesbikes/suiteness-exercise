import { component$ } from "@builder.io/qwik";
import { type BookingWithStatusAndDuration } from "~/v2/schemas/data/BookingSchema";
import { AttributeDisplay } from "../attributes/AttributeDisplay";
import { StatusAttr } from "../attributes/StatusAttr";
import { formatCurrency } from "~/data/formatters/currency";
import { formatDate } from "~/data/formatters/date";
import { HiArrowRightCircleSolid } from "@qwikest/icons/heroicons";
import { LinkButton } from "../../global/LinkButton";

interface BookingListItemProps {
  booking: BookingWithStatusAndDuration;
}

export const BookingListItem = component$((props: BookingListItemProps) => {
  return (
    <li class="my-4 flex flex-col gap-2 rounded-lg border border-slate-500 bg-slate-100 p-4">
      <h2 class="text-xl font-bold">{props.booking.hotelName}</h2>
      <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <dl class="flex flex-col gap-4 sm:flex-row sm:items-center">
          <StatusAttr status={props.booking.status} />
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
        <LinkButton
          href={`/v2/bookings/${props.booking.id}`}
          ariaLabel={`Booking #${props.booking.id}`}
          extraClasses="sm:self-center"
        >
          All details
          <HiArrowRightCircleSolid class="text-lg" />
        </LinkButton>
      </div>
    </li>
  );
});

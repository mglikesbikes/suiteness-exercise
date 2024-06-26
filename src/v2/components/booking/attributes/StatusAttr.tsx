import { component$ } from "@builder.io/qwik";
import { AttributeDisplay } from "./AttributeDisplay";
import { type BookingStatus } from "~/v2/loaders/helpers/getBookingStatus";

interface StatusAttr {
  status: BookingStatus;
}

export const StatusAttr = component$((props: StatusAttr) => (
  <AttributeDisplay
    label="Status"
    class={{
      "min-w-[120px] rounded border p-2 font-bold": true,
      "border-red-900 bg-red-100 text-red-900": props.status.priority === 1,
      "border-yellow-900 bg-yellow-100 text-yellow-900":
        props.status.priority === 2,
      "border-green-900 bg-green-100 text-green-900":
        props.status.priority === 3,
    }}
  >
    {props.status.label}
  </AttributeDisplay>
));

import { type BookingSchema } from "~/data/schemas/booking";
import { differenceInCalendarDays } from "date-fns";

interface ComputedDuration {
  length: number;
  label: string;
}

export const duration = (booking: BookingSchema): ComputedDuration => {
  const length = differenceInCalendarDays(
    new Date(booking.checkOutDate),
    new Date(booking.checkInDate),
  );

  return {
    length,
    label: `${length} day${length !== 1 ? "s" : ""}`,
  };
};

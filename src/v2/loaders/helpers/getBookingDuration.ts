import { differenceInCalendarDays } from "date-fns";
import { type BookingDetail } from "../../schemas/data/BookingDetailSchema";
import { type Booking } from "../../schemas/data/BookingSchema";
import { plural } from "~/utils/plural";

export interface BookingDuration {
  length: number;
  label: string;
}

export const getBookingDuration = (
  booking: Booking | BookingDetail,
): BookingDuration => {
  const length = differenceInCalendarDays(
    new Date(booking.checkOutDate),
    new Date(booking.checkInDate),
  );

  return {
    length,
    label: plural(length, "night", "nights"),
  };
};

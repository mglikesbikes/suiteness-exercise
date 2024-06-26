import { z } from "zod";
import { type BookingStatus } from "../../loaders/helpers/getBookingStatus";
import { type BookingDuration } from "../../loaders/helpers/getBookingDuration";

export const BookingSchema = z.object({
  cancelled: z.boolean(),
  checkInDate: z.string().date(),
  checkOutDate: z.string().date(),
  currencyCode: z.string().length(3),
  hotelName: z.string(),
  id: z.number(),
  occupancy: z.number(),
  paid: z.boolean(),
  total: z.number(),
});

export type Booking = z.infer<typeof BookingSchema>;
export interface BookingWithStatusAndDuration extends Booking {
  status: BookingStatus;
  duration: BookingDuration;
}

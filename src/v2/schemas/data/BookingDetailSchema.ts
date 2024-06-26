import { z } from "zod";
import { type BookingDuration } from "~/v2/loaders/helpers/getBookingDuration";
import { type BookingStatus } from "~/v2/loaders/helpers/getBookingStatus";

export const BookingDetailSchema = z.object({
  cancelledAt: z.string().datetime().nullable(),
  checkInDate: z.string().date(),
  createdAt: z.string().datetime(),
  checkOutDate: z.string().date(),
  currencyCode: z.string().length(3),
  customer: z.object({
    bookingIds: z.array(z.number()),
    email: z.string().email(),
    firstName: z.string(),
    id: z.number(),
    lastName: z.string(),
  }),
  hotel: z.object({
    id: z.number(),
    name: z.string(),
  }),
  id: z.number(),
  occupancy: z.number(),
  notes: z.string().nullable(),
  paidInFullAt: z.string().datetime().nullable(),
  room: z.object({
    id: z.number(),
    maxUnits: z.number(),
    maxOccupancy: z.number(),
    name: z.string(),
  }),
  total: z.number(),
  updatedAt: z.string().datetime(),
});

export type BookingDetail = z.infer<typeof BookingDetailSchema>;
export interface BookingDetailWithStatusAndDuration extends BookingDetail {
  status: BookingStatus;
  duration: BookingDuration;
}

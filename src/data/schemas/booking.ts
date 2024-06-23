import { z } from "zod";
import { customer } from "./customer";
import { hotel, hotelName } from "./hotel";
import { room } from "./room";
import { currencyCode } from "./currencyCode";

const checkInDate = z.string().date();
const checkOutDate = z.string().date();
const occupancy = z.number();
const id = z.number();
const total = z.number();

export const booking = z.object({
  id,
  checkInDate,
  checkOutDate,
  occupancy,
  cancelled: z.boolean(),
  currencyCode: currencyCode,
  hotelName,
  paid: z.boolean(),
  total,
});

export const bookingDetail = z.object({
  id,
  checkInDate,
  checkOutDate,
  occupancy,
  cancelledAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
  currencyCode: currencyCode,
  customer: customer,
  hotel: hotel,
  notes: z.optional(z.any()),
  paidInFullAt: z.string().datetime().nullable(),
  room: room,
  total,
  updatedAt: z.string().datetime(),
});

export type BookingSchema = z.infer<typeof booking>;
export type BookingDetailSchema = z.infer<typeof bookingDetail>;

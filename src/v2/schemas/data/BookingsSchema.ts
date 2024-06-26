import { z } from "zod";
import { BookingSchema } from "./BookingSchema";

export const BookingsSchema = z.array(BookingSchema);

export type Bookings = z.infer<typeof BookingsSchema>;

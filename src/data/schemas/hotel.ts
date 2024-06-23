import { z } from "zod";

export const hotelName = z.string();

export const hotel = z.object({
  id: z.number(),
  name: hotelName,
});

export type HotelSchema = z.infer<typeof hotel>;

import { z } from "zod";

export const customer = z.object({
  id: z.number(),
  email: z.string().email(),
  firstName: z.string().trim().min(1).max(32),
  lastName: z.string().trim().min(1).max(32),
  bookingIds: z.array(z.number()),
});

export type CustomerSchema = z.infer<typeof customer>;

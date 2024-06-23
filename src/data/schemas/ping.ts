import { z } from "zod";

export const ping = z.object({
  ok: z.boolean(),
  email: z.string().email().optional(),
  message: z.string().optional(),
});

export type PingSchema = z.infer<typeof ping>;

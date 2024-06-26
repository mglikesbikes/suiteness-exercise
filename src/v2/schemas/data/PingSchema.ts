import { z } from "zod";

export const PingSchema = z.union([
  z.object({ message: z.string() }),
  z.object({ ok: z.boolean(), email: z.string().optional().nullable() }),
]);

export type Ping = z.infer<typeof PingSchema>;

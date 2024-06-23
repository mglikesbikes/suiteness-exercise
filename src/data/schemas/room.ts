import { z } from "zod";

export const room = z.object({
  id: z.number(),
  maxUnits: z.number(),
  maxOccupancy: z.number(),
  name: z.string(),
});

export type RoomSchema = z.infer<typeof room>;

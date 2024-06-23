import { z } from "zod";

export const currencyCode = z.string().length(3);

export type CurrencyCodeSchema = z.infer<typeof currencyCode>;

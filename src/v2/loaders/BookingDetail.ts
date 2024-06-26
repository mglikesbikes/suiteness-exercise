import { routeLoader$ } from "@builder.io/qwik-city";
import { getTraverseFetch } from "./helpers/getTraverseFetch";
import {
  BookingDetailSchema,
  type BookingDetailWithStatusAndDuration,
} from "../schemas/data/BookingDetailSchema";
import { getBookingDuration } from "./helpers/getBookingDuration";
import { getBookingStatus } from "./helpers/getBookingStatus";

type UseBookingDetail =
  | {
      ok: true;
      booking: BookingDetailWithStatusAndDuration;
    }
  | {
      ok: false;
      message: string;
    };

// eslint-disable-next-line qwik/loader-location
export const useBookingDetail = routeLoader$<UseBookingDetail>(
  async (event) => {
    const req = await getTraverseFetch(`/bookings/${event.params.id}`, {
      apiKey: event.platform.env.TRAVERSE_API_KEY,
      baseUrl: event.platform.env.TRAVERSE_API_ROOT,
    });

    try {
      const res = await req.json();
      const parsed = BookingDetailSchema.safeParse(res);

      if (parsed.success) {
        const withStatusAndDuration: BookingDetailWithStatusAndDuration = {
          ...parsed.data,
          duration: getBookingDuration(parsed.data),
          status: getBookingStatus(
            parsed.data.cancelledAt !== null,
            parsed.data.paidInFullAt !== null,
          ),
        };

        return {
          ok: true,
          booking: withStatusAndDuration,
        };
      } else {
        return {
          ok: false,
          message: parsed.error.toString(),
        };
      }
    } catch (e) {
      return {
        ok: false,
        message: "request failed",
      };
    }
  },
);

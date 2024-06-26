import { routeLoader$ } from "@builder.io/qwik-city";
import { getTraverseFetch } from "./helpers/getTraverseFetch";
import { BookingsSchema } from "../schemas/data/BookingsSchema";
import { getBookingStatus } from "./helpers/getBookingStatus";
import { type BookingWithStatusAndDuration } from "../schemas/data/BookingSchema";
import { getBookingDuration } from "./helpers/getBookingDuration";

interface UseBookings {
  ok: boolean;
  bookings: BookingWithStatusAndDuration[];
  message?: string;
}

// eslint-disable-next-line qwik/loader-location
export const useBookings = routeLoader$<UseBookings>(async (event) => {
  const req = await getTraverseFetch("/bookings", {
    apiKey: event.platform.env.TRAVERSE_API_KEY,
    baseUrl: event.platform.env.TRAVERSE_API_ROOT,
  });

  try {
    const res = await req.json();
    const parsed = BookingsSchema.safeParse(res);

    if (parsed.success) {
      const withStatusAndDuration: BookingWithStatusAndDuration[] =
        parsed.data.map((booking) => {
          return {
            ...booking,
            status: getBookingStatus(booking.cancelled, booking.paid),
            duration: getBookingDuration(booking),
          };
        });

      return {
        ok: true,
        bookings: withStatusAndDuration,
      };
    } else {
      return {
        ok: false,
        bookings: [],
        message: parsed.error.toString(),
      };
    }
  } catch (e) {
    return {
      ok: false,
      bookings: [],
      message: "request failed",
    };
  }
});

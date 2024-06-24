import { z } from "zod";
import { type Computed, Fetchable } from "../Fetcher";
import { booking, type BookingSchema } from "../schemas/booking";
import { status } from "./computed/booking/status";
import { duration } from "./computed/booking/duration";

// This is the public data available for this transaction, named GetBookings
export type GetBookingsData = {
  ok: boolean; // success/fail flag
  message?: string; // error message
  bookings: ComputedBooking[]; // list of bookings with their computed properties
};

// merge the zod schema w/ our computed properties
type ComputedBooking = BookingSchema & Computed<GetBookings["computed"]>;

// the transaction class, subclassing Fetchable so it can be used with Fetcher
export class GetBookings extends Fetchable {
  // lives at /bookings in the API
  get pathname(): string {
    return "/bookings";
  }

  // the final data, must always be QRL-encodeable, aka a flat JS object
  public data: GetBookingsData = {
    ok: false,
    message: "",
    bookings: [],
  };

  // our computed attributes and their definitions
  computed = {
    status,
    duration,
  };

  // parse our data from raw json
  fromJSON(json: any): void {
    if (json["message"]) {
      this.data.message = json["message"];
      return;
    }

    const res = z.array(booking).safeParse(json);

    if (res.success) {
      this.data.ok = true;
      this.data.bookings = this.computeAll(res.data) as ComputedBooking[];
    }
  }
}

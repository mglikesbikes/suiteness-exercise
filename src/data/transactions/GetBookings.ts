import { z } from "zod";
import { Fetchable } from "../Fetcher";
import { booking, type BookingSchema } from "../schemas/booking";

type Data = {
  ok: boolean;
  message?: string;
  bookings: BookingSchema[];
};

export class GetBookings extends Fetchable {
  get pathname(): string {
    return "/bookings";
  }

  public data: Data = {
    ok: false,
    message: "",
    bookings: [],
  };

  fromJSON(json: any): void {
    if (json["message"]) {
      this.data.message = json["message"];
      return;
    }

    const res = z.array(booking).safeParse(json);

    if (res.success) {
      this.data.ok = true;
      this.data.bookings = res.data;
    }
  }
}

import { type Computed, Fetchable } from "../Fetcher";
import { bookingDetail, type BookingDetailSchema } from "../schemas/booking";
import { duration } from "./computed/booking/duration";
import { status } from "./computed/booking/status";

export type GetBookingByIdData = {
  id: string | undefined;
  booking:
    | (BookingDetailSchema & Computed<GetBookingById["computed"]>)
    | undefined;
  message: string | undefined;
};

export class GetBookingById extends Fetchable {
  get pathname(): string {
    return `/bookings/${this.data.id}`;
  }

  public data: GetBookingByIdData = {
    id: undefined,
    booking: undefined,
    message: undefined,
  };

  constructor(id: string) {
    super();

    this.data.id = id;
  }

  computed = {
    status: (v: BookingDetailSchema) => {
      return status(v.cancelledAt !== null, v.paidInFullAt !== null);
    },
    duration,
  };

  fromJSON(json: any): void {
    if (json["message"]) {
      this.data.message = json["message"];
      return;
    }

    const res = bookingDetail.safeParse(json);

    if (res.success) {
      this.data.booking = this.compute(res.data);
    } else {
      this.data.message = res.error.toString();
    }
  }
}

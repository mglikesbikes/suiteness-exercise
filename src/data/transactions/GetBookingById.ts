import { Fetchable } from "../Fetcher";
import { bookingDetail, type BookingDetailSchema } from "../schemas/booking";

type Data = {
  id: string | undefined;
  booking: BookingDetailSchema | undefined;
  message: string | undefined;
};

export class GetBookingById extends Fetchable {
  get pathname(): string {
    return `/bookings/${this.data.id}`;
  }

  public data: Data = {
    id: undefined,
    booking: undefined,
    message: undefined,
  };

  constructor(id: string) {
    super();

    this.data.id = id;
  }

  fromJSON(json: any): void {
    if (json["message"]) {
      this.data.message = json["message"];
      return;
    }

    const res = bookingDetail.safeParse(json);

    if (res.success) {
      this.data.booking = res.data;
    } else {
      this.data.message = res.error.toString();
    }
  }
}

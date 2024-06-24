import { Fetchable } from "../Fetcher";
import { ping, type PingSchema } from "../schemas/ping";

export type GetPingData = PingSchema;

export class GetPing extends Fetchable {
  get pathname(): string {
    return "/ping";
  }

  public data: GetPingData = { ok: false };

  fromJSON(json: any): void {
    const parsed = ping.safeParse(json);

    if (parsed.success) this.data = parsed.data;
    else this.data = { ok: false, message: parsed.error.toString() };
  }
}

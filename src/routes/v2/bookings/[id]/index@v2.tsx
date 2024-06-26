import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";
import { HiArrowLeftCircleSolid } from "@qwikest/icons/heroicons";
import ErrorCard from "~/components/global/ErrorCard";
import { BookingDetail } from "~/v2/components/booking/detail/BookingDetail";
import GlobalHeader from "~/v2/components/global/GlobalHeader";
import { LinkButton } from "~/v2/components/global/LinkButton";
import { PageWidth } from "~/v2/components/global/PageWidth";
import { useBookingDetail } from "~/v2/loaders/BookingDetail";

export { useBookingDetail };

export default component$(() => {
  const detail = useBookingDetail();

  let child;

  if (detail.value.ok === true)
    child = <BookingDetail booking={detail.value.booking} />;
  else child = <ErrorCard message={detail.value.message} />;

  return (
    <>
      <GlobalHeader
        label={
          detail.value.ok
            ? `Booking #${detail.value.booking.id}`
            : `Something went wrong`
        }
      />
      <main>
        <PageWidth>
          <div class="flex flex-col gap-4">
            <nav>
              <LinkButton href="/v2/" ariaLabel="">
                <HiArrowLeftCircleSolid class="text-lg" />
                All bookings
              </LinkButton>
            </nav>
            {child}
          </div>
        </PageWidth>
      </main>
    </>
  );
});

export const head: DocumentHead = (props) => {
  const detail = props.resolveValue(useBookingDetail);

  if (detail.ok === false)
    return {
      title: "Something went wrong",
    };

  return {
    title: `Booking #${detail.booking.id} | Suiteness`,
  };
};

import {
  component$,
  createContextId,
  type QRL,
  useContext,
  useSignal,
  useVisibleTask$,
} from "@builder.io/qwik";
import { HiXCircleSolid } from "@qwikest/icons/heroicons";
import { writeToUrl } from "~/utils/writeToUrl";
import {
  type BookingStatusLabel,
  BookingStatusLabels,
} from "~/v2/loaders/helpers/getBookingStatus";

export interface BookingListFilterSelection {
  status: BookingStatusLabel | "";
}

export const BookingListFilterContext =
  createContextId<BookingListFilterSelection>("filter");

export const BookingListFilter = component$(() => {
  const filterContext = useContext(BookingListFilterContext);

  return (
    <form action="/v2">
      <div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4">
        <p class="font-bold">Filter By:</p>
        <StatusFilter
          value={filterContext.status}
          onChange$={(newStatus) => {
            writeToUrl("status", newStatus);
            filterContext.status = newStatus;
          }}
        />
        <div class="ml-auto flex gap-4">
          {filterContext.status && (
            <button
              type="reset"
              class="flex items-center gap-2 rounded border border-slate-500 bg-slate-100 p-2"
              onClick$={() => {
                writeToUrl("status", "");
                filterContext.status = "";
              }}
            >
              <HiXCircleSolid class="text-lg" />
              Clear
            </button>
          )}
          <input
            type="submit"
            value="Apply"
            class="sr-only rounded border border-slate-500 bg-slate-100 p-2"
          />
        </div>
      </div>
    </form>
  );
});

interface StatusFilterProps {
  value: string;
  onChange$?: QRL<(value: BookingStatusLabel | "") => void>;
}

export const StatusFilter = component$((props: StatusFilterProps) => {
  return (
    <div>
      <label class="sr-only" for="status">
        Status:
      </label>
      <select
        onChange$={(e, el) => {
          if (props.onChange$) {
            props.onChange$(el.value as BookingStatusLabel);
          }
        }}
        id="status"
        name="status"
        class="h-[42px] rounded border border-slate-500 bg-slate-100 p-2"
      >
        <option value="" selected={props.value === ""}>
          Status
        </option>
        {BookingStatusLabels.map((label, index) => {
          return (
            <option key={index} value={label} selected={props.value === label}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
});

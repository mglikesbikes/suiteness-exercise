export interface BookingStatus {
  cancelled: boolean;
  fullyPaid: boolean;
  priority: 1 | 2 | 3;
  label: string;
}

export const BookingStatusLabels = [
  "Paid",
  "Refund Required",
  "Cancelled",
  "Not Paid",
] as const;

export type BookingStatusLabel = (typeof BookingStatusLabels)[number];

export const getBookingStatus = (
  cancelled: boolean,
  fullyPaid: boolean,
): BookingStatus => {
  const status: BookingStatus = {
    cancelled,
    fullyPaid,
    priority: 3, // okay
    label: BookingStatusLabels[0], // default is fully paid and not canceled
  };

  // raise the priority if it's cancelled and fully paid: (this is a guess), but sounds like it would need a refund
  if (status.cancelled && status.fullyPaid) {
    status.priority = 1; // urgent
    status.label = BookingStatusLabels[1];
  }

  // if it's cancelled and not paid
  if (status.cancelled && !status.fullyPaid) {
    status.priority = 2; // info
    status.label = BookingStatusLabels[2];
  }

  // if it's not paid and not cancelled
  if (!status.cancelled && !status.fullyPaid) {
    status.priority = 2; //ok
    status.label = BookingStatusLabels[3];
  }

  return status;
};

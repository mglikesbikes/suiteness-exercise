interface ComputedStatus {
  cancelled: boolean;
  fullyPaid: boolean;
  // 1 - urgent; 2 - info; 3 - ok
  priority: 1 | 2 | 3;
  label: string;
}

export const status = (
  cancelled: boolean,
  fullyPaid: boolean,
): ComputedStatus => {
  const status: ComputedStatus = {
    cancelled,
    fullyPaid,
    priority: 3, // okay
    label: "Paid", // default is fully paid and not canceled
  };

  // raise the priority if it's cancelled and fully paid: (this is a guess), but sounds like it would need a refund
  if (status.cancelled && status.fullyPaid) {
    status.priority = 1; // urgent
    status.label = "Refund Required";
  }

  // if it's cancelled and not paid
  if (status.cancelled && !status.fullyPaid) {
    status.priority = 2; // info
    status.label = "Cancelled";
  }

  // if it's not paid and not cancelled
  if (!status.cancelled && !status.fullyPaid) {
    status.priority = 2; //ok
    status.label = "Not Paid";
  }

  return status;
};

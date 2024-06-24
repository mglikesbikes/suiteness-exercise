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
    label: "OK",
  };

  // raise the priority if it's cancelled and fully paid: (this is a guess), but sounds like it would need a refund
  if (status.cancelled && status.fullyPaid) {
    status.priority = 1; // urgent
    status.label = "Refund Required";
  }

  if (status.cancelled && !status.fullyPaid) {
    status.priority = 2; // info
    status.label = "Cancelled";
  }

  if (!status.cancelled && status.fullyPaid) {
    status.priority = 3; //ok
    status.label = "Paid";
  }

  if (!status.fullyPaid) {
    status.priority = 2; //info
    status.label = "Not Fully Paid";
  }

  return status;
};

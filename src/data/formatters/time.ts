export const formatTime = (d: string) => {
  return new Intl.DateTimeFormat("en-US", {
    timeStyle: "short",
    dateStyle: "medium",
  }).format(new Date(d));
};

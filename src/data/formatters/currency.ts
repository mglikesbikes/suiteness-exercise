export const formatCurrency = (amount: number, currency: string) => {
  // @todo: get user's locale
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
    amount / 100,
  );
};

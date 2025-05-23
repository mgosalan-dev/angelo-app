export const formatCurrency = (value: number): string => {
  return value.toLocaleString("pt-PT", {
    style: "currency",
    currency: "EUR",
  });
};

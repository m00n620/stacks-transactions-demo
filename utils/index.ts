export const parseStxAmount = (amount: string) => {
  const decimals = 6;
  return Number(amount) / Math.pow(10, decimals);
};

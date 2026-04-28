// Base currency for the website: Nigerian Naira (NGN, ₦)

export const BASE_CURRENCY = "NGN" as const;
export const CURRENCY_SYMBOL = "₦";

/**
 * Format an NGN amount with the ₦ symbol and locale grouping.
 * For large round numbers (≥ 1,000,000) shows a compact form like ₦4.1M.
 */
export const formatNGN = (amount: number, opts?: { compact?: boolean }): string => {
  if (!Number.isFinite(amount)) return `${CURRENCY_SYMBOL}0`;
  const compact = opts?.compact ?? amount >= 1_000_000;
  if (compact) {
    if (amount >= 1_000_000) {
      const v = amount / 1_000_000;
      const str = v % 1 === 0 ? v.toFixed(0) : v.toFixed(1);
      return `${CURRENCY_SYMBOL}${str}M`;
    }
    if (amount >= 1_000) {
      return `${CURRENCY_SYMBOL}${Math.round(amount / 1_000)}K`;
    }
  }
  return `${CURRENCY_SYMBOL}${amount.toLocaleString("en-NG")}`;
};

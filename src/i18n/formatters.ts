import type { Lang } from "./translations";

type StatFmt = (value: number, suffix?: string) => string;

export type Formatters = {
  /** Stats with a + sign: ES = prefix (+100K), EN = suffix (100K+). */
  stat: StatFmt;
  /** Suffix symbol for both languages, e.g. 8 → "8+". */
  suffix: (value: number, symbol?: string) => string;
  /** Percentage with sign: +30%, -40%. */
  percent: (value: number) => string;
  /** Plain number with locale formatting. */
  number: (value: number) => string;
};

export const getFormatters = (lang: Lang): Formatters => ({
  stat: (value, suffix = "") => {
    const val = suffix ? `${value}${suffix}` : `${value}`;
    return lang === "es" ? `+${val}` : `${val}+`;
  },
  suffix: (value, symbol = "+") => `${value}${symbol}`,
  percent: (value) => `${value > 0 ? "+" : ""}${value}%`,
  number: (value) =>
    new Intl.NumberFormat(lang === "es" ? "es-ES" : "en-US").format(value),
});

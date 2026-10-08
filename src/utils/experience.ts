/**
 * Experience calculation utility for Renga Nathan A's portfolio.
 * Dynamically computes total career experience from the career start date (June 1, 2023).
 * Updates automatically without requiring manual updates to years of experience.
 */

export interface ExperienceInfo {
  /** The starting date of professional work */
  startDate: Date;
  /** The current evaluation date */
  currentDate: Date;
  /** Full years completed */
  years: number;
  /** Remaining completed months */
  months: number;
  /** Total months completed */
  totalMonths: number;
  /** Formatted string with plus sign, e.g. "3+" or "2+" */
  yearsFormatted: string;
  /** Text representation, e.g. "3+ years" */
  formatted: string;
  /** Detailed human-readable duration, e.g. "3 years 4 months" */
  detailed: string;
  /** Short duration format, e.g. "3 yrs 4 mos" */
  shortDetailed: string;
  /** Work timeline string, e.g. "June 2023 — Present (3 yrs 4 mos)" */
  durationText: string;
}

/**
 * Calculates experience duration starting from June 1, 2023 (or custom date).
 *
 * @param startDateInput - Start date (defaults to June 1, 2023)
 * @param targetDateInput - Target date to evaluate against (defaults to now)
 * @returns Detailed ExperienceInfo object
 */
export function calculateExperience(
  startDateInput: Date | string = "2023-06-01",
  targetDateInput: Date = new Date()
): ExperienceInfo {
  // Parsing date string safely (handling 'YYYY-MM-DD' as local or UTC date)
  let startDate: Date;
  if (typeof startDateInput === "string") {
    const [year, month, day] = startDateInput.split("-").map(Number);
    // Month is 0-indexed in JavaScript Date (June is 5)
    startDate = new Date(year, (month || 1) - 1, day || 1);
  } else {
    startDate = new Date(startDateInput.getTime());
  }

  const currentDate = targetDateInput;

  let years = currentDate.getFullYear() - startDate.getFullYear();
  let months = currentDate.getMonth() - startDate.getMonth();
  const days = currentDate.getDate() - startDate.getDate();

  // If current day is before start day of the month, the current month is not fully completed yet
  if (days < 0) {
    months -= 1;
  }

  // If months is negative, borrow 1 year
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  // Fallbacks for edge cases
  years = Math.max(0, years);
  months = Math.max(0, months);

  const totalMonths = years * 12 + months;
  const yearsFormatted = `${years}+`;
  const formatted = `${years}+ years`;

  // Construct detailed duration
  let detailed = "";
  if (years > 0 && months > 0) {
    detailed = `${years} ${years === 1 ? "year" : "years"} ${months} ${months === 1 ? "month" : "months"}`;
  } else if (years > 0) {
    detailed = `${years} ${years === 1 ? "year" : "years"}`;
  } else {
    detailed = `${months} ${months === 1 ? "month" : "months"}`;
  }

  const shortDetailed =
    years > 0 && months > 0
      ? `${years} yrs ${months} mos`
      : years > 0
        ? `${years} yrs`
        : `${months} mos`;

  const durationText = `June 2023 — Present (${shortDetailed})`;

  return {
    startDate,
    currentDate,
    years,
    months,
    totalMonths,
    yearsFormatted,
    formatted,
    detailed,
    shortDetailed,
    durationText,
  };
}

/** Pre-computed singleton experience object based on career start date June 1, 2023 */
export const defaultExperience = calculateExperience("2023-06-01");

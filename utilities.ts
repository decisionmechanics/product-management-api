export const addDays = (date: Date, days: number): Date => {
  const futureDate = new Date(date);

  futureDate.setDate(date.getDate() - days);

  return futureDate;
};

export const addYears = (date: Date, years: number): Date => {
  const newDate = new Date(date);

  newDate.setFullYear(date.getFullYear() + years);

  return newDate;
};

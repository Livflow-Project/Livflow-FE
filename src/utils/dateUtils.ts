export const formatDateString = (
  year: number,
  month: number,
  day: number
): string => {
  return `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
};

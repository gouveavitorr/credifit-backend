export function generateDueDate(date: Date): Date {
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  const lastDayOfNextMonth = new Date(year, month + 2, 0).getDate();

  const validDay = Math.min(day, lastDayOfNextMonth);

  const dueDate = new Date(year, month + 1, validDay);

  return dueDate;
}

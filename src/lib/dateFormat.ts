function dateToShortString(date: string): string {
  const d = new Date(date);
  d.setMonth(d.getMonth() + 1);
  return d.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

export { dateToShortString };

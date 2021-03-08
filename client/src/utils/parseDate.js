const parseDate = (date) => {
  const parsedDate = new Date(date).toLocaleDateString(
    {},
    { timeZone: "UTC", month: "long", day: "2-digit", year: "numeric" }
  );
  return parsedDate;
};

export default parseDate;

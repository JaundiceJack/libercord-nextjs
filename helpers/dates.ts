// Convert the date to mm/dd/yyyy format
export const formatDateMMDDYYYY = (rawDate: Date) => {
  const date = new Date(rawDate);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

// Convert the date to mm/dd format
export const formatDateMMDD = (rawDate: Date) => {
  const date = new Date(rawDate);
  return `${date.getMonth() + 1}/${date.getDate()}`;
};

// Get formatted date YYYY-MM-DD
export const formatDateForInput = (date: Date) => {
  const stdDate = new Date(date);

  return (
    stdDate.getFullYear() +
    "-" +
    ("0" + (stdDate.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + stdDate.getDate()).slice(-2)
  );
};

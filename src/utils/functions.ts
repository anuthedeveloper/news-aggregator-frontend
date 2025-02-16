export const formatDateToString = (dateString: string) => {
  const date = new Date(dateString.replace(" ", "T"));

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

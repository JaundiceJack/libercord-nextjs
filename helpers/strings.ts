// Capitalize the first word of each string
export const capitalize = (text?: string): string => {
  if (text && text.length > 0) {
    const words: Array<string> = text.split(" ");
    let capitalized: Array<string> = [];
    words.forEach((word) =>
      capitalized.push(word[0].toUpperCase() + word.substring(1))
    );
    return capitalized.join(" ");
  } else return "";
};

// Clip off a string and add ... if length is over given
export const truncateString = (text: string, length: number): string => {
  if (!text) {
    return "";
  } else if (text.length > length) {
    return text.substring(0, length) + "...";
  } else {
    return text;
  }
};

export const months = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

// Give the plural version of the field (since they are in the catalog but not the sections)
export const pluralizeField = (field: string) => {
  switch (field) {
    case "source":
      return "sources";
    case "category":
      return "categories";
    case "location":
      return "locations";
    default:
      return "sources";
  }
};

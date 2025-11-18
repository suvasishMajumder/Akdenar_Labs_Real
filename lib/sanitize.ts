export const sanitizeString = (value: any) => {
  if (!value || typeof value !== "string") return "";

  return value
    .trim() // remove spaces
    .replace(/\s+/g, " ") // remove extra spaces in between
    .replace(/<[^>]*>?/gm, "") // remove HTML tags
    .replace(/[{}$<>]/g, ""); // remove dangerous characters
};

export const sanitizeObject = (obj: any) => {
  const clean: any = {};

  for (const key in obj) {
    const value = obj[key];

    if (typeof value === "string") {
      clean[key] = sanitizeString(value);
    } else {
      clean[key] = value;
    }
  }

  return clean;
};

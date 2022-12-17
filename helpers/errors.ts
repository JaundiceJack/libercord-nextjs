export const errString = (e: any): string => {
  if (typeof e === "string") {
    return e;
  } else if (e instanceof Error) {
    return e.message;
  } else {
    return "An error occured.";
  }
};

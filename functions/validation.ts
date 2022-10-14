// Check for input errors
interface validation {
  email?: string;
  password?: string;
}
export const validateEntries = ({ email, password }: validation): string[] => {
  let errs = [];
  if (email === "" || email === null)
    errs.push("Please enter a valid emal address.");
  if (!password || password === "") errs.push("Please enter a password.");
  if (password && password.length < 8)
    errs.push("Passwords must be at least 8 characters in length.");
  return errs;
};

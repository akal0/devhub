import { compare } from "bcryptjs";

export const comparePasswordToHash = async (password, hashedPass) => {
  const samePass = await compare(password, hashedPass);
  return samePass;
};

export const comparePasswords = (password, confirmPassword) => {
  if (password !== confirmPassword) {
    return false;
  } else {
    return true;
  }
};

import { hash } from "bcryptjs";

export const hashPassword = async (password) => {
  const hashedPass = await hash(password, 10);
  return hashedPass;
};

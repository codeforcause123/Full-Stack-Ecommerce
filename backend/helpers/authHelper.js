import bcrypt from "bcrypt";

export const hashPassword = async (pass) => {
  try {
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(pass, saltRounds);
    return hashPassword;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (pass, hashedpass) => {
  return bcrypt.compare(pass, hashedpass);
};

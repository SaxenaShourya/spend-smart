import bcrypt from "bcryptjs";

const generateHash = async (password) => {
  const salt = await bcrypt.genSalt(Number(process.env.ENCRYPTION_SALT));
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

export default generateHash;

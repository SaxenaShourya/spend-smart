import OTP from "../../models/otpModel.js";

export const getLastResendTime = async (userID) => {
  const lastOTP = await OTP.findOne({ userID }).sort({ createdAt: -1 });
  return lastOTP ? lastOTP.createdAt.getTime() : null;
};

export const updateLastResendTime = async (userID) => {
  // Create or update an OTP record with the current timestamp
  await OTP.findOneAndUpdate(
    { userID },
    { createdAt: new Date() },
    { upsert: true }
  );
};

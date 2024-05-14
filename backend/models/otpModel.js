import { Schema, model } from "mongoose";

const otpSchema = new Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      default: Date.now,
      expires: 120,
    },
  },
  { timestamps: true }
);

const OTP = model("OTP", otpSchema);

export default OTP;

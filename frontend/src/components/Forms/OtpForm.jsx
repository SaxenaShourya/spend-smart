import React from "react";
import { Button } from "@nextui-org/react";

import OtpInput from "../Inputs/OtpInput";

const OtpForm = ({
  otp,
  email,
  setOtp,
  handleOtpSubmit,
  verifyOtpLoading,
  resendOtp,
  countdown,
}) => {
  return (
    <>
      <OtpInput
        otp={otp}
        email={email}
        setOtp={setOtp}
        onSubmit={handleOtpSubmit}
      />
      <Button
        variant="ghost"
        radius="full"
        isLoading={verifyOtpLoading}
        isDisabled={!otp || otp.length !== 4}
        className="text-secondary hover:text-primary text-2xl w-full mt-8"
        onClick={handleOtpSubmit}
      >
        Verify OTP
      </Button>
      <span className="font-calSans text-base text-center mt-10 text-black">
        "Didn't receive OTP?"
        {countdown === 0 ? (
          <span onClick={resendOtp} className="ml-1 action-btn">
            Resend OTP
          </span>
        ) : (
          <span className="ml-1 text-secondary">
            Resend OTP in {countdown}s
          </span>
        )}
      </span>
    </>
  );
};

export default OtpForm;

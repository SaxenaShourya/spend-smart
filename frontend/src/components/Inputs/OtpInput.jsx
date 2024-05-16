import React from "react";
import OtpInput from "react-otp-input";

const CustomOtpInput = ({ otp, setOtp, email, onSubmit }) => {
  return (
    <>
      <p className="text-sm lg:text-base text-center text-balance text-secondary mb-6">
        Enter the OTP sent to {email} to proceed.
      </p>
      <OtpInput
        value={otp}
        onChange={setOtp}
        onSubmit={onSubmit}
        shouldAutoFocus
        numInputs={4}
        renderSeparator={<span className="w-[1rem] md:w-[2rem]"></span>}
        renderInput={(props) => <input {...props} />}
        inputType="tel"
        inputStyle={{
          width: "3.5rem",
          height: "3.5rem",
          borderRadius: "0.8rem",
          fontSize: "2.5rem",
          fontFamily: "Cal-Sans",
          color: "#3B82F6",
        }}
      />
    </>
  );
};

export default CustomOtpInput;

import React from "react";
import { Input } from "@nextui-org/react";

import { Email } from "../../utils/Icons";

const EmailInput = ({ value, onChange, errors, noDescription }) => {
  return (
    <Input
      type="text"
      label="Email"
      name="email"
      value={value}
      onChange={onChange}
      isInvalid={!!errors?.email}
      errorMessage={errors?.email}
      placeholder="Enter your email"
      startContent={<Email />}
      className="text-primary mt-2"
      description={
        !noDescription && "We'll never share your email with anyone else."
      }
      classNames={{
        description: !noDescription ? "text-secondary text-xs" : "",
        errorMessage: "text-error font-calSans",
      }}
    />
  );
};

export default EmailInput;

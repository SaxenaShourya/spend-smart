import React from "react";
import { Input } from "@nextui-org/react";

import { User } from "../../utils/Icons";

const UsernameInput = ({ value, onChange, errors }) => {
  return (
    <Input
      type="text"
      label="Username"
      name="username"
      value={value}
      onChange={onChange}
      isInvalid={!!errors?.username}
      errorMessage={errors?.username}
      placeholder="Enter your username"
      startContent={<User />}
      className="text-primary"
      classNames={{
        errorMessage: "text-error font-calSans",
      }}
    />
  );
};

export default UsernameInput;

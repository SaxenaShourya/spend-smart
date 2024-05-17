import React, { useEffect, useState } from "react";
import { object, string } from "yup";
import {
  Tabs,
  Tab,
  Link,
  Button,
  Card,
  CardBody,
  Spinner,
} from "@nextui-org/react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/authenticate/authSlice";
import { updateLoader } from "../../features/loader/loaderSlice";

import { UpdateProfile, ResetPassword } from "../../utils/Icons";

import {
  UsernameInput,
  PasswordInput,
  EmailInput,
} from "../../components/Inputs";
import {
  useGetUserDetailsQuery,
  useUpdateUserDetailsMutation,
  useResetPasswordMutation,
} from "../../features/api/apiSlices/userApiSlice";
import validateForm from "../../utils/validateForm";

const Settings = () => {
  const [selected, setSelected] = useState("acountInfo");
  const [accountInfoData, setAccountInfoData] = useState({
    username: "",
    email: "",
  });
  const [resetPassData, setResetPassData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [accountInfoErrors, setAccountInfoErrors] = useState({});
  const [resetPassErrors, setResetPassErrors] = useState({});

  const [initialAccountInfoData, setInitialAccountInfoData] = useState({
    username: "",
    email: "",
  });

  const validationAccountInfoSchema = object({
    username: string()
      .min(3, "Username must be atleast 3 characters long.")
      .max(20, "Username should not be more than 20 characters."),
    email: string().email("Invalid Email."),
  });
  const validationResetPassSchema = object({
    oldPassword: string()
      .required("Password is required.")
      .min(8, "Password must be atleast 8 characters long."),
    newPassword: string()
      .required("New Password is required.")
      .min(8, "New Password must be at least 8 characters long."),
  });

  const handleAccountInfoOnChange = (e) => {
    setAccountInfoData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    validateForm(
      e.target.name,
      e.target.value,
      validationAccountInfoSchema,
      setAccountInfoErrors
    );
  };
  const handleResetPasswordOnChange = (e) => {
    setResetPassData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    validateForm(
      e.target.name,
      e.target.value,
      validationResetPassSchema,
      setResetPassErrors
    );
  };

  const { username, email } = accountInfoData;
  const [updateUser, { isLoading: updateUserLoading }] =
    useUpdateUserDetailsMutation();
  const dispatch = useDispatch();

  const handleUpdateUser = async (e) => {
    try {
      e.preventDefault();

      if (
        username === initialAccountInfoData.username &&
        email === initialAccountInfoData.email
      ) {
        toast.error("No changes detected.");
        return;
      }

      dispatch(updateLoader(40));
      const res = await updateUser(accountInfoData).unwrap();
      await dispatch(setCredentials(res.user));

      dispatch(updateLoader(60));
      toast.success(res.message || "Profile updated Successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.error || "Unexpected Internal Server Error!");
    } finally {
      dispatch(updateLoader(100));
    }
  };

  const { oldPassword, newPassword } = resetPassData;
  const [resetPassword, { isLoading: resetPasswordLoading }] =
    useResetPasswordMutation();
  const handleResetPassword = async (e) => {
    try {
      e.preventDefault();

      dispatch(updateLoader(40));
      const res = await resetPassword(resetPassData).unwrap();

      dispatch(updateLoader(60));
      toast.success(res.message || "Password updated successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.error || "Unexpected Internal Server Error!");
    } finally {
      dispatch(updateLoader(100));
    }
  };

  const {
    data,
    isLoading: userDetailsLoading,
    refetch,
  } = useGetUserDetailsQuery();
  const getUserDetails = async () => {
    try {
      await refetch();
      if (data?.user) {
        setAccountInfoData((prev) => ({
          ...prev,
          username: data.user.username,
        }));
        setAccountInfoData((prev) => ({ ...prev, email: data.user.email }));
        setInitialAccountInfoData({
          username: data.user.username,
          email: data.user.email,
        });
      }
    } catch (error) {
      console.log(error);
      await toast.error(
        error?.data?.error ||
          "An unexpected error occurred while fetching data!"
      );
    }
  };

  const hasAccountInfoErrors = Object.values(accountInfoErrors).some(
    (error) => !!error
  );
  const hasResetPassErrors = Object.values(resetPassErrors).some(
    (error) => !!error
  );

  useEffect(() => {
    getUserDetails();
  }, [data]);

  return (
    <div className="flex flex-col justify-center items-center w-full h-[90vh] space-y-8">
      <h4 className="text-2xl md:text-3xl lg:text-5xl mt-4 text-center">
        Account Settings
      </h4>
      <Card className="w-[20rem] md:w-[30rem] h-[25rem]">
        {userDetailsLoading ? (
          <Spinner />
        ) : (
          <CardBody className="overflow-hidden flex flex-col justify-center">
            <Tabs
              fullWidth
              size="md"
              aria-label="Tabs form"
              selectedKey={selected}
              onSelectionChange={setSelected}
              className="mb-4"
            >
              <Tab key="accountInfo" title="Account Information">
                <form className="flex flex-col gap-4">
                  <UsernameInput
                    value={username}
                    onChange={handleAccountInfoOnChange}
                    errors={accountInfoErrors}
                  />
                  <EmailInput
                    value={email}
                    onChange={handleAccountInfoOnChange}
                    errors={accountInfoErrors}
                    noDescription
                  />
                  <p className="text-center text-pretty text-small">
                    Need to update your password?{" "}
                    <Link
                      size="sm"
                      onPress={() => setSelected("resetPassword")}
                      className="cursor-pointer"
                    >
                      Reset Password
                    </Link>
                  </p>
                  <Button
                    fullWidth
                    color="primary"
                    onClick={handleUpdateUser}
                    isDisabled={hasAccountInfoErrors}
                    isLoading={updateUserLoading}
                    endContent={<UpdateProfile />}
                  >
                    Update Profile
                  </Button>
                </form>
              </Tab>
              <Tab key="resetPassword" title="Reset Password">
                <form className="flex flex-col gap-4">
                  <PasswordInput
                    name="oldPassword"
                    label="Old Password"
                    placeholder="Enter Old Password"
                    value={oldPassword}
                    onChange={handleResetPasswordOnChange}
                    isInvalid={!!resetPassErrors?.oldPassword}
                    errorMessage={resetPassErrors?.oldPassword}
                  />
                  <PasswordInput
                    name="newPassword"
                    label="New Password"
                    placeholder="Enter New Password"
                    value={newPassword}
                    onChange={handleResetPasswordOnChange}
                    isInvalid={!!resetPassErrors?.newPassword}
                    errorMessage={resetPassErrors?.newPassword}
                  />
                  <p className="text-center text-small">
                    Want to modify your account details?{" "}
                    <Link
                      size="sm"
                      onPress={() => setSelected("accountInfo")}
                      className="cursor-pointer"
                    >
                      Account Information
                    </Link>
                  </p>
                  <div className="flex gap-2 justify-end">
                    <Button
                      fullWidth
                      color="primary"
                      isLoading={resetPasswordLoading}
                      onClick={handleResetPassword}
                      isDisabled={
                        !oldPassword || !newPassword || hasResetPassErrors
                      }
                      endContent={<ResetPassword />}
                    >
                      Reset Password
                    </Button>
                  </div>
                </form>
              </Tab>
            </Tabs>
          </CardBody>
        )}
      </Card>
    </div>
  );
};

export default Settings;

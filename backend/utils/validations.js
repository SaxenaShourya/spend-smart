export const validateRequiredFields = (body, requiredFields) => {
  for (const field of requiredFields) {
    if (!body[field]) {
      const capitalize = field.charAt(0).toUpperCase() + field.slice(1);
      return `${capitalize} is required!`;
    }
  }
  return;
};

export const validateUsernameLength = (username) => {
  if (username.length < 3) {
    return "Username must be at least 3 characters long!";
  }
  if (username.length > 20) {
    return "Username should not be more than 20 characters!";
  }
  return;
};

export const validatePasswordLength = (password) => {
  if (password.length < 8) {
    return "Password must be at least 8 characters long!";
  }
  return;
};

export const validateEmailAddress = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email address!";
  }
  return;
};

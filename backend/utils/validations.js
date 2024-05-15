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

export const validateOTP = (otp) => {
  const otpRegex = /^\d{4}$/;
  if (!otpRegex.test(otp)) {
    return "Invalid OTP!";
  }
  return;
};

// Incomes/Expenses validations
export const validateTitleLength = (title) => {
  if (title.length < 5) {
    return "Title must be at least 5 characters long!";
  }
  if (title.length > 15) {
    return "Title should not be more than 15 characters!";
  }
  return;
};

export const validateAmount = (amount) => {
  if (isNaN(amount) || amount <= 0) {
    return "Amount must be a positive number!";
  }
  return;
};

export const validateIncomeCategory = (category) => {
  const allowedCategories = [
    "salary",
    "freelance",
    "investments",
    "youtube",
    "rent",
    "bitcoin",
    "other",
  ];
  if (!allowedCategories.includes(category)) {
    return "Invalid category!";
  }
  return;
};

export const validateDate = (date) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(date)) {
    return "Invalid date format!";
  }
  return;
};

export const validateDescriptionLength = (description) => {
  if (description.length < 5) {
    return "Description must be at least 5 characters long!";
  }
  if (description.length > 80) {
    return "Description should not be more than 80 characters!";
  }
  return;
};

export const validatePaginationParams = (page, pageSize) => {
  const pageNumber = parseInt(page);
  const size = parseInt(pageSize);

  if (isNaN(pageNumber) || pageNumber < 1) {
    return "Invalid page number!";
  }
  if (isNaN(size) || size < 1) {
    return "Invalid page size!";
  }
  return;
};

export const validateExpenseCategory = (category) => {
  const allowedCategories = [
    "groceries",
    "utilities",
    "transportation",
    "healthcare",
    "entertainment",
    "clothing",
    "other",
  ];
  if (!allowedCategories.includes(category)) {
    return "Invalid category!";
  }
  return;
};

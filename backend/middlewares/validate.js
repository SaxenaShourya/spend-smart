import { validateRequiredFields } from "../utils/validations.js";

const validateFieldsMiddleware = (validations) => {
  return (req, res, next) => {
    try {
      const requiredFieldsError = validateRequiredFields(
        req.body,
        Object.keys(validations)
      );
      if (requiredFieldsError) {
        return res.status(400).json({ error: requiredFieldsError });
      }

      let errorMessage = null;
      Object.entries(validations).forEach(([field, validationFn]) => {
        const fieldValue = req.body[field];
        const validationError = validationFn(fieldValue);
        if (validationError) {
          errorMessage = validationError;
          return;
        }
      });

      if (errorMessage) {
        return res.status(400).json({ error: errorMessage });
      }

      next();
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
};

export default validateFieldsMiddleware;

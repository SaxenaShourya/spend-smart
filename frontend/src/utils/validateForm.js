const validateForm = (fieldName, value, schema, setErrorState) => {
  schema
    .validate({ [fieldName]: value }, { abortEarly: false })
    .then(() =>
      setErrorState((prevErrors) => ({ ...prevErrors, [fieldName]: "" }))
    )
    .catch((err) => {
      const newErrors = {};
      err.inner.forEach((error) => {
        newErrors[error.path] = error.message;
      });
      setErrorState((prevErrors) => ({
        ...prevErrors,
        [fieldName]: newErrors[fieldName],
      }));
    });
};

export default validateForm;

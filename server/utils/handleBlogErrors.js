module.exports = (err) => {
  let errors = { heading: "", body: "" };
  if (err.message.includes("blogs validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

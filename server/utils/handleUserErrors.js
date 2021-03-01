module.exports = (err) => {
  let errors = { email: "", username: "", password: "" };

  if (err.message === "password incorrect") {
    errors["password"] = "Incorrect password";
  }

  if (err.message === "user not found") {
    errors["email"] = "User not registered";
  }

  if (err.code === 11000) {
    errors["email"] = "User already registered";
    return errors;
  }

  if (err.message.includes("users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports = (err) => {
  let errors = { email: "", username: "", name: "", password: "" };
  if (err.message === "password incorrect") {
    errors["password"] = "Incorrect password";
  }

  if (err.message === "user not found") {
    errors["email"] = "User not registered";
  }

  if (err.code === 11000 && err.message.includes("email")) {
    errors["email"] = "User already registered";
    return errors;
  }

  if (err.code === 11000 && err.message.includes("username")) {
    errors["username"] = "Username already taken";
    return errors;
  }

  if (err.message.includes("users validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

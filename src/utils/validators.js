export function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value).trim());
}

// Check Validates the email and password fields in the login form.
export function validateLogin({ email, password }) {
  const errors = {};
  if (!email) errors.email = "Email is required";
  else if (!isEmail(email)) errors.email = "Enter a valid email address";
  if (!password) errors.password = "Password is required";
  else if (password.length < 6)
    errors.password = "Password must be at least 6 characters";
  return errors;
}

// Validates all required fields in the registration form.
export function validateRegister(values) {
  const errors = validateLogin(values);
  if (!values.name?.trim()) errors.name = "Full name is required";
  if (!values.city) errors.city = "City is required";
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }
  return errors;
}

// Validates the required fields before a clothing listing is submitted.
export function validateListing(values) {
  const errors = {};
  if (!values.title?.trim()) errors.title = "Title is required";
  if (!values.category) errors.category = "Category is required";
  if (!values.size) errors.size = "Size is required";
  if (!values.brand?.trim()) errors.brand = "Brand is required";
  if (!values.condition) errors.condition = "Condition is required";
  if (!values.description?.trim() || values.description.trim().length < 20) {
    errors.description = "Add a description of at least 20 characters";
  }
  if (!values.imageUrl?.trim()) errors.imageUrl = "An image URL is required";
  return errors;
}

// Calculates a simple password strength score from 0 to 4.
export function passwordStrength(password) {
  if (!password) return 0;
  let score = 0;
  if (password.length >= 6) score += 1;
  if (password.length >= 10) score += 1;
  if (/[A-Z]/.test(password) && /[0-9]/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
}

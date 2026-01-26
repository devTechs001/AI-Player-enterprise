// Validation utilities
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return {
    isValid: re.test(String(email).toLowerCase()),
    error: re.test(String(email).toLowerCase()) ? null : 'Please enter a valid email address',
  };
};

export const validatePassword = (password) => {
  const minLength = 8;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const validations = {
    minLength: password.length >= minLength,
    hasUpperCase,
    hasLowerCase,
    hasNumbers,
    hasSpecialChar,
  };

  const isValid = Object.values(validations).every(v => v);

  return {
    isValid,
    validations,
    error: isValid ? null : 'Password must be at least 8 characters with uppercase, lowercase, number and special character',
  };
};

export const validateUrl = (url) => {
  try {
    new URL(url);
    return {
      isValid: true,
      error: null,
    };
  } catch (e) {
    return {
      isValid: false,
      error: 'Please enter a valid URL',
    };
  }
};

export const validateRequired = (value) => {
  const isValid = value != null && value !== '' && !(Array.isArray(value) && value.length === 0);
  return {
    isValid,
    error: isValid ? null : 'This field is required',
  };
};

export const validateMinLength = (value, minLength) => {
  const isValid = value && value.length >= minLength;
  return {
    isValid,
    error: isValid ? null : `Minimum length is ${minLength} characters`,
  };
};

export const validateMaxLength = (value, maxLength) => {
  const isValid = value && value.length <= maxLength;
  return {
    isValid,
    error: isValid ? null : `Maximum length is ${maxLength} characters`,
  };
};

export const validateMinValue = (value, minValue) => {
  const isValid = Number(value) >= minValue;
  return {
    isValid,
    error: isValid ? null : `Value must be at least ${minValue}`,
  };
};

export const validateMaxValue = (value, maxValue) => {
  const isValid = Number(value) <= maxValue;
  return {
    isValid,
    error: isValid ? null : `Value must be at most ${maxValue}`,
  };
};

export const validatePhone = (phone) => {
  const re = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  return {
    isValid: re.test(String(phone)),
    error: re.test(String(phone)) ? null : 'Please enter a valid phone number',
  };
};

export const validateAlphaNumeric = (value) => {
  const re = /^[a-zA-Z0-9]+$/;
  return {
    isValid: re.test(String(value)),
    error: re.test(String(value)) ? null : 'Only alphanumeric characters are allowed',
  };
};

export const validateAlpha = (value) => {
  const re = /^[a-zA-Z\s]+$/;
  return {
    isValid: re.test(String(value)),
    error: re.test(String(value)) ? null : 'Only alphabetic characters are allowed',
  };
};

export const validateNumeric = (value) => {
  const re = /^\d+$/;
  return {
    isValid: re.test(String(value)),
    error: re.test(String(value)) ? null : 'Only numeric characters are allowed',
  };
};

export const validateNoSpecialChars = (value) => {
  const re = /^[a-zA-Z0-9\s]+$/;
  return {
    isValid: re.test(String(value)),
    error: re.test(String(value)) ? null : 'Special characters are not allowed',
  };
};

export const validateFileSize = (file, maxSizeInMB) => {
  const maxSizeInBytes = maxSizeInMB * 1024 * 1024;
  const isValid = file && file.size <= maxSizeInBytes;
  return {
    isValid,
    error: isValid ? null : `File size must be less than ${maxSizeInMB}MB`,
  };
};

export const validateFileType = (file, allowedTypes) => {
  const isValid = allowedTypes.some(type => file.type.startsWith(type));
  return {
    isValid,
    error: isValid ? null : `File type must be one of: ${allowedTypes.join(', ')}`,
  };
};

export const validateImageDimensions = (file, minWidth, minHeight) => {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const isValid = img.width >= minWidth && img.height >= minHeight;
      resolve({
        isValid,
        error: isValid ? null : `Image must be at least ${minWidth}x${minHeight} pixels`,
      });
    };
    img.onerror = () => {
      resolve({
        isValid: false,
        error: 'Unable to validate image dimensions',
      });
    };
    img.src = URL.createObjectURL(file);
  });
};

export const validateStrongPassword = (password) => {
  const validations = {
    length: password.length >= 12,
    upperCase: /[A-Z]/.test(password),
    lowerCase: /[a-z]/.test(password),
    number: /\d/.test(password),
    specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    noCommonPatterns: !/(.)\1{2,}/.test(password), // No repeated characters
  };

  const isValid = Object.values(validations).every(v => v);

  return {
    isValid,
    validations,
    error: isValid ? null : 'Password must be at least 12 characters with uppercase, lowercase, number, special character and no repeated characters',
  };
};

export const validateUsername = (username) => {
  const re = /^[a-zA-Z0-9_]{3,20}$/;
  return {
    isValid: re.test(username),
    error: re.test(username) 
      ? null 
      : 'Username must be 3-20 characters long and contain only letters, numbers, and underscores',
  };
};

export const validateAge = (age) => {
  const numAge = parseInt(age, 10);
  const isValid = !isNaN(numAge) && numAge >= 13 && numAge <= 120;
  return {
    isValid,
    error: isValid ? null : 'Age must be between 13 and 120',
  };
};

export const validateCreditCard = (cardNumber) => {
  // Remove spaces and dashes
  const cleaned = cardNumber.replace(/[\s-]/g, '');
  // Basic validation for length and digits
  const isValid = /^\d{13,19}$/.test(cleaned);
  return {
    isValid,
    error: isValid ? null : 'Please enter a valid credit card number',
  };
};

export const validateZipCode = (zipCode, country = 'US') => {
  if (country === 'US') {
    const re = /^\d{5}(-\d{4})?$/;
    return {
      isValid: re.test(zipCode),
      error: re.test(zipCode) ? null : 'Please enter a valid US ZIP code',
    };
  }
  // Add more countries as needed
  return {
    isValid: true,
    error: null,
  };
};

export const validateTaxId = (taxId) => {
  // Basic validation for US SSN format (XXX-XX-XXXX)
  const re = /^\d{3}-?\d{2}-?\d{4}$/;
  return {
    isValid: re.test(taxId),
    error: re.test(taxId) ? null : 'Please enter a valid tax ID (SSN format: XXX-XX-XXXX)',
  };
};

export const validateComplex = (value, rules) => {
  const errors = [];
  
  if (rules.required && !validateRequired(value).isValid) {
    errors.push(validateRequired(value).error);
  }
  
  if (rules.minLength && !validateMinLength(value, rules.minLength).isValid) {
    errors.push(validateMinLength(value, rules.minLength).error);
  }
  
  if (rules.maxLength && !validateMaxLength(value, rules.maxLength).isValid) {
    errors.push(validateMaxLength(value, rules.maxLength).error);
  }
  
  if (rules.email && !validateEmail(value).isValid) {
    errors.push(validateEmail(value).error);
  }
  
  if (rules.password && !validatePassword(value).isValid) {
    errors.push(validatePassword(value).error);
  }
  
  if (rules.url && !validateUrl(value).isValid) {
    errors.push(validateUrl(value).error);
  }
  
  if (rules.phone && !validatePhone(value).isValid) {
    errors.push(validatePhone(value).error);
  }
  
  if (rules.alphaNumeric && !validateAlphaNumeric(value).isValid) {
    errors.push(validateAlphaNumeric(value).error);
  }
  
  if (rules.alpha && !validateAlpha(value).isValid) {
    errors.push(validateAlpha(value).error);
  }
  
  if (rules.numeric && !validateNumeric(value).isValid) {
    errors.push(validateNumeric(value).error);
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  };
};

export default {
  validateEmail,
  validatePassword,
  validateUrl,
  validateRequired,
  validateMinLength,
  validateMaxLength,
  validateMinValue,
  validateMaxValue,
  validatePhone,
  validateAlphaNumeric,
  validateAlpha,
  validateNumeric,
  validateNoSpecialChars,
  validateFileSize,
  validateFileType,
  validateImageDimensions,
  validateStrongPassword,
  validateUsername,
  validateAge,
  validateCreditCard,
  validateZipCode,
  validateTaxId,
  validateComplex,
};
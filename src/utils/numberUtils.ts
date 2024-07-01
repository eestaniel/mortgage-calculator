interface FormatNumberOptions {
  numberType?: "int" | "float";
}

// Clean input by removing non-numeric characters except the decimal point
export const cleanInput = (input: string): string => {
  return input.replace(/[^0-9.]/g, "");
};

// Format a number as a string with localized formatting
export const formatNumber = (
  input: string,
  { numberType = "int" }: FormatNumberOptions = {},
): string => {
  let number = numberType === "float" ? parseFloat(input) : parseInt(input, 10);
  if (isNaN(number)) return "";

  return number.toLocaleString(undefined, {
    minimumFractionDigits: numberType === "float" ? 2 : 0,
    maximumFractionDigits: numberType === "float" ? 2 : 0,
  });
};

// Ensure the value has a maximum of 2 decimal places
export const limitDecimals = (input: string): string => {
  const decimalIndex = input.indexOf(".");
  if (decimalIndex !== -1) {
    return input.substring(0, decimalIndex + 3);
  }
  return input;
};

// Add .00 or .0 if needed
export const formatForDisplay = (
  input: string,
  numberType: "int" | "float",
): string => {
  if (numberType === "float") {
    if (!input.includes(".")) {
      return input + ".00";
    } else if (input.match(/^\d+\.\d$/)) {
      return input + "0";
    }
  }
  return input;
};

// Remove .00 or .0 for editing
export const formatForEditing = (input: string): string => {
  if (input === "0.00") {
    return "";
  } else if (input.endsWith(".00")) {
    return input.slice(0, -3);
  } else if (input.match(/\.\d0$/)) {
    return input.slice(0, -1);
  }
  return input;
};

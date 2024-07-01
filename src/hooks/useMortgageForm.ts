import React, { useState } from "react";
import useMortgageCalculator from "./useMortgageCalculator";
import useMortgageValidation from "./useMortgageValidation";

const useMortgageForm = () => {
  const [mortgageAmount, setMortgageAmount] = useState("");
  const [mortgageTerm, setMortgageTerm] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const { results, calculateRepayment, calculateInterestOnly, resetResults } =
    useMortgageCalculator();
  const { validateFields } = useMortgageValidation();
  const [errors, setErrors] = useState({
    mortgageAmount: "",
    mortgageTerm: "",
    interestRate: "",
    selectedOption: "",
  });

  const clearAll = () => {
    setMortgageAmount("");
    setMortgageTerm("");
    setInterestRate("");
    setSelectedOption("");
    setErrors({
      mortgageAmount: "",
      mortgageTerm: "",
      interestRate: "",
      selectedOption: "",
    });
    resetResults();
  };

  const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(e.target.name);
  };

  const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fields = {
      mortgageAmount,
      mortgageTerm,
      interestRate,
      selectedOption,
    };
    const validationErrors = validateFields(fields);
    setErrors(validationErrors);

    if (Object.values(validationErrors).every((field) => field === "")) {
      const amount = parseFloat(mortgageAmount.replace(/,/g, ""));
      const term = parseInt(mortgageTerm);
      const rate = parseFloat(interestRate);
      if (selectedOption === "Repayment") {
        calculateRepayment(amount, term, rate);
      } else if (selectedOption === "Interest Only") {
        calculateInterestOnly(amount, rate, term);
      }
    }
  };

  return {
    mortgageAmount,
    setMortgageAmount,
    mortgageTerm,
    setMortgageTerm,
    interestRate,
    setInterestRate,
    selectedOption,
    setSelectedOption,
    handleOptionChange,
    handleSubmission,
    clearAll,
    results,
    errors,
  };
};

export default useMortgageForm;

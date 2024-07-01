import { useState } from "react";

export interface CalculationResults {
  monthlyRepayment: number;
  totalInterest: number;
}

const useMortgageCalculator = () => {
  const [results, setResults] = useState<CalculationResults | null>(null);

  const calculateRepayment = (amount: number, term: number, rate: number) => {
    const monthlyRate = rate / 100 / 12;
    const numberOfPayments = term * 12;
    const monthlyRepayment =
      (amount * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    const totalInterest = monthlyRepayment * numberOfPayments - amount;

    setResults({
      monthlyRepayment: parseFloat(monthlyRepayment.toFixed(2)),
      totalInterest: parseFloat(totalInterest.toFixed(2)),
    });
  };

  const calculateInterestOnly = (
    amount: number,
    rate: number,
    term: number,
  ) => {
    const monthlyRate = rate / 100 / 12;
    const monthlyRepayment = amount * monthlyRate;
    const totalInterest = monthlyRepayment * term * 12; // Calculate based on the provided term

    setResults({
      monthlyRepayment: parseFloat(monthlyRepayment.toFixed(2)),
      totalInterest: parseFloat(totalInterest.toFixed(2)),
    });
  };

  const resetResults = () => {
    setResults(null);
  };

  return { results, calculateRepayment, calculateInterestOnly, resetResults };
};

export default useMortgageCalculator;

import React, {useEffect, useState} from 'react';
import styles from './App.module.css';

import NumberField from './components/numberfield/NumberField.tsx';
import RadioField from './components/radiofield/RadioField.tsx';
import CustomButton from "./components/custombutton/CustomButton.tsx";
import EmptyResults from "./components/results/emptyresults/EmptyResults.tsx"
import ValidResults from "./components/results/validresults/ValidResults.tsx";
import useMortgageCalculator from "./hooks/useMortgageCalculator.ts";
import useMortgageValidation from "./hooks/useMortgageValidation.ts";


const App = () => {
    const [mortgageAmount, setMortgageAmount] = useState('');
    const [mortgageTerm, setMortgageTerm] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const {results, calculateRepayment, calculateInterestOnly, resetResults} = useMortgageCalculator();
    const {validateFields} = useMortgageValidation();
    const [errors, setErrors] = useState({
        mortgageAmount: '',
        mortgageTerm: '',
        interestRate: '',
        selectedOption: '',
    });

    // Add useEffect to log results when they update
    useEffect(() => {
        console.log(results)
        if (results) {
            console.log('Results updated:', results);
            console.log('Monthly Repayment:', results.monthlyRepayment);
            console.log('Total Interest:', results.totalInterest);
        }
    }, [results]); // Depend on results

    const clearAll = () => {
        setMortgageAmount('');
        setMortgageTerm('');
        setInterestRate('');
        setSelectedOption('');
        setErrors({
            mortgageAmount: '',
            mortgageTerm: '',
            interestRate: '',
            selectedOption: '',
        });
        // reset results
        resetResults()
    }

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(e.target.name);
    };

    const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const fields = {mortgageAmount, mortgageTerm, interestRate, selectedOption};
        const validationErrors = validateFields(fields);
        setErrors(validationErrors); // Update local state with validation errors


        if (Object.values(validationErrors).every((field) => field === '')) {
            console.log('Form is valid. Submitting...');
            const amount = parseFloat(mortgageAmount.replace(/,/g, ''));
            const term = parseInt(mortgageTerm);
            const rate = parseFloat(interestRate);
            if (selectedOption === 'Repayment') {
                calculateRepayment(amount, term, rate);
            } else if (selectedOption === 'Interest Only') {
                calculateInterestOnly(amount, rate, term);
            }
        } else {
            console.log(validationErrors)
            console.log('Form is invalid. Cannot submit.');
        }

    };

    return (
        <main>
            <form onSubmit={handleSubmission}>
                <div className={styles.header_group}>
                    <h1 className="preset-2">Mortgage Calculator</h1>
                    <span className={`${styles.clear_all} preset-4`} onClick={clearAll}>Clear All</span>
                </div>

                <div className={styles.fields}>
                    <NumberField
                        id="mortgage-amount"
                        label="Mortgage Amount"
                        affix="£"
                        isPrefix={true}
                        func={setMortgageAmount}
                        value={mortgageAmount}
                        numberType="float"
                        error={errors.mortgageAmount}
                    />

                    <div className={styles.term_rate_group}>
                        <NumberField
                            id="mortgage-term"
                            label="Mortgage Term"
                            affix="years"
                            isPrefix={false}
                            func={setMortgageTerm}
                            value={mortgageTerm}
                            numberType="int"
                            maxValue={100}
                            error={errors.mortgageTerm}
                        />
                        <NumberField
                            id="interest-rate"
                            label="Interest Rate"
                            affix="%"
                            isPrefix={false}
                            func={setInterestRate}
                            value={interestRate}
                            numberType="float"
                            maxValue={100}
                            error={errors.interestRate}
                        />
                    </div>

                    <div className={styles.radio_group}>
                        <h2 className={`preset-4`}>Mortgage Type</h2>
                        <RadioField
                            label="Repayment"
                            checked={selectedOption === 'Repayment'}
                            onChange={handleOptionChange}
                        />
                        <RadioField
                            label="Interest Only"
                            checked={selectedOption === 'Interest Only'}
                            onChange={handleOptionChange}
                        />
                        {errors.selectedOption && selectedOption === '' &&
                            <p className={styles.error_message}>{errors.selectedOption}</p>}
                    </div>
                    <CustomButton onClick={(e) => handleSubmission(e as unknown as React.FormEvent<HTMLFormElement>)}/>
                </div>
            </form>
            {!results ? <EmptyResults/> : <ValidResults results={results} mortgageAmount={mortgageAmount}/>}
        </main>
    );
};

export default App;

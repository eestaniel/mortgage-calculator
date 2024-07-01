import React, { useEffect, useState } from 'react';
import NumberField from './components/numberfield/NumberField.tsx';
import RadioField from './components/radiofield/RadioField.tsx';
import CustomButton from "./components/custombutton/CustomButton.tsx";
import styles from './App.module.css';

const App = () => {
    const [mortgageAmount, setMortgageAmount] = useState('');
    const [mortgageTerm, setMortgageTerm] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [selectedOption, setSelectedOption] = useState('');
    const [errors, setErrors] = useState({
        mortgageAmount: '',
        mortgageTerm: '',
        interestRate: '',
        selectedOption: '',
    });

    useEffect(() => {

    }, [errors]);

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
    }

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log('e.target.value', e.target.name);
        setSelectedOption(e.target.name);
    };

    const handleSubmission = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let newErrors = { ...errors };

        if (mortgageAmount === '') {
            newErrors.mortgageAmount = 'This field is required';
        } else {
            newErrors.mortgageAmount = '';
        }

        if (mortgageTerm === '') {
            newErrors.mortgageTerm = 'This field is required';
        } else {
            newErrors.mortgageTerm = '';
        }

        if (interestRate === '') {
            newErrors.interestRate = 'This field is required';
        } else {
            newErrors.interestRate = '';
        }

        if (selectedOption === '') {
            newErrors.selectedOption = 'Please select an option';
        } else {
            newErrors.selectedOption = '';
        }

        setErrors(newErrors);

        if (Object.values(newErrors).some((error) => error !== '')) {
            return;
        }

        else {
            console.log('submitting form');

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
                        {errors.selectedOption && selectedOption === '' && <p className={styles.error_message}>{errors.selectedOption}</p>}
                    </div>
                    <CustomButton onClick={(e) => handleSubmission(e as unknown as React.FormEvent<HTMLFormElement>)} />                </div>
            </form>
            <div className={styles.results}>
                <img src="/public/images/illustration-empty.svg" alt="illustration-empty" />
                <h3 className={`preset-2`}>Results shown here</h3>
                <p className={`preset-4`}>Complete the form and click “calculate repayments” to see what your monthly repayments would be.</p>
            </div>
        </main>
    );
};

export default App;

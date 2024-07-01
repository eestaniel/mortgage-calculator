import React from 'react';
import styles from './App.module.css';

import NumberField from './components/numberfield/NumberField';
import RadioField from './components/radiofield/RadioField';
import CustomButton from './components/custombutton/CustomButton';
import EmptyResults from './components/results/emptyresults/EmptyResults';
import ValidResults from './components/results/validresults/ValidResults';
import useMortgageForm from './hooks/useMortgageForm';

const App: React.FC = () => {
    const {
        mortgageAmount,
        setMortgageAmount,
        mortgageTerm,
        setMortgageTerm,
        interestRate,
        setInterestRate,
        selectedOption,
        handleOptionChange,
        handleSubmission,
        clearAll,
        results,
        errors,
    } = useMortgageForm();

    return (
        <main>
            <div className={styles.content}>
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
                            <h2 className="preset-4">Mortgage Type</h2>
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
                            {errors.selectedOption && selectedOption === '' && (
                                <p className={styles.error_message}>{errors.selectedOption}</p>
                            )}
                        </div>
                        <CustomButton
                            onClick={(e) => handleSubmission(e as unknown as React.FormEvent<HTMLFormElement>)}/>
                    </div>
                </form>
                <div className={styles.results}>
                    {!results ? <EmptyResults/> : <ValidResults results={results} mortgageAmount={mortgageAmount}/>}
                </div>
            </div>
        </main>
    );
};

export default App;

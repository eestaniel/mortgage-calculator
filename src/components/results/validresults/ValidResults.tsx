import styles from './ValidResults.module.css';
import React, {useEffect, useState} from "react";

interface ValidResultsProps {
    results: {
        monthlyRepayment: number;
        totalInterest: number;
    },
    mortgageAmount: string;
    selectedOption: string;

}

const ValidResults:React.FC<ValidResultsProps> = ({results, mortgageAmount, selectedOption}) => {
    const [formattedMonthlyRepayment, setFormattedMonthlyRepayment] = useState('');
    const [formattedTotalAmount, setFormattedTotalAmount] = useState('');

    useEffect(() => {
        // add comma to the monthly repayment value and make sure it has 2 decimal places
        const formattedMonthlyRepayment = results.monthlyRepayment.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        setFormattedMonthlyRepayment(formattedMonthlyRepayment);

        // calculate the total amount to be repaid and format it
        // remove the comma from the mortgage amount
        // make sure the total amount has 2 decimal places
        const mortgageAmountNumber = parseFloat(mortgageAmount.replace(/,/g, ''));
        let totalAmount;
        if (selectedOption === 'Repayment') {
            totalAmount = mortgageAmountNumber + results.totalInterest;
        } else {
            totalAmount = results.totalInterest;
        }

        const formattedTotalAmount = totalAmount.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        });
        setFormattedTotalAmount(formattedTotalAmount);
    }, [results]);

    return (
        <div className={styles.content}>
            <div className={`${styles.title_bar}`}>
                <h3 className={`preset-2`}>Your results</h3>
                <p className={`preset-4`}>Your results are shown below based on the information you provided. To adjust the results, edit the form and click “calculate repayments” again.</p>
            </div>
            <div className={styles.results}>
                <div className={styles.result_group}>
                    <h4 className={`preset-4`}>Your monthly repayments</h4>
                    <p className={`preset-1`}>£ {formattedMonthlyRepayment}</p>

                </div>
                <hr/>
                <div className={styles.result_group}>
                    <h4 className={`preset-4`}>Total you'll repay over the term</h4>
                    <p className={`preset-2 ${styles.total_amount}`}>£ {formattedTotalAmount}</p>
                </div>

            </div>
        </div>
    );
};

export default ValidResults;
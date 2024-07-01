
interface MortgageFields {
    mortgageAmount: string;
    mortgageTerm: string;
    interestRate: string;
    selectedOption: string;
}

interface MortgageErrors {
    mortgageAmount: string;
    mortgageTerm: string;
    interestRate: string;
    selectedOption: string;
}


function useMortgageValidation() {
    const validateFields = (fields: MortgageFields) => {
        const errors: MortgageErrors = {
            mortgageAmount: '',
            mortgageTerm: '',
            interestRate: '',
            selectedOption: '',
        };
        const { mortgageAmount, mortgageTerm, interestRate, selectedOption } = fields;

        if (!mortgageAmount) {
            errors.mortgageAmount = 'This field is required';
        }
        if (!mortgageTerm) {
            errors.mortgageTerm = 'This field is required';
        }
        if (!interestRate) {
            errors.interestRate = 'This field is required';
        }
        if (!selectedOption) {
            errors.selectedOption = 'This field is required';
        }

        return errors;
    };

    return { validateFields };
}

export default useMortgageValidation;

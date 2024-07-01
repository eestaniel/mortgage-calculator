import React, { useState } from "react";
import styles from "./NumberField.module.css";
import { cleanInput, formatNumber, limitDecimals, formatForDisplay, formatForEditing } from "../../utils/numberUtils";

interface NumberFieldProps {
    isPrefix: boolean;
    func: (value: string) => void;
    value: string;
    id?: string;
    label?: string;
    affix?: string;
    numberType: 'int' | 'float';
    maxValue?: number;
    error?: string;
}

const NumberField: React.FC<NumberFieldProps> = ({
                                                     id, label, affix, isPrefix, func, value, numberType, maxValue, error
                                                 }) => {
    const [focused, setFocused] = useState(false);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let cleanedInput = cleanInput(e.target.value);

        if (numberType === 'float') {
            cleanedInput = limitDecimals(cleanedInput);
        } else if (numberType === 'int' && maxValue !== undefined) {
            const intValue = parseInt(cleanedInput, 10);
            if (intValue > maxValue) {
                cleanedInput = maxValue.toString();
            }
        }

        func(cleanedInput);
    };

    const handleOnBlur = () => {
        setFocused(false);
        let formattedValue = formatForDisplay(value, numberType);

        formattedValue = formatNumber(formattedValue, { numberType });

        if (numberType === 'int' && maxValue !== undefined) {
            const intValue = parseInt(formattedValue.replace(/,/g, ''), 10);
            if (intValue > maxValue) {
                formattedValue = formatNumber(maxValue.toString(), { numberType });
            }
        }

        func(formattedValue);
    };

    const handleOnFocus = () => {
        setFocused(true);
        let unformattedValue = value.replace(/,/g, '');

        unformattedValue = formatForEditing(unformattedValue);

        func(unformattedValue);
    };

    return (
        <div className={styles.container}>
            <label className={`${styles.label} preset-4`} htmlFor={id}>{label}</label>
            <div className={`${styles.input_group} ${isPrefix ? styles.prefix : styles.suffix} ${error ? `${styles.has_error}` : ''}`}>
                {affix && <span className={`${styles.affix} preset-3`}>{affix}</span>}
                <input
                    className={`${styles.input} preset-3`}
                    id={id}
                    type="text"
                    value={focused ? value.replace(/,/g, '') : (value || '')}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    onChange={handleOnChange}
                />
            </div>
            {error && <span className={styles.error_message}>{error}</span>}
        </div>
    );
};

export default NumberField;

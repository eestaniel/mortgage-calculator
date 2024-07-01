import React, {useState} from "react";
import styles from "./NumberField.module.css";

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

const NumberField: React.FC<NumberFieldProps> = ({ id, label, affix, isPrefix, func, value, numberType, maxValue, error }) => {
    const [focused, setFocused] = useState(false);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;

        if (numberType === 'float') {
            const decimalIndex = inputValue.indexOf('.');
            if (decimalIndex !== -1 && inputValue.length - decimalIndex - 1 > 2) {
                inputValue = inputValue.substring(0, decimalIndex + 3);
            }
        } else if (numberType === 'int') {
            const intValue = parseInt(inputValue, 10);
            if (maxValue !== undefined && intValue > maxValue) {
                inputValue = maxValue.toString();
            }
        }

        func(inputValue);
    };

    const handleOnBlur = () => {
        setFocused(false);
        let formattedValue = value;

        if (value && numberType === 'int') {
            formattedValue = parseInt(value, 10).toLocaleString();
        } else if (value && numberType === 'float') {
            const floatValue = parseFloat(value);
            formattedValue = floatValue.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
            });

            if (formattedValue.match(/^[\d,]+$/)) {
                formattedValue += '.00';
            }
            if (formattedValue.match(/^[\d,]+\.\d$/)) {
                formattedValue += '0';
            }
        }

        func(formattedValue);
    };

    const handleOnFocus = () => {
        setFocused(true);
        let unformattedValue = value.replace(/,/g, '');
        if (unformattedValue.endsWith('.00')) {
            unformattedValue = unformattedValue.slice(0, -3);
        }
        func(unformattedValue);
    };

    return (
        <div className={styles.container}>
            <label className={`${styles.label} preset-4`} htmlFor={id}>{label}</label>
            <div className={`${styles.input_group} ${isPrefix ? styles.prefix : styles.suffix} ${error? `${styles.has_error}`: ''} `}>
                {affix && <span className={`${styles.affix} preset-3`}>{affix}</span>}
                <input
                    className={`${styles.input} preset-3`}
                    id={id}
                    type="text"
                    value={focused ? value : (value === '' ? '' : value)}
                    onFocus={handleOnFocus}
                    onBlur={handleOnBlur}
                    onKeyDown={(event) => {
                        const validKeys = ['Tab', 'Escape', 'Enter', 'Delete', 'Backspace', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];

                        if (validKeys.includes(event.key)) {
                            return;
                        }

                        if (numberType === 'float') {
                            if (!/[0-9.]/.test(event.key) || (event.key === '.' && event.currentTarget.value.includes('.'))) {
                                event.preventDefault();
                            }

                            const valueAfterKeyPress = event.currentTarget.value + event.key;
                            const decimalIndex = valueAfterKeyPress.indexOf('.');
                            if (decimalIndex !== -1 && valueAfterKeyPress.length - decimalIndex - 1 > 2) {
                                event.preventDefault();
                            }
                        } else if (numberType === 'int') {
                            if (!/[0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }
                    }}
                    onChange={handleOnChange}
                />
            </div>
            {error && <span className={styles.error_message}>{error}</span>}
        </div>
    );
};

export default NumberField;

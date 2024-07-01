import React from 'react';
import styles from './RadioField.module.css';

interface RadioFieldProps {
    label: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    checked?: boolean;
}

const RadioField: React.FC<RadioFieldProps> = ({ label, onChange, checked }) => {
    return (
        <label className={`${styles.radio_group} ${checked? styles.checked: ''}`} htmlFor={label}>
            <input type="radio" name={label} id={label} className={styles.radio_input} onChange={onChange} checked={checked}/>
            <span className={styles.radio_custom}></span>
            <span className={`${styles.radio_label} preset-3`}>{label}</span>
        </label>
    );
};

export default RadioField;

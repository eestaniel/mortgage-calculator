import React from "react";
import styles from './CustomButton.module.css';

interface CustomButtonProps {
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ onClick }) => {
    return (
        <div>
            <button
                className={`${styles.button} preset-3`}
                onClick={onClick}
            >
                <span>
                    <img src="/public/images/icon-calculator.svg" alt="calculator" />
                    Calculate Repayments
                </span>
            </button>
        </div>
    );
};

export default CustomButton;

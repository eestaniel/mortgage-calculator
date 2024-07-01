import styles from './EmptyResults.module.css';

const EmptyResults = () => {
    return (
        <div className={styles.results}>
            <img src="/images/illustration-empty.svg" alt="illustration-empty"/>
            <h3 className={`preset-2`}>Results shown here</h3>
            <p className={`preset-4`}>Complete the form and click “calculate repayments” to see what your monthly
                repayments would be.</p>
        </div>
    );
};

export default EmptyResults;
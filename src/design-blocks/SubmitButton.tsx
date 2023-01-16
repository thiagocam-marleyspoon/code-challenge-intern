import styles from "./SubmitButton.module.css";

export const SubmitButton = ({ children }: { children: React.ReactNode }) => {
    return (
        <button type="submit" className={styles.button}>
            {children}
        </button>
    );
};

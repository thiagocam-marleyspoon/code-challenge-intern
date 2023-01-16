import Image from "next/image";
import { UseFormRegister } from "react-hook-form";
import styles from "./Recipe.module.css";

export function Recipe({
    id,
    formRegister,
    src,
    title,
    subtitle,
    isSelected,
    maxRecipesSelected,
}: {
    id: string;
    formRegister: UseFormRegister<any>;
    src: string;
    title: string;
    subtitle: string;
    isSelected: boolean;
    maxRecipesSelected: boolean;
}) {
    const disabled = maxRecipesSelected && !isSelected;
    let wrapperClass = styles.wrapper;
    if (isSelected) {
        wrapperClass += ` ${styles.selected}`;
    }
    if (disabled) {
        wrapperClass += ` ${styles.disabled}`;
    }
    return (
        <div className={wrapperClass}>
            <input
                disabled={disabled}
                {...formRegister(id)}
                className={styles.input}
                id={`recipe-${id}`}
                type="checkbox"
            />
            <label htmlFor={`recipe-${id}`}>
                <Image
                    width={500}
                    height={333}
                    style={{ width: "100%", objectFit: "contain" }}
                    alt="recipe"
                    src={src}
                />
                <div className={styles.description}>
                    <h2 className={styles.title}>{title}</h2>
                    <div className={styles.subtitle}>{subtitle}</div>
                </div>
            </label>
        </div>
    );
}

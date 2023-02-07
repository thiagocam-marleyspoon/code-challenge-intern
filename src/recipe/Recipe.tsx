import Image from 'next/image';
import { kMaxLength } from 'buffer';
import { Attributes } from 'react';
import { UseFormRegister } from 'react-hook-form';
import styles from './Recipe.module.css';

export function Recipe({
    id,
    formRegister,
    src,
    title,
    subtitle,
    isSelected,
    maxRecipesSelected,
    recipeType,
    mealType,
    category,
    attributes,
}: {
    id: string;
    formRegister: UseFormRegister<any>;
    src: string;
    title: string;
    subtitle: string;
    isSelected: boolean;
    maxRecipesSelected: boolean;
    recipeType: string;
    mealType: string;
    category: string;
    attributes: Attributes[];
}) {
    const disabled = maxRecipesSelected && !isSelected;
    let wrapperClass = styles.wrapper;
    if (isSelected) {
        wrapperClass += ` ${styles.selected}`;
    }
    if (disabled) {
        wrapperClass += ` ${styles.disabled}`;
    }
    if (recipeType == 'PREMIUM') {
        wrapperClass += ` ${styles.isPremium}`;
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
                    style={{ width: '100%', objectFit: 'contain' }}
                    alt="recipe"
                    src={src}
                />
                <div className={styles.description}>
                    <h2 className={styles.title}>{title}</h2>
                    <div className={styles.subtitle}>{subtitle}</div>
                    {recipeType == 'PREMIUM' && <div className={styles.categoryPremium}>{recipeType}</div>}

                    <div className={styles.categoryStandard}>{category} </div>
                    {attributes.map(attribute => (
                        <div className={styles.categoryStandard}>{attribute.key?.toString().split('_').join(' ')} </div>
                    ))}
                </div>
            </label>
        </div>
    );
}

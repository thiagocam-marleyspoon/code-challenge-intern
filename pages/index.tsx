import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitButton } from '../src/design-blocks/SubmitButton';
import { RecipeData } from '../src/recipe/model';
import { Recipe } from '../src/recipe/Recipe';
import { useRecipeStore } from '../src/recipe/recipeStore';

type FormError = {
    message: 'Must select at least 3 recipes';
    code: 100;
};

export default function Home() {
    const [data, setData] = useState<{ recipes: RecipeData[] } | null>(null);
    const recipeStore = useRecipeStore();
    const [error, setError] = useState<null | FormError>(null);
    const router = useRouter();
    useEffect(() => {
        fetch('https://code-challenge-mid.vercel.app/api/recipes').then(res => {
            res.json().then(d => {
                setData(d);
            });
        });
    }, []);
    const { register, handleSubmit, watch } = useForm();
    useEffect(() => {
        console.log('depds:');
        if (error?.code === 100) {
            setError(null);
        }
    }, [data?.recipes.map(r => watch(r.id)).join()]);

    const onSubmit = (formData: Record<string, boolean>) => {
        if (Object.values(formData).filter(v => v).length < 3) {
            setError({ code: 100, message: 'Must select at least 3 recipes' });
            return;
        }
        recipeStore.setRecipes(data!.recipes.filter(r => formData[r.id]));
        router.push('/user-details');
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    const maxRecipesSelected =
        data.recipes.map(r => (watch(r.id) ? 1 : (0 as number))).reduce((prev, next) => prev + next, 0) >= 3;

    return (
        <div>
            <h1>Hello, here are this week's recipes ({data.recipes.length})</h1>
            <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                <div
                    style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '30px',
                    }}
                >
                    {data.recipes.map(recipe => {
                        const isSelected = watch(recipe.id);
                        return (
                            <Recipe
                                formRegister={register}
                                isSelected={isSelected}
                                maxRecipesSelected={maxRecipesSelected}
                                key={recipe.id}
                                id={recipe.id}
                                title={recipe.title}
                                subtitle={recipe.subtitle}
                                src={recipe.image.url}
                                recipeType={recipe.recipeType}
                                mealType={recipe.mealType}
                                category={recipe.category.displayText}
                                attributes={recipe.attributes}
                            />
                        );
                    })}
                </div>
                {error && <div>{error.message}</div>}
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div>
                        <SubmitButton>Next</SubmitButton>
                    </div>
                </div>
            </form>
        </div>
    );
}

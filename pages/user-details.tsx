import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitButton } from '../src/design-blocks/SubmitButton';
import { useRecipeStore } from '../src/recipe/recipeStore';

type FormData = { firstName: string; email: string };

export const UserDetails = () => {
    const recipes = useRecipeStore(state => state.recipes);
    const router = useRouter();
    useEffect(() => {
        if (recipes?.length !== 2) {
            router.push('/');
        }
    }, []);
    const { register, handleSubmit } = useForm<FormData>();
    if (recipes?.length !== 2) {
        return null;
    }
    const onSubmit = ({ firstName, email }: FormData) => {
        console.log('firstName', firstName);
        fetch('https://code-challenge-mid.vercel.app/api/submit', {
            method: 'POST',
            body: JSON.stringify({
                firstName,
                email,
                recipes: recipes.map(r => r.id),
            }),
        }).then(res => res.json().then(() => router.push('/confirmation')));
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>User Details</h1>
            <div>
                You've selected {recipes[0].title} and {recipes[1].title}
            </div>
            <div style={{ display: 'grid', gap: '10px', margin: '10px' }}>
                <div style={{ display: 'flex' }}>
                    <span style={{ width: '150px' }}>First name: </span>
                    <input {...register('firstName', { required: true })} />
                </div>
                <div style={{ display: 'flex' }}>
                    <span style={{ width: '150px' }}>Email: </span>
                    <input {...register('email', { required: true, validate: e => e.includes('@') })} />
                </div>
            </div>
            <SubmitButton>Confirm</SubmitButton>
        </form>
    );
};

export default UserDetails;

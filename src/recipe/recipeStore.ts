import create from 'zustand';
import { RecipeData } from './model';

type RecipeStoreType = {
    recipes: null | RecipeData[];
    setRecipes: (recipes: RecipeData[]) => void;
};

export const useRecipeStore = create<RecipeStoreType>(set => ({
    recipes: null,
    setRecipes: (recipes: RecipeData[]) => set({ recipes }),
}));

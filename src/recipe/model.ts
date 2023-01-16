type Category = {
    displayText: string;
    __typename: string;
};

export type RecipeImage = {
    url: string;
    __typename: string;
};
type Attribute = {
    key: string;
    __typename: string;
};
export type RecipeData = {
    id: string;
    slug: string;
    title: string;
    subtitle: string;
    mealType: string;
    recipeType: string;
    category: Category;
    image: RecipeImage;
    attributes: Attribute[];
    extraFees: any[];
    __typename: string;
};

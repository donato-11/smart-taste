interface Recipe {
  title: string
  summary: string
  description: string
  ingredients: []
}

export function RecipeCard({ recipe }: { recipe: Recipe }){
    return (
    <article className="bg-white rounded shadow p-4">
        <h3 className="font-semibold text-lg">{recipe.title || 'Receta sin título'}</h3>
        <p className="text-sm mt-2">{recipe.description || recipe.summary || 'Descripción automática por IA.'}</p>
        {recipe.ingredients && (
            <ul className="mt-3 list-disc list-inside text-sm">
                {recipe.ingredients.map((ing: string, i: number) => <li key={i}>{ing}</li>)}
            </ul>
        )}
    </article>
    )
}
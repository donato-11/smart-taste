"use client";

import { useState, useEffect } from "react";
import { getInformation } from "@/services/api";

interface Recipe {
  id: string,
  title: string,
  image: string,
  usedIngredientCount: string,
  missedIngredientCount: string,
  usedIngredients: Array<{
    id: number;
    name: string;
    original: string;
    image: string;
  }>;
  missedIngredients: Array<{
    id: number;
    name: string;
    original: string;
    image: string;
  }>;
  instructions: string,
  readyInMinutes: string
}

interface Information{
  instructions: string,
  readyInMinutes: string,
  summary: string
}

export function RecipeCard({ recipe, className = '' }: { recipe: Recipe; className?: string }) {
    const totalIngredientsNumber = Number(recipe.usedIngredientCount) + Number(recipe.missedIngredientCount);
    const [information, setInformation] = useState<Information>()
    const [error, setError] = useState<string | null>()
    const [loading, setLoading] = useState(false)

    async function handleGetInformation() {
        setError(null)
        if (information !== undefined) {
          setError('No se obtuvo información de la receta.')
          return
        }
    
        setLoading(true)
        try {
          const res = await getInformation(recipe.id)
          setInformation(res)
        } catch (e: unknown) {
          if (e instanceof Error) setError(e.message)
          else setError('Ocurrió un error inesperado. Por favor, intenta nuevamente.')
        } finally {
          setLoading(false)
        }
      }

      useEffect(() => {
        handleGetInformation()
      }, []) // Empty dependency array to run only once

    return (
        <article className={`bg-white rounded-2xl shadow-lg border border-orange-100 overflow-hidden group hover:shadow-xl transition-all duration-300 ${className}`}>
            {/* Header con gradiente */}
            <div className="bg-linear-to-r from-amber-500 to-orange-600 p-6">
                <h3 className="font-bold text-xl text-white line-clamp-2">
                    {recipe.title || 'Receta Deliciosa'}
                </h3>
                <div className="flex items-center gap-2 mt-2">
                    <svg className="w-4 h-4 text-amber-200" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                    </svg>
                    <span className="text-amber-100 text-sm font-medium">
                        {totalIngredientsNumber || 0} ingredientes
                    </span>
                </div>
            </div>

            {/* Contenido */}
            <div className="p-6">
                {/* Descripción */}
                <p className="text-gray-700 leading-relaxed line-clamp-3 mb-4">
                    {information?.summary || 'Una deliciosa receta creada especialmente para ti con los ingredientes que tienes disponibles.'}
                </p>

                {/* Ingredientes */}
                {totalIngredientsNumber > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {recipe.usedIngredients.slice(0, 4).map((ingredient, i) => (
                            <span 
                                key={i} 
                                className={`px-3 py-1 border rounded-lg text-sm font-medium ${
                                    recipe.usedIngredients.some(used => used.id === ingredient.id)
                                        ? 'bg-green-50 border-green-200 text-green-800' // Ingredientes que tienes
                                        : 'bg-amber-50 border-amber-200 text-amber-800' // Ingredientes que necesitas
                                }`}
                            >
                                {ingredient.name}
                            </span>
                        ))}
                        {recipe.usedIngredients.length > 4 && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">
                                +{recipe.usedIngredients.length - 4} más
                            </span>
                        )}
                        {recipe.missedIngredients.slice(0, 4).map((ingredient, i) => (
                            <span 
                                key={i} 
                                className={`px-3 py-1 border rounded-lg text-sm font-medium ${
                                    recipe.missedIngredients.some(used => used.id === ingredient.id)
                                        ? 'bg-green-50 border-green-200 text-green-800' // Ingredientes que tienes
                                        : 'bg-amber-50 border-amber-200 text-amber-800' // Ingredientes que necesitas
                                }`}
                            >
                                {ingredient.name}
                            </span>
                        ))}
                        {recipe.missedIngredients.length > 4 && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-lg text-sm">
                                +{recipe.missedIngredients.length - 4} más
                            </span>
                        )}
                    </div>
                )}

                {/* Footer con acción */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <button className="flex items-center gap-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors hover:cursor-pointer duration-200 group">
                        <span>Ver receta completa</span>
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </button>
                </div>
            </div>
        </article>
    )
}
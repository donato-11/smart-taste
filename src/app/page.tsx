"use client"

import Link from 'next/link'
import { useState } from 'react'
import { IngredientInput } from '@/components/IngredientInput'
import { RecipeCard } from '@/components/RecipeCard'
import { generateRecipes } from '../services/api'

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

export default function Home() {
  const [ingredients, setIngredients] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [error, setError] = useState<string | null>(null)

  async function handleGenerate() {
    setError(null)
    if (ingredients.length === 0) {
      setError('Por favor, agrega al menos un ingrediente para comenzar')
      return
    }

    setLoading(true)
    try {
      const res = await generateRecipes(ingredients)
      setRecipes(res)
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message)
      else setError('Ocurrió un error inesperado. Por favor, intenta nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 via-orange-50 to-rose-50">
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-r from-amber-500 to-orange-600 rounded-full mb-6 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
            </svg>
          </div>
          
          <h1 className="text-5xl font-bold bg-linear-to-r from-amber-600 to-orange-700 bg-clip-text text-transparent mb-4">
            SmartTaste
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Transforma tus ingredientes en deliciosas recetas. ¡Descubre nuevas combinaciones y sorprende en la cocina!
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12 border border-orange-100">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-2 h-8 bg-linear-to-b from-amber-500 to-orange-600 rounded-full"></div>
            <h2 className="text-2xl font-semibold text-gray-800">¿Qué ingredientes tienes?</h2>
          </div>
          
          <IngredientInput value={ingredients} onChange={setIngredients} />
          
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button 
              onClick={handleGenerate} 
              disabled={loading}
              className="flex-1 bg-linear-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-102 hover:cursor-pointer disabled:opacity-60 disabled:hover:scale-100 shadow-lg flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Generando recetas...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  <span>Generar Recetas</span>
                </>
              )}
            </button>
            
            <Link 
              href="/login" 
              className="px-8 py-4 border-2 border-orange-200 text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-all duration-300 text-center"
            >
              Iniciar Sesión
            </Link>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-center gap-3 animate-pulse">
              <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}
        </div>

        {/* Recipes Section */}
        {recipes.length > 0 && (
          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                ¡Recetas Encontradas!
              </h2>
              <p className="text-gray-600">
                Descubre {recipes.length} deliciosas opciones para tus ingredientes
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((recipe, index) => (
                <RecipeCard 
                  key={index} 
                  recipe={recipe}
                />
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {recipes.length === 0 && !loading && (
          <div className="text-center py-16">
            <div className="w-24 h-24 bg-linear-to-r from-amber-200 to-orange-300 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">Listo para cocinar</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Agrega tus ingredientes arriba y descubre recetas increíbles que puedes preparar hoy mismo.
            </p>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-orange-100 py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 SmartTaste. Hecho con ❤️ para amantes de la cocina</p>
        </div>
      </footer>
    </div>
  )
}

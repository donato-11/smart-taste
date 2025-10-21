"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Header } from '@/components/Header'
import { IngredientInput } from '@/components/IngredientInput'
import { RecipeCard } from '@/components/RecipeCard'
import { generateRecipes } from '../services/api'

interface Recipe {
  title: string
  summary: string
  description: string
  ingredients: []
}

export default function Home() {
  const router = useRouter()
  const [ingredients, setIngredients] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [error, setError] = useState<string | null>(null)


  async function handleGenerate() {
    setError(null)
    if (ingredients.length === 0) {
      setError('Agrega al menos un ingrediente')
      return
    }

    setLoading(true)
    try {
      const res = await generateRecipes(ingredients)
      setRecipes(res)
    } catch (e: unknown) {
      if (e instanceof Error) setError(e.message)
      else setError('Error desconocido')
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-4">SmartTaste</h1>
        <p className="mb-6">Escribe los ingredientes que tienes y obtén nuevas recetas.</p>

        <IngredientInput value={ingredients} onChange={setIngredients} />

        <div className="flex gap-2 mt-4">
          <button onClick={handleGenerate} className="px-4 py-2 bg-indigo-600 text-white rounded disabled:opacity-60" disabled={loading}>
            {loading ? 'Generando...' : 'Generar recetas'}
          </button>
          <Link href="/login" className="px-4 py-2 border rounded">Login</Link>
        </div>

        {error && <div className="mt-4 text-red-600">{error}</div>}

        <section className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((r, i) => (
            <RecipeCard key={i} recipe={r} />
            ))}
          </section>
      </main>
    </div>
  )
}

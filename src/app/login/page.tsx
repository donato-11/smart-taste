"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Header } from '@/components/Header'
import { login } from '@/services/api'


export default function Login() {
    const router = useRouter()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    
    
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError(null)
    
        try {
            await login({ email, password })
            // After login, redirect to dashboard (assumes a token/cookie set by backend)
            router.push('/dashboard')
        } catch (err: any) {
            setError(err.message || 'Error en el login')
        } finally {
            setLoading(false)
        }
    }
    
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto p-6 max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Iniciar sesión</h2>
                <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
                    <label className="block">
                        <span className="text-sm">Email</span>
                        <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full rounded border px-3 py-2" />
                    </label>
                    <label className="block">
                        <span className="text-sm">Contraseña</span>
                        <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="mt-1 block w-full rounded border px-3 py-2" />
                    </label>
                    {error && <div className="text-red-600">{error}</div>}

                    <button type="submit" className="w-full px-4 py-2 bg-indigo-600 text-white rounded" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</button>
                </form>
            </main>
        </div>
    )
}
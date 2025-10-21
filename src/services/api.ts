import axios from 'axios'

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000'

export async function generateRecipes(ingredients: string[]) {
    const resp = await axios.post(`${API_BASE}/generate-recipes`, { ingredients })
    return resp.data.recipes || []
}

export async function login({ email, password }: { email: string; password: string }){
    const resp = await axios.post(`${API_BASE}/auth/login`, { email, password }, { withCredentials: true })
    return resp.data
}
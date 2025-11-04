import axios from 'axios';

// Configuración de APIs
const SPOONACULAR_API_KEY = '878b5822497f4e598a49261f72eef146';
const SPOONACULAR_BASE_URL = 'https://api.spoonacular.com';

// Interfaces para TypeScript
interface SupabaseAuthResponse {
  data: {
    user: any;
    session: any;
  } | null;
  error: Error | null;
}

interface User {
  id: string;
  email: string;
  created_at: string;
  name?: string;
}

interface Session {
  access_token: string;
  refresh_token: string;
}

// Cliente de Supabase (mock)
const supabaseClient = {
  auth: {
    signInWithPassword: async ({ email, password }: { email: string; password: string }): Promise<SupabaseAuthResponse> => {
      return new Promise((resolve, reject) => {
        // Simulación de autenticación - en una app real validarías contra la base de datos
        if (email && password.length >= 6) {
          resolve({
            data: {
              user: {
                id: '1',
                email: email,
                created_at: new Date().toISOString()
              } as User,
              session: {
                access_token: 'mock-jwt-token',
                refresh_token: 'mock-refresh-token'
              } as Session
            },
            error: null
          });
        } else {
          resolve({
            data: null,
            error: new Error('Invalid credentials')
          });
        }
      });
    }
  }
};

export async function generateRecipes(ingredients: string[]) {
  try {
    // Convertir array de ingredientes a string para la API
    const ingredientsString = ingredients.join(',');
    
    const resp = await axios.get(
      `${SPOONACULAR_BASE_URL}/recipes/findByIngredients`,
      {
        params: {
          ingredients: ingredientsString,
          number: 3, // Número de recetas a retornar
          ranking: 1, // Optimizar para ingredientes que tengas
          ignorePantry: true, // Ignorar ingredientes básicos como agua, sal, etc.
          includeInstruction: true,
          apiKey: SPOONACULAR_API_KEY
        }
      }
    );
    
    // Mapear la respuesta de Spoonacular a nuestro formato
    const recipes = resp.data.map((recipe: any) => ({
      id: recipe.id,
      title: recipe.title,
      image: recipe.image,
      usedIngredientCount: recipe.usedIngredientCount,
      missedIngredientCount: recipe.missedIngredientCount,
      usedIngredients: recipe.usedIngredients,
      missedIngredients: recipe.missedIngredients,
      instructions: recipe.instructions,
      readyInMinutes: recipe.readyInMinutes
    }));
    
    return recipes;
    
  } catch (error) {
    console.error('Error fetching recipes from Spoonacular:', error);
    throw new Error('Failed to generate recipes');
  }
}

export async function getInformation(id: string) {
  try {
    
    const resp = await axios.get(
      `${SPOONACULAR_BASE_URL}/recipes/${id}/information`,
      {
        params: {
          includeInstruction: true,
          apiKey: SPOONACULAR_API_KEY
        }
      }
    );
    
    // The API returns a single recipe object, not an array
    const recipe = resp.data;
    
    // Map the Spoonacular response to our format
    return {
      instructions: recipe.instructions,
      readyInMinutes: recipe.readyInMinutes,
      summary: recipe.summary
    };
    
  } catch (error) {
    console.error('Error fetching recipes from Spoonacular:', error);
    throw new Error('Failed to generate recipes');
  }
}

export async function login({ email, password }: { email: string; password: string }) {
  try {
    // Mock de autenticación con Supabase - ahora tipado correctamente
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      throw new Error(error.message);
    }

    if (!data) {
      throw new Error('No data received from authentication');
    }

    // En una implementación real, guardarías el token en cookies o localStorage
    console.log('Login successful - Supabase user:', data.user);
    
    return {
      user: data.user,
      session: data.session,
      success: true
    };

  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Authentication failed');
  }
}

// Función de registro mock con Supabase
export async function register({ email, password, name }: { email: string; password: string; name: string }) {
  try {
    // Simulación de registro en Supabase
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: {
            id: '1',
            email: email,
            name: name,
            created_at: new Date().toISOString()
          } as User,
          success: true
        });
      }, 1000);
    });
  } catch (error) {
    console.error('Registration error:', error);
    throw new Error('Registration failed');
  }
}

// Función para cerrar sesión
export async function logout() {
  try {
    // Mock de logout de Supabase
    console.log('User logged out - Supabase session cleared');
    return { success: true };
  } catch (error) {
    console.error('Logout error:', error);
    throw new Error('Logout failed');
  }
}

// Función adicional para obtener detalles completos de una receta
export async function getRecipeDetails(recipeId: number) {
  try {
    const resp = await axios.get(
      `${SPOONACULAR_BASE_URL}/recipes/${recipeId}/information`,
      {
        params: {
          apiKey: SPOONACULAR_API_KEY,
          includeNutrition: false
        }
      }
    );
    
    return resp.data;
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    throw new Error('Failed to get recipe details');
  }
}

// Función para buscar recetas por query (alternativa)
export async function searchRecipes(query: string) {
  try {
    const resp = await axios.get(
      `${SPOONACULAR_BASE_URL}/recipes/complexSearch`,
      {
        params: {
          query: query,
          number: 10,
          apiKey: SPOONACULAR_API_KEY
        }
      }
    );
    
    return resp.data.results;
  } catch (error) {
    console.error('Error searching recipes:', error);
    throw new Error('Failed to search recipes');
  }
}
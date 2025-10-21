import { Header } from '@/components/Header'


export default function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="container mx-auto p-6">
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="mt-2">Aquí el usuario verá sus recetas guardadas, historial y configuraciones.</p>
            </main>
        </div>
    )
}
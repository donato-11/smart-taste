import Link from 'next/link'

export function Navbar() {
    return (
        <header className="bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo con gradiente */}
                <Link 
                    href="/" 
                    className="text-2xl font-bold bg-linear-to-r from-amber-600 to-orange-700 bg-clip-text text-transparent flex items-center gap-2"
                >
                    <div className="w-8 h-8 bg-linear-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                        </svg>
                    </div>
                    SmartTaste
                </Link>
                
                {/* Navegación */}
                <nav className="flex items-center gap-6">
                    <Link 
                        href="/" 
                        className="text-gray-700 hover:text-amber-600 font-medium transition-colors duration-200"
                    >
                        Inicio
                    </Link>
                    <Link 
                        href="/login" 
                        className="px-4 py-2 border-2 border-amber-500 text-amber-600 font-semibold rounded-xl hover:bg-amber-50 transition-all duration-300"
                    >
                        Iniciar Sesión
                    </Link>
                </nav>
            </div>
        </header>
    )
}
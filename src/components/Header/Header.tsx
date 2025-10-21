import Link from 'next/link'


export function Header(){
    return (
        <header className="bg-white shadow">
            <div className="container mx-auto p-4 flex items-center justify-between">
                <Link href="/" className="text-xl font-semibold">SmartTaste</Link>
                <nav className="space-x-4">
                    <Link href="/">Inicio</Link>
                    <Link href="/dashboard">Dashboard</Link>
                    <Link href="/login" className="px-3 py-1 border rounded">Login</Link>
                </nav>
            </div>
        </header>
    )
}
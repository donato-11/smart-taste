import { useState } from 'react'

export function IngredientInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }) {
    const [text, setText] = useState('')

    function add() {
        const t = text.trim()
        if (!t) return

        onChange([...value, t])
        setText('')
    }

    function removeAt(i: number) {
        const copy = [...value]
        copy.splice(i, 1)
        onChange(copy)
    }

    return (
        <div className="bg-white rounded-2xl p-6 border border-orange-100 shadow-sm">
            {/* Label y descripción */}
            <div className="mb-6">
                <label className="block text-lg font-semibold text-gray-800 mb-2">
                    Ingresa tus ingredientes
                </label>
                <p className="text-gray-600 text-sm">
                    Escribe cada ingrediente y presiona Enter o haz clic en Agregar
                </p>
            </div>

            {/* Input y botón */}
            <div className="flex gap-3">
                <div className="flex-1 relative">
                    <input 
                        value={text} 
                        onChange={e => setText(e.target.value)} 
                        onKeyDown={e => e.key === 'Enter' ? add() : null} 
                        placeholder="Ej: pollo, tomate, cebolla, aceite de oliva..."
                        className="w-full rounded-xl border-2 border-gray-200 px-4 py-3 pr-24 focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all duration-200 outline-none"
                    />
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <button 
                            onClick={add}
                            disabled={!text.trim()}
                            className="px-4 py-2 bg-linear-to-r from-amber-500 to-orange-600 text-white rounded-lg font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:from-amber-600 hover:to-orange-700 transition-all duration-200 transform hover:scale-105 hover:cursor-pointer"
                        >
                            Agregar
                        </button>
                    </div>
                </div>
            </div>

            {/* Lista de ingredientes */}
            {value.length > 0 && (
                <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 mb-3">
                        Tus ingredientes ({value.length})
                    </h4>
                    <div className="flex flex-wrap gap-2">
                        {value.map((ing, i) => (
                            <span 
                                key={i} 
                                className="px-4 py-2 bg-linear-to-r from-amber-100 to-orange-100 border border-amber-200 rounded-xl flex items-center gap-2 group hover:from-amber-200 hover:to-orange-200 transition-all duration-200"
                            >
                                <span className="text-amber-800 font-medium">{ing}</span>
                                <button 
                                    onClick={() => removeAt(i)}
                                    className="w-5 h-5 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-600 transform hover:scale-110"
                                >
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </span>
                        ))}
                    </div>
                    
                    {/* Clear all button */}
                    {value.length > 1 && (
                        <div className="mt-4 flex justify-end">
                            <button 
                                onClick={() => onChange([])}
                                className="text-sm text-red-500 hover:text-red-700 font-medium flex items-center gap-1 transition-colors duration-200"
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Limpiar todos
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Empty state */}
            {value.length === 0 && (
                <div className="mt-6 text-center py-8 border-2 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                    <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <p className="text-gray-500 text-sm">
                        Aquí verás los ingredientes que has agregado.
                    </p>
                </div>
            )}
        </div>
    )
}
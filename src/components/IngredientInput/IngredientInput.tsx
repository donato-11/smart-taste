import { useState } from 'react'

export function IngredientInput({ value, onChange }: { value: string[]; onChange: (v: string[]) => void }){
    const [text, setText] = useState('')

    function add() {
        const t = text.trim()
        if (!t) return

        onChange([...value, t])
        setText('')
    }

    function removeAt(i: number){
        const copy = [...value]
        copy.splice(i,1)
        onChange(copy)
    }


    return (
        <div className="bg-white p-4 rounded shadow">
            <div className="flex gap-2">
                <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === 'Enter' ? add() : null} placeholder="ej. pollo, tomate" className="flex-1 rounded border px-3 py-2" />
                <button onClick={add} className="px-4 py-2 bg-green-600 text-white rounded">Agregar</button>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
                {value.map((ing, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 rounded flex items-center gap-2">
                        {ing}
                        <button onClick={() => removeAt(i)} className="text-red-500">x</button>
                    </span>
                ))}
            </div>
        </div>
    )
}
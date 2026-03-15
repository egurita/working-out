import {useState} from 'react'

const ExerciseForm = ({onAdd}) => {
    const [name, setName] = useState('')
    const [sets, setSets] = useState('')
    const [reps, setReps] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        onAdd({
            id: Date.now(),
            name: name,
            sets: Number(sets),
            reps: Number(reps)
        })
        setName('')
        setSets('')
        setReps('')
    }
    return (
        <form onSubmit={handleSubmit} className="bg-gray-900 border border-gray-800 rounded-xl p-6">
            <h2 className="text-lg font-bold text-white mb-4">Add Exercise</h2>
            <div className="flex flex-col gap-3">
                <input
                    type="text"
                    placeholder="Exercise name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-gray-800 border border-gray-700 focus:border-purple-500 text-white placeholder-gray-500 px-4 py-3 rounded-lg outline-none transition-colors"
                />
                <div className="flex gap-3">
                    <input
                        type="number"
                        placeholder="Sets"
                        value={sets}
                        onChange={(e) => setSets(e.target.value)}
                        className="bg-gray-800 border border-gray-700 focus:border-purple-500 text-white placeholder-gray-500 px-4 py-3 rounded-lg outline-none transition-colors w-full"
                    />
                    <input
                        type="number"
                        placeholder="Reps"
                        value={reps}
                        onChange={(e) => setReps(e.target.value)}
                        className="bg-gray-800 border border-gray-700 focus:border-purple-500 text-white placeholder-gray-500 px-4 py-3 rounded-lg outline-none transition-colors w-full"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors mt-1"
                >
                    Add Exercise
                </button>
            </div>
        </form>
    )
}
export default ExerciseForm;

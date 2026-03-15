const Exercise = ({ exercise, onComplete }) => {
    return (
        <li className="bg-gray-900 border border-gray-800 rounded-xl px-6 py-4 flex justify-between items-center hover:border-purple-800 transition-colors">
            <div>
                <p className="font-semibold text-white text-lg">{exercise.name}</p>
                <p className="text-gray-400 text-sm mt-1">
                    {exercise.sets} sets &times; {exercise.reps} reps
                </p>
            </div>
            <button
                onClick={onComplete}
                className="bg-gray-800 hover:bg-purple-600 text-gray-400 hover:text-white px-4 py-2 rounded-lg text-sm font-medium transition-all"
            >
                Complete ✓
            </button>
        </li>
    )
}
export default Exercise;

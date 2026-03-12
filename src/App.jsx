import Exercise from './components/Exercise.jsx'
import ExerciseForm from './components/ExerciseForm'
import {useState} from 'react'

const initialExercises = [
    { id: 1, name: 'Benchpress', sets: 3, reps: 12 },
    { id: 2, name: 'Squats', sets: 4, reps: 15 },
    { id: 3, name: 'Deadlifts', sets: 2, reps: 6 }
]

const App = () => {
    const [exercises, setExercises] = useState(initialExercises)

    const completeExercise = (id) => {
        setExercises(exercises.filter(exercise => exercise.id !== id))
    }

    const addExercise = (newExercise) => {
        console.log(newExercise)
        setExercises(exercises.concat(newExercise))
    }

    return (
        <div>
            <h1>Working Out</h1>
            <ul>
                {exercises.map(exercise =>
                    <Exercise
                        key={exercise.id}
                        exercise={exercise}
                        onComplete={completeExercise}
                    />
                )}
            </ul>
            <ExerciseForm onAdd={addExercise} />
        </div>
    )
}

export default App
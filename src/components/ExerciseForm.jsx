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
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label><br/>
            <input type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)}/><br/>
            <label htmlFor="sets">Sets:</label><br/>
            <input type="text" id="sets" name="sets" value={sets} onChange={(e) => setSets(e.target.value)}/><br/>
            <label htmlFor="reps">Reps:</label><br/>
            <input type="text" id="reps" name="reps" value={reps} onChange={(e) => setReps(e.target.value)}/><br/><br/>
            <input type="submit" value="Add Exercise " />
        </form>
    )
}
export default ExerciseForm;

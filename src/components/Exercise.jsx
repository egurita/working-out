const Exercise = ({exercise, onComplete}) => {
    return (
        <li>
            <div>
                Name: {exercise.name}; Sets: {exercise.sets}; Reps: {exercise.reps}
                <button onClick={() => onComplete(exercise.id)}>Complete</button>
            </div>
        </li>
    )
}
export default Exercise;

import Exercise from './components/Exercise.jsx'
import ExerciseForm from './components/ExerciseForm'
import {useState, useEffect} from 'react'
import axios from 'axios'
import RegisterForm from './components/RegisterForm.jsx'
import LoginForm from './components/LoginForm.jsx'

const App = () => {
    const [exercises, setExercises] = useState([])
    const [user, setUser] = useState(null)
    const [showRegister, setShowRegister] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem('token')
        const email = localStorage.getItem('email')
        if (token) setUser(email)
    }, [])
    useEffect(() => {
        if(!user) return
        const token = localStorage.getItem('token')
        axios.get('http://localhost:3001/api/exercises', {
            headers: {Authorization: `Bearer ${token}`}
        }).then(response => setExercises(response.data))
    }, [user])

    const login = async(email, password) => {
        const response = await axios.post('http://localhost:3001/api/auth/login', {
            email, password
        })
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('email', response.data.email)
        setUser(response.data.email)
    }
    const register = async(email, password) => {
        await axios.post('http://localhost:3001/api/auth/register', {
            email, password
        })
        await login(email, password)
    }
    const logout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('email')
        setUser(null)
        setExercises([])
    }
    const addExercise = (newExercise) => {
        const token = localStorage.getItem('token')
        axios.post('http://localhost:3001/api/exercises', newExercise, {
            headers: {Authorization: `Bearer ${token}`}
        }).then(response => setExercises(exercises.concat(response.data)))
    }

    const completeExercise = (id) => {
        const token = localStorage.getItem('token')
        axios.delete(`http://localhost:3001/api/exercises/${id}`, {
            headers: {Authorization: `Bearer ${token}`}
        }).then(() => setExercises(exercises.filter(e => e._id !== id)))
    }
    if (!user) {
        return (
            <div>
                {showRegister
                    ? <RegisterForm
                        onRegister={register}
                        onSwitchToLogin={() => setShowRegister(false)}
                    />
                    : <LoginForm
                        onLogin={login}
                        onSwitchToRegister={() => setShowRegister(true)}
                    />
                }
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            {/* Navbar */}
            <nav className="bg-gray-900 border-b border-purple-900 px-8 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold tracking-tight">
                    Working<span className="text-purple-500">Out</span>
                </h1>
                <div className="flex items-center gap-4">
                    <span className="text-gray-400 text-sm">{user}</span>
                    <button
                        onClick={logout}
                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-2xl mx-auto px-4 py-8">
                <ExerciseForm onAdd={addExercise} />
                <ul className="mt-8 flex flex-col gap-3">
                    {exercises.map(exercise =>
                        <Exercise
                            key={exercise._id}
                            exercise={exercise}
                            onComplete={() => completeExercise(exercise._id)}
                        />
                    )}
                </ul>
            </main>
        </div>
    )
}

export default App
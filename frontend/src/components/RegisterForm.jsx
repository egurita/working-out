import { useState } from 'react'

const RegisterForm = ({ onRegister, onSwitchToLogin }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setError('Passwords do not match')
            return
        }
        setError('')
        onRegister(email, password)
    }

    return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 w-full max-w-md">
                {/* Header */}
                <h2 className="text-3xl font-bold text-white mb-2">
                    Working<span className="text-purple-500">Out</span>
                </h2>
                <p className="text-gray-400 text-sm mb-8">Create your account</p>

                {/* Error message */}
                {error && (
                    <div className="bg-red-900 border border-red-700 text-red-300 px-4 py-3 rounded-lg text-sm mb-4">
                        {error}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-gray-800 border border-gray-700 focus:border-purple-500 text-white placeholder-gray-500 px-4 py-3 rounded-lg outline-none transition-colors"
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="bg-gray-800 border border-gray-700 focus:border-purple-500 text-white placeholder-gray-500 px-4 py-3 rounded-lg outline-none transition-colors"
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="bg-gray-800 border border-gray-700 focus:border-purple-500 text-white placeholder-gray-500 px-4 py-3 rounded-lg outline-none transition-colors"
                    />
                    <button
                        type="submit"
                        className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors mt-2"
                    >
                        Create Account
                    </button>
                </form>

                {/* Divider */}
                <div className="flex items-center gap-3 my-6">
                    <div className="flex-1 h-px bg-gray-800"></div>
                    <span className="text-gray-600 text-xs">or</span>
                    <div className="flex-1 h-px bg-gray-800"></div>
                </div>

                {/* Bottom note */}
                <p className="text-center text-gray-500 text-sm">
                    Already have an account?{' '}
                    <span
                        onClick={onSwitchToLogin}
                        className="text-purple-400 cursor-pointer hover:text-purple-300"
                    >
                        Sign in
                    </span>
                </p>
            </div>
        </div>
    )
}

export default RegisterForm
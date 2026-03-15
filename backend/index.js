const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const authMiddleware = require('./middleware/auth')

require('dotenv').config()
app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

const authRouter = require('./routes/auth.js');
app.use('/api/auth', authRouter);

const exerciseSchema = new mongoose.Schema({
    name: String,
    sets: Number,
    reps: Number,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})
const Exercise = mongoose.model('Exercise', exerciseSchema)

app.get('/api/exercises',authMiddleware, (req, res) => {
    console.log("userId from token: ", req.userId);
    Exercise.find({user: req.userId}).then(exercises => {
        res.json(exercises)
    })
})

app.post('/api/exercises', authMiddleware, (req, res) => {
    const exercise = new Exercise({
        name: req.body.name,
        sets: req.body.sets,
        reps: req.body.reps,
        user: req.userId
    })
    exercise.save().then(savedExercise => {
        res.json(savedExercise)
    })
})

app.delete('/api/exercises/:id', authMiddleware, (req, res) => {
    Exercise.findByIdAndDelete(req.params.id).then(() => {
        res.status(204).end()
    })
})

app.put('/api/exercises/:id', authMiddleware, (req, res) => {
    Exercise.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name, sets: req.body.sets, reps: req.body.reps, user: req.userId },
        { new: true }
    ).then(updatedExercise => {
        res.json(updatedExercise)
    })
})

app.get('/', (req, res) => {
    res.send('Backend is running!')
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
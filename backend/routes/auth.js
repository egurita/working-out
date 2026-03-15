const router = require('express').Router();
const User = require('../models/User.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.post('/register',async(req, res) => {
    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const user = new User({
        email: req.body.email,
        password: passwordHash,
    })
    const savedUser = await user.save()
    res.json(savedUser)
})
router.post('/login',async(req, res) => {
    const user = await User.findOne({email: req.body.email})
    if (!user) return res.status(401).json({error: 'Invalid Credentials'})
    const passwordCorrect = await bcrypt.compare(req.body.password, user.password)
    if (!passwordCorrect) return res.status(401).json({error: 'Invalid Credentials'})
    const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET
    )
    res.json({token, email: user.email})
})
module.exports = router
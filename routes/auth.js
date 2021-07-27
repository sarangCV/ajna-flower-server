const router = require('express').Router();
const User = require('../model/User');
const {registerValidation, loginValidation} = require('../validation/validation');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register route
router.post('/register', async (req, res) => {
    // Validate before creation
    const { error } = registerValidation(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    // Check if the user already in the database
    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist) return res.status(400).send('Email already exists');

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    try {
        const savedUser = await user.save()
        res.send({user: user._id});
    } catch (error) {
        res.status(400).send(error)
    }
});

// Login route
router.post('/login', async (req, res) => { 

    // console.log(req.body,"login data")

     // Validate before login
     const { error } = loginValidation(req.body);
     if(error) return res.status(400).json(error.details[0].message);

     // Check if the user already in the database
     const user = await User.findOne({email: req.body.email});
     if(!user) return res.status(400).json('Email or password is wrong..!');

    //  Password is correct 
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if(!validPass) return res.status(400).json('Invalid password');

    // Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_KEY)
    res.header('auth-token', token).send({token: token})   
})

module.exports = router;
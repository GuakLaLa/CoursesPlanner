const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../models/user');

async function signUpUser(req, res){
    try{
        const {
            username,
            email,
            password,
            role
        } = req.body;

        // Check if user already existing
        const existingUser = await Users.findOne({ email });
        if(existingUser){
            return res.redirect('/CoursesPlanner/SignUp?error=exists');
        }

        //Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Create new user
        const newUser = new Users({
            username, 
            email,
            password: hashedPassword,
            role
        });
        await newUser.save();

        res.status(201).json({message: "User registered successfully", userId: newUser._id});

    }catch(error){
        console.log(error);
        res.status(500).send("Server error");
    }
}

async function loginUser(req, res){
    try{
        const {
            email, 
            password
        } = req.body;
        //Check if user exists
        const user = await Users.findOne({ email});
        if(!user)
            return res.status(400).send("Invalid credentials");

        //Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch)
            return res.status(400).send("Invalid credentials");

        const token = jwt.sign({
            userId: user._id,
            role: user.role
        }, process.env.JWT_SECRET,
        { expiresIn: '1h'});

        res.cookie('token', token, { httpOnly: true });

        res.json({token});

    }catch(error){
        res.status(500).send("Server error");
    }
}

async function logoutUser(req, res){

    req.session.destroy((err) => {
        if(err){
            console.log(error);
            return res.status(500).send("Logout failed");
        }
        res.clearCookie("connect.sid");
        res.redirect("/CoursesPlanner/Login");
    })
};

module.exports = { signUpUser, loginUser, logoutUser };
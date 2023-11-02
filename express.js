const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const { connectMongo, User } = require("./mongo.js");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const generateToken = require("./src/pages/generateToken.js");


connectMongo()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())
app.use(
    cors({
      origin: "http://localhost:5001", // Allow requests from any origin
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true, // If your API uses cookies or sessions
    })
  );  
  

app.get('/api/users', async (req, res) => {
    const data = await User.find()
    if(data){
        res.status(200).json(data)
    }else{
        res.status(404).json({message: 'there is no users'})
    }
})

app.post('/api/register', async (req, res) => {
    const {name, email, password} = req.body
    const hashedPass = await bcrypt.hash(password, 10)

    const newUser = await User.create({
        name, 
        email, 
        password: hashedPass,
    })

    if(newUser){
        res.status(201).json({message: 'new user added'})
    }
})

app.post('/api/login', async (req, res) => {
    const {email, password} = req.body
    const user = await User.findOne({email})
    console.log('user founded')

    if(user){
        const matchedPassword = await bcrypt.compare(password, user.password)
        if(matchedPassword){
            generateToken(res, user._id)
            res.status(200).json({message: 'login successfuly'})
        }else{
            res.status(401).json({message: 'password is incorrect'})
        }
    }else {
        res.status(404).json({message: 'user not found'})
    }
})

app.post('/api/logout', async (req, res) => {
    res.cookie('jwt', '', {
        httponly: true,
        expires: new Date(0)
    })

    res.status(200).json({message: 'user logged out'})  
})


app.listen(process.env.PORT || 5000, console.log('port connected'))
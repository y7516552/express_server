require('dotenv').config()


const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser')

//mongoose
const mongoose = require('mongoose')
mongoose.connect( process.env.DATABASE_URL )
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))


//MiddleWares
app.use(bodyParser.json())
app.use(express.json())


//Routes
const postRouter = require('./routes/post')
const userRouter = require('./routes/user')
app.use('/posts',postRouter)
app.use('/user',userRouter)


//jwt
const jwt = require('jsonwebtoken')
const secretKey = process.env.ACCESS_TOKEN_SECRET

app.set('view engine', 'ejs')

app.get('/', (req, res) => res.send('Hello World!'));


app.get('/login', (req, res) => {
    res.send('login page')
})

app.post('/login', (req, res) => {
    const userInfo = {
        Username: req.body.Username
    }
    const token = jwt.sign(userInfo, secretKey, { expiresIn: '30s' })
    res.status(200).send({
        message: "login success!",
        token
    })
})

app.get('/admin', authenticateToken, (req, res) => {
    res.status(200).send({
        message: "get userInfo success!!",
        data: req.user
    })
})


function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.status(401)
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}





app.listen(port, () => console.log(`Example app listening on port ${port}!`));
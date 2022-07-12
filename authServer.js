require('dotenv').config()


const express = require('express');
const app = express();
const port = 4000;
const bodyParser = require('body-parser')


//MiddleWares
app.use(bodyParser.json())
app.use(express.json())


//jwt
const jwt = require('jsonwebtoken')
const secretKey = process.env.ACCESS_TOKEN_SECRET

let refreshTokens = []

app.post('/token', (req, res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.sendStatus(401)
    if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403)
        const accessToken = generateAccessToken({Username: user.name})
        res.json({ accessToken: accessToken })
    })
})

app.delete('/logout',(req, res) => {
    refreshTokens = refreshTokens.filter(token => token !== req.body.token )
    res.status(204).send('logout success!!')
})

app.post('/login', (req, res) => {
    const userInfo = {
        Username: req.body.Username
    }
    const accessToken = generateAccessToken(userInfo)
    const refreshToken = jwt.sign(userInfo, process.env.REFRESH_TOKEN_SECRET)

    refreshTokens.push(refreshToken)
    console.log(refreshTokens);
    res.status(200).send({
        message: "login success!",
        accessToken,
        refreshToken
    })
})


function generateAccessToken(user) {
    return jwt.sign( user, secretKey, { expiresIn: '30m' })
} 


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
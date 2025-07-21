const express = require('express')
const mongoose = require('mongoose')

const UserModel = require("./models/User")

const app = express()
const port = 3000
const mongoUrl = "mongodb+srv://Admin:admin@mern-demo.fskgnju.mongodb.net/mernDemo"
app.use(express.json())

mongoose.connect(mongoUrl, {})


app.get('/', async (req, res) => {
    const user = new UserModel({
        username: "testuser",
        password: "password"
    })

    try {
        await user.save()
        res.status(200).send("Create testuser")
    } catch (error) {
        console.error(error)
        res.status(500).send("Failed")
    }
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
const express = require('express')
const mongoose = require('mongoose')

const UserModel = require("./models/User")

const app = express()
const port = 3000
const mongoUrl = "mongodb+srv://Admin:admin@mern-demo.fskgnju.mongodb.net/mernDemo"
app.use(express.json())

mongoose.connect(mongoUrl, {})


app.get('/', async (req, res) => {
    res.status(200).send("Connected to server")
})

// Register
app.post('/api/register', async (req, res) => {
  try {
    const user = new UserModel(req.body);
    await user.save();
    res.json({ message: 'Created new user' });
  } catch (error) {
    res.status(400).json({ error: `Unable to create new user: ${error}` });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const user = await UserModel.findOne({ username: req.body.username });
  if (!user || !(await user.comparePassword(req.body.password))) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  return res.status(200).json({ message: 'Login successful' });
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
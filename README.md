REST API with Node.js and Mongoose
This project is a guided checkpoint where you'll create a REST API using Node.js, Express, and Mongoose to manipulate a MongoDB database. The instructions below will walk you through the setup and implementation of the API.

Objectives
Set up a Node.js project with Express and Mongoose.
Create a REST API with CRUD operations to manage user data.
Test the API using Postman.
Prerequisites
Node.js and npm installed.
Basic understanding of JavaScript, Node.js, and MongoDB.
MongoDB installed locally or an account on MongoDB Atlas for a cloud database.
Instructions
1. Initialize Node.js Project
Start a new Node.js project:
bash
Copy code
npm init -y
2. Install Dependencies
Install the necessary packages:
bash
Copy code
npm install express mongoose dotenv
3. Configure Environment Variables
Create a .env file in the config/ directory to store environment variables like your database connection string.

Example .env file:

bash
Copy code
PORT=3000
MONGO_URI=mongodb://localhost:27017/yourdbname
4. Set Up the Server
Create a server.js file at the root of your project.

In server.js, configure your Express server to listen on the specified port and connect to your MongoDB database using Mongoose.

Example server.js setup:

javascript
Copy code
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(err));

app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
5. Create Models Folder and User Schema
Create a models/ directory.

Inside models/, create a User.js file.

Define a Mongoose schema for User and export the model.

Example User.js:

javascript
Copy code
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('User', UserSchema);
6. Implement CRUD Routes in server.js
In server.js, create the following routes using Express and Mongoose:

GET: Return all users.
POST: Add a new user to the database.
PUT: Edit a user by ID.
DELETE: Remove a user by ID.
Example CRUD routes:

javascript
Copy code
const User = require('./models/User');

// GET: Return all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST: Add a new user to the database
app.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT: Edit a user by ID
app.put('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE: Remove a user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
7. Test Your API with Postman
Use Postman to test each route:
GET /users - Retrieve all users.
POST /users - Create a new user by providing JSON data.
PUT /users/:id - Update a user by ID with JSON data.
DELETE /users/:id - Delete a user by ID.
Folder Structure
arduino
Copy code
config/
  └── .env
models/
  └── User.js
server.js
Notes
Ensure your code is well-commented before submitting it.
Handle errors appropriately and return meaningful responses.
The .env file should not be committed to your version control (use a .gitignore file).
License
This project is licensed under the MIT License - see the LICENSE file for details.


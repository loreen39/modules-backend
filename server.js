const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const cors = require('cors');
const jwt = require('jsonwebtoken');
const secretKey = 'loreenbaker392002'; 

// Cors configuration - Allows requests from localhost:4200
const corsOptions = {
    origin: "http://localhost:4200",
    optionsSuccessStatus: 204,
    methods: "GET, POST, PUT, DELETE",
};
  
// Use cors middleware
app.use(cors(corsOptions));

// Use body-parser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// Simple in-memory database for users
const users = [
  {
    id: 1,
    username: 'user1',
    password: 'password1'
  },
  {
    id: 2,
    username: 'user2',
    password: 'password2'
  }
];

// Login function
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Log incoming request for debugging
  console.log('Incoming request:', req.body);

  // Find the user by username
  const user = users.find(u => u.username === username);
  console.log("found:" ,user);

  if (user) {
    // Check if the password is correct
    if (user.password === password) {
      // Generate a token
      const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '1h' });
      console.log(token);

      res.status(200).send({result:true, data: { message: 'Login successful', token } });
    } else {
      res.status(401).send({result:false, message: 'Invalid password' });
    }
  } else {
    res.status(404).send({result:false, message: 'User not found' });
    console.log("user not found");
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});

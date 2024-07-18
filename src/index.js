const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

//we are making api req from server side not from client side, to avoid cors policy applied by browser to protect client form accesessing the 
//malicious resourse

app.get('/api/search', async (req, res) => {
  const query = req.query.q;
  try {
    console.log("in the backend, about to make req")
    const response = await axios.get(`http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${query}`);
    const json=await response.data
    console.log(json);
    res.status(200).json(json);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});

/*
Notes-->

Browser-Side vs. Server-Side Requests
1. Browser-Side Requests: 
When your frontend code (running in the browser) tries to make an AJAX request to a different domain, 
the browser enforces CORS. If the server (the different domain) does not allow your domain to access its resources, the browser 
blocks the request and raises a CORS error.

2. Server-Side Requests: 
When your backend server (running on your domain) makes a request to another server (e.g., Google’s API), 
the browser's CORS policy does not apply. The backend server can freely communicate with any external server. 
The response from the external server is then sent back to your frontend by your backend server, and since this communication
happens within the same origin (your domain), CORS is not an issue.

*/
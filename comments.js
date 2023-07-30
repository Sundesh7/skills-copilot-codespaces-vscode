// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 4001;
const commentsByPostId = {};

app.use(bodyParser.json());
app.use(cors());

// GET request to /posts/:id/comments
app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

// POST request to /posts/:id/comments
app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    // Check if we have an array of comments for this post
    const comments = commentsByPostId[req.params.id] || [];
    // Add new comment to the array
    comments.push({ id: commentId, content });
    // Add the new array to the object
    commentsByPostId[req.params.id] = comments;
    // Send back the new comment
    res.status(201).send(comments);
});

// Listen to port
app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
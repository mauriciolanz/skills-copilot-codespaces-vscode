// Create web server
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const port = 3000;

// Set up the app to use the body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Handle GET requests
app.get('/comments', (req, res) => {
    fs.readFile('./comments.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const comments = JSON.parse(data);
            res.json(comments);
        }
    });
});

// Handle POST requests
app.post('/comments', (req, res) => {
    const newComment = req.body;
    fs.readFile('./comments.json', 'utf8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const comments = JSON.parse(data);
            comments.push(newComment);
            fs.writeFile('./comments.json', JSON.stringify(comments), (err) => {
                if (err) {
                    console.log(err);
                } else {
                    res.send('Comment added');
                }
            })
        }
    }
    )
}
);
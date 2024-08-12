const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path'); // Import the path module

mongoose.connect('mongodb://localhost:27017/Money_Tracker/Money_Tracker', { useNewUrlParser: true, useUnifiedTopology: true });

var db = mongoose.connection;
db.on('error', () => {
    console.log('MongoDB Connection Error');
});
db.once('open', () => {
    console.log('MongoDB Connection Success');
});

app.use(express.json()); // Middleware to parse JSON bodies

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Root route to handle GET requests to the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    })


app.post('/add', (req, res) => {
    var category = req.body.category; // Corrected typo
    var amount_input = req.body.amount_input;
    var info = req.body.info;
    var date_input = req.body.date_input;
    var data = {
        "category": category,
        "amount_input": amount_input,
        "info": info,
        "date_input": date_input
    };
    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            res.status(500).send('Error inserting record');
            throw err;
        }
        console.log("Record inserted successfully");
        res.status(200).send('Record inserted successfully');
    });
});

// Ensure the server is listening on a port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
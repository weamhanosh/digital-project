const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const editor = require('./routes/api/editor');
const files = require('./routes/api/files');

const app = express();

app.use(cors())

//body parser for json. must be done before API routes
app.use(bodyParser.json({ limit: '10mb' }));

const db = require('./config/keys').mongoURI;

mongoose
    .connect(db, {
        useUnifiedTopology: true,
        useNewUrlParser: true})
    .then(() => console.log('connected to database!'))
    .catch(err => console.log(err));

app.use('/api', editor)
app.use('/api', files)

// Serve static assets if in production
if(process.env.NODE_ENV === 'production'){
    // Set static folder
    app.use(express.static('digital-project-front-end/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'digital-project-front-end', 'build', 'index.html'));
    });
}

const port = process.env.PORT || 8000;

app.listen(port,
    () => console.log(`Listening on port ${port}!`));



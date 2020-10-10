const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
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

app.use('/api/upload', editor)
app.use('/api/uploadFiles', files)

const port = process.env.PORT || 8000;

app.listen(port,
    () => console.log(`Listening on port ${port}!`));

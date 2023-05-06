const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const routes = require('./routes');
const app = express();
require('dotenv').config();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://127.0.0.1:27017/shopping-app', {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB")).catch(console.error);

app.use('/', routes);
app.listen(3001);
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/taskMockRoutes');
const { parseDateMiddleware, formatResponseDateMiddleware } = require('./middleware/dateMiddleware');

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(parseDateMiddleware);
app.use(formatResponseDateMiddleware);

app.use('/api/v1/tasks', taskRoutes);

module.exports = app;


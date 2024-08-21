const dotenv = require('dotenv');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
const bodyParser = require('body-parser');
const UserRoutes = require('./routes/userRoutes');
const DocumentRoutes = require('./routes/fileUploadRoutes');
const Registration = require('./routes/registerRoutes');

dotenv.config();

app.use(cookieParser());
const corsOptions = {
    origin: 'https://students-project.netlify.app', // Replace with your frontend URL
    credentials: true
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(process.env.DB_URL)
    .then(() => console.log('MongoDB Connected'))
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

// Define routes
app.use('/rural_rise', UserRoutes);
app.use('/rural_rise', DocumentRoutes);
app.use('/rural_rise', Registration);

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

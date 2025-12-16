const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const remixRoutes = require('./routes/remixRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes'); // <--- IMPORT

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/remix', remixRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes); // <--- USE

app.get('/', (req, res) => res.send('Remixr API running'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
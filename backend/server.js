import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';
import connectDB from './config/db.js';

import categoriesRoutes from './routes/categoriesRoutes.js';
import locationsRoutes from './routes/locationsRoutes.js';

dotenv.config();

connectDB();

const app = express();

app.use('/api/categories', categoriesRoutes);

app.use('/api/locations', locationsRoutes);

const __dirname = path.resolve();

if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'frontend/build')))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
import categories from './data/categories.js';
import locations from './data/locations.js';
import Category from './models/categoryModel.js';
import Location from './models/locationModel.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Category.deleteMany();
    await Location.deleteMany();

    await Category.insertMany(categories);
    await Location.insertMany(locations);

    console.log('Data Imported!'.green.inverse);

    process.exit();

  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
}

const destroyData = async () => {
  try {
    await Category.deleteMany();
    await Location.deleteMany();

    console.log('Data Destroyed!'.red.inverse);

    process.exit();

  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
}

if(process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
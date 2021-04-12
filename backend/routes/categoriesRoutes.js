import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import Category from '../models/categoryModel.js';
import Location from '../models/locationModel.js';

const toCamelCase = (string) => {
  return string.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}

// @desc Fetch all categories
// @route GET '/api/categories'
// @access Public
router.get('/', asyncHandler(async (req, res) => {
  const categories = await Category.find({})

  res.json(categories);
}))

// @desc Fetch all locations of a single category
// @route GET '/api/categories/:name'
// @access Public
router.get('/:name', asyncHandler(async (req, res) => {
  const categoryName = toCamelCase(req.params.name);
  const locations = await Location.find({ category: categoryName });

  if(locations){
    res.json(locations);
  } else {
    res.status(404).json({message: 'There are no locations found in this category'});
  }
}))

// @desc Edit a single category
// @route PUT '/api/categories/:name/edit'
// @access Public
router.put('/:name/:newName/edit', asyncHandler(async (req, res) => {
  await Category.findOneAndUpdate({ name: toCamelCase(req.params.name) }, { name: toCamelCase(req.params.newName) }, {
    new: true
  });
}))

  // @desc Delete a single category
// @route PUT '/api/categories/:name/delete'
// @access Public
router.put('/:name/delete', asyncHandler(async (req, res) => {
  await Category.deleteOne({ name: toCamelCase(req.params.name) });
}))

// @desc Add a single category
// @route POST '/api/categories/:name/delete'
// @access Public
router.post('/:name/add', asyncHandler(async (req, res) => {
  const categoryToAdd = { name: toCamelCase(req.params.name) };
  await Category.create( categoryToAdd );
}))


export default router
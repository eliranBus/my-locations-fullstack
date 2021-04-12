import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import Location from '../models/locationModel.js';

const toCamelCase = (string) => {
  return string.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}

// @desc Fetch all locations
// @route GET '/api/locations'
// @access Public
router.get('/', asyncHandler(async (req, res) => {
  const locations = await Location.find({})

  res.json(locations);
}))

// @desc Fetch data of a single location
// @route GET '/api/locations/:name'
// @access Public
router.get('/:name', asyncHandler(async (req, res) => {
  const locationName = toCamelCase(req.params.name);

  const location = await Location.find({ name: locationName });

  if(location){
    res.json(location);
  } else {
    res.status(404).json({message: 'There is no data found for this location'});
  }
}))

// @desc Edit a single location
// @route PUT '/api/locations/:name/edit'
// @access Public
router.put('/:name/:newName/:newAddress/:newCoordinates/:newCategory/edit', asyncHandler(async (req, res) => {
  await Location.findOneAndUpdate({ name: toCamelCase(req.params.name) }, 
    { 
      name: toCamelCase(req.params.newName), 
      address: toCamelCase(req.params.newAddress), 
      coordinates: req.params.newCoordinates, 
      category: toCamelCase(req.params.newCategory)
    }, {
    new: true
  });
}))

// @desc Delete a single location
// @route PUT '/api/locations/:name/delete'
// @access Public
router.put('/:name/delete', asyncHandler(async (req, res) => {
  await Location.deleteOne({ name: toCamelCase(req.params.name) });
}))

// @desc Add a single location
// @route POST '/api/locations/:name/delete'
// @access Public
router.post('/:name/:address/:coordinates/:category/add', asyncHandler(async (req, res) => {
  const locationToAdd = 
  { 
    name: toCamelCase(req.params.name), 
    address: toCamelCase(req.params.address), 
    coordinates: req.params.coordinates, 
    category: toCamelCase(req.params.category)
  };
  await Location.create( locationToAdd );
}))


export default router
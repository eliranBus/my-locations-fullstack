import { ADD_TO_LOCATIONS, REMOVE_FROM_LOCATIONS } from '../types/locationsConstants';
import axios from 'axios';


export const addLocation = (result) => ({
  type: ADD_TO_LOCATIONS,
  result,
});

export const removeLocation = (result) => ({
  type: REMOVE_FROM_LOCATIONS,
  result,
});


export const fetchLocations = async (dispatch) => {
  let locations;
  const { data } = await axios.get('/api/locations');
  locations = data;
  dispatch(addLocation(locations));
}



 
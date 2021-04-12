import { ADD_TO_CATEGORIES, REMOVE_FROM_CATEGORIES } from '../types/categoriesConstants';
import axios from 'axios';


export const addCategory = (result) => ({
  type: ADD_TO_CATEGORIES,
  result,
});

export const removeCategory = (result) => ({
  type: REMOVE_FROM_CATEGORIES,
  result,
});


export const fetchCategories = async (dispatch) => {
  let categories;
  const { data } = await axios.get('/api/categories');
  categories = data;
  dispatch(addCategory(categories));
}



 
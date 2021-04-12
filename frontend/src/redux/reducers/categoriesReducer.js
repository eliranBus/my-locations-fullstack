import { ADD_TO_CATEGORIES, REMOVE_FROM_CATEGORIES } from '../types/categoriesConstants';

const initialState = {
  categories: [],
};

export default function categoriesReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CATEGORIES: {
      return { ...state, categories: action.result };
    }

    case REMOVE_FROM_CATEGORIES: {
      return { ...state, categories: action.result };
    }

    default:
      return state;
  }
}

import { ADD_TO_LOCATIONS, REMOVE_FROM_LOCATIONS } from '../types/locationsConstants';

const initialState = {
  locations: [],
};

export default function locationsReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_LOCATIONS: {
      return { ...state, locations: action.result };
    }

    case REMOVE_FROM_LOCATIONS: {
      return { ...state, locations: action.result };
    }

    default:
      return state;
  }
}

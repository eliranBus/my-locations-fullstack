import { CHANGE_TITLE } from '../types/titleConstants';

export default function titleReducer(state = {title: "Categories"}, action) {
  switch (action.type) {
    case CHANGE_TITLE: {
      return { ...state, title: action.title };
    }

    default:
      return state;
  }
}
import { CHANGE_INDEX } from '../types/indexConstants';

export default function indexReducer(state = {index: undefined}, action) {
  switch (action.type) {
    case CHANGE_INDEX: {
      return { ...state, index: action.index };
    }

    default:
      return state;
  }
}
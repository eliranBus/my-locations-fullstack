import { TOGGLE_LOADER } from '../types/loaderConstants';

export default function loaderReducer(state = {loader: false}, action) {
  switch (action.type) {
    case TOGGLE_LOADER: {
      return { ...state, loader: state.loader === false ? true : false };
    }

    default:
      return state;
  }
}
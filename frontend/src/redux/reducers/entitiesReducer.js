import { TOGGLE_ENTITY } from '../types/entitiesConstants';
import { ENTITY_LOCAL_STORAGE } from '../../config';

function getLocalStorageEntity() {
  const localStorageEntity = localStorage.getItem(ENTITY_LOCAL_STORAGE);
  return localStorageEntity ? JSON.parse(localStorageEntity) : "categories";
}

export default function entitiesReducer(state = {entity: getLocalStorageEntity()}, action) {
  switch (action.type) {
    case TOGGLE_ENTITY: {
      return { ...state, entity: action.entity };
    }

    default:
      return state;
  }
}
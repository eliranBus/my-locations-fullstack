import { TOGGLE_ENTITY } from '../types/entitiesConstants';
import { ENTITY_LOCAL_STORAGE } from '../../config';

export function toggleEntity(entity) {
  return {
    type: TOGGLE_ENTITY,
    entity
  };
}

function saveLocalStorageEntity(entity) {
  localStorage.setItem(ENTITY_LOCAL_STORAGE, JSON.stringify(entity));
}

export function changeEntity(entity, dispatch){
  saveLocalStorageEntity(entity);
  dispatch(toggleEntity(entity));
}
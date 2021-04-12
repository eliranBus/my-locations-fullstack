import { combineReducers } from 'redux';
import themeReducer from './themeReducer';
import indexReducer from './indexReducer';
import categoriesReducer from './categoriesReducer';
import locationsReducer from './locationsReducer';
import entitiesReducer from './entitiesReducer';
import loaderReducer from './loaderReducer';
import titleReducer from './titleReducer';

const reducer = combineReducers({
  theme: themeReducer,
  index: indexReducer,
  categories: categoriesReducer,
  locations: locationsReducer,
  entity: entitiesReducer,
  loader: loaderReducer,
  title: titleReducer,
});

export default reducer;

import React, {useEffect, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import changeIndex from '../redux/actions/indexActions';
import toggleLoader from '../redux/actions/loaderActions';
import {List, ListItem, ListItemIcon, ListItemText, Divider } from '@material-ui/core';
import { useStyles } from '../assets/styles/entitiesStyles'; 
import RoomIcon from '@material-ui/icons/Room';
import Loader from './Loader';
import LocationsTable from './LocationsTable';

function Entities() {
  const classes = useStyles();
  const entity = useSelector((state) => state.entity.entity);
  const index = useSelector((state) => state.index.index);
  const categories = useSelector((state) => state.categories.categories);
  const loader = useSelector((state) => state.loader.loader);
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(toggleLoader());
    setTimeout(() => {
      dispatch(toggleLoader());
    }, 1000)
  }, [dispatch])

  const handleListItemClick = useCallback((newIndex) => {
    newIndex === index ? 
    dispatch(changeIndex(undefined)) : 
    dispatch(changeIndex(newIndex))
  }, [dispatch, index]);
  
  return (
      
      <div className="entities-container">
      {loader ?
        <Loader/>
      :
        <div className={classes.root}>
          {entity === "categories" && (
            <List className={classes.categories} component="nav" aria-label="entities" style={{maxHeight: '60vh', overflow: 'auto'}}>
              {
              categories && categories.length > 0 ?
              categories.map(category => (
                <div key={categories.indexOf(category)}>
                  <ListItem
                    button
                    selected={index === categories.indexOf(category)}
                    onClick={() => handleListItemClick(categories.indexOf(category))}
                  >
                    <ListItemIcon>
                      <RoomIcon />
                    </ListItemIcon>
                    <ListItemText primary={category.name} />
                  </ListItem>
                  <Divider />
                </div>
                ))
              :
              <h3><b>There are no categories available</b></h3>
              }
            </List>
          )}
          {entity === "locations" && (
            <div className={classes.locations}>
              <LocationsTable />
            </div>
          )}
        </div>
      }
      </div>
  );
}

export default React.memo(Entities);
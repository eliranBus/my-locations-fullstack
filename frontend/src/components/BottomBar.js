import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { changeEntity } from '../redux/actions/entitiesActions';
import { useStyles } from '../assets/styles/bottomBarStyles';
import { AppBar, CssBaseline, Toolbar, Tabs, Tab } from '@material-ui/core';
import changeIndex from '../redux/actions/indexActions';

export default function BottomBar() {
  const classes = useStyles();
  const entity = useSelector((state) => state.entity.entity);
  const [value, setValue] = useState(entity === "categories" ? 0 : 1);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e, newValue) => {
    setValue(newValue);
    // eslint-disable-next-line no-mixed-operators
    if(window.location.href.indexOf("/categories") > -1 || window.location.href.indexOf("/locations")){
      history.push('/');
    } 
  };

  function entityToggle(newEntity){
    newEntity !== entity && changeEntity(newEntity, dispatch);
    dispatch(changeIndex(undefined));
  }

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <Toolbar>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="secondary"
              textColor="inherit"
              centered
              style={{width: "100%"}}
            >
              <Tab label="Categories" data-tab="categories" style={{width: "50%", margin: "0 3em"}} onClick={() => entityToggle("categories")}/>
              <Tab label="Locations" data-tab="locations" style={{width: "50%", margin: "0 3em"}} onClick={() => entityToggle("locations")}/>
            </Tabs>
            <span className="tab-devider"></span>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

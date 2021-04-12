import React, { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import changeTitle from '../redux/actions/titleActions';
import Toggle from './Toggle';
import swal from 'sweetalert';
import Swal from 'sweetalert2'
import { AppBar, Toolbar, Typography, Button, IconButton } from '@material-ui/core';
import RoomIcon from '@material-ui/icons/Room';
import { useStyles } from '../assets/styles/headerStyles';
import {toCamelCase} from '../App';


export default function Header() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const entity = useSelector((state) => state.entity.entity);
  const index = useSelector((state) => state.index.index);
  const categories = useSelector((state) => state.categories.categories);
  const locations = useSelector((state) => state.locations.locations);
  const title = useSelector((state) => state.title.title);
  const adjustedTitle = entity === "categories" ? 'category' : 'location';
  const url = window.location.href;

  useEffect(() => {
  entity === "categories" ? 
  dispatch(changeTitle("Categories")) :
  dispatch(changeTitle("Locations"));
}, [dispatch, entity])

  const addNewEntity = () => {
    dispatch(changeTitle("Add a " + toCamelCase(adjustedTitle)));
    history.push('/add-' + adjustedTitle);
  }
  
  const showEntity = () => {
    if(entity === "categories"){
      history.push(`/categories/${categories[index].name.toLowerCase()}`);
      dispatch(changeTitle(`${categories[index].name} category`));
    } else {
      history.push(`/locations/${locations[index].name.toLowerCase()}`);
      dispatch(changeTitle(`${locations[index].name} location`));
    }
  }

  const editCategory = () => {
    let exists = false;
    let categoryToRemove = categories[index].name;
    let newCategory = {};
    dispatch(changeTitle("Edit a Category"));
    swal("Edit the category's name to your desire:", {
      content: "input",
    })
    .then((value) => {
      if (!value || value === null || value === undefined){
        swal({title: 'Please type a valid category name', icon: "warning"});
        dispatch(changeTitle("Categories"));
      } else {
          for(let i = 0; i < categories.length; i++){
            if (categories[i].name === toCamelCase(value)) {
              exists = true;
              swal({title: `Category name already exists`, icon: "info"});
              dispatch(changeTitle("Categories"));
          } 
        }
      }
      if (exists === false && value && value !== null && value !== undefined && value.length > 0) {
        newCategory = toCamelCase(value);
        swal("Category name successfully changed to:", newCategory, "success");
        axios.put(`/api/categories/${categoryToRemove}/${newCategory}/edit`);
        setTimeout(() => {
          window.location.assign("/");
        }, 2000);
      } 
    });
  }

  const editLocation = () => {
    let exists = false;
    let locationToRemove = locations[index].name;
    let name;
    let address;
    let coordinates;
    let category;

    dispatch(changeTitle("Edit a Location"));
    Swal.mixin({
      input: 'text',
      confirmButtonText: 'Next &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2', '3', '4']
    }).queue([
      {
        text: 'Name:',
        preConfirm: function(value)
          {
              return new Promise(function(resolve, reject)
              {
                  if (value) {
                    name = value;
                    for(let i = 0; i < locations.length; i++){
                      if (locations[i].name === toCamelCase(name)) {
                        swal({title: `Category name already exists`, icon: "info"});
                        dispatch(changeTitle("Locations"));
                        setTimeout(() => {
                          window.location.assign("/");
                        }, 1500);
                      } else {
                        resolve();
                      }
                    }
                  } else {
                    Swal.fire({
                      icon: 'warning',
                      title: 'All inputs are required! Please try again',
                      confirmButtonText: 'OK'
                    })
                  }
              });
          }
      },
      {
        text: 'Address:',
        preConfirm: function(value)
          {
              return new Promise(function(resolve, reject)
              {
                  if (value) {
                      address = value;
                      resolve();
                  } else {
                    Swal.fire({
                      icon: 'warning',
                      title: 'All inputs are required! Please try again',
                      confirmButtonText: 'OK'
                    })
                  }
              });
          }
      },
      {
        text: 'Coordinates:',
        preConfirm: function(value)
          {
              return new Promise(function(resolve, reject)
              {
                  if (value && /^([-+]?)([\d]{1,2})(((\.)(\d+)(,)))(\s*)(([-+]?)([\d]{1,3})((\.)(\d+))?)$/.test(value)) {
                      coordinates = value;
                      resolve();
                  } else if (!value) {
                    Swal.fire({
                      icon: 'warning',
                      title: 'All inputs are required! Please try again',
                      confirmButtonText: 'OK'
                    })
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: 'Input must match coordination formation (i.e "32.12345, 31.56789") Please try again',
                      confirmButtonText: 'OK'
                    })
                  }
              });
          }
      },
      {
        input: 'select',
        text: 'Category:',
        inputOptions: categories.map(category => (category.name)),
        inputPlaceholder: 'Select a category',
        preConfirm: function(value)
          {
              return new Promise(function(resolve, reject)
              {
                  if (value) {
                      let newValue = categories[value].name;
                      category = newValue;
                      resolve();
                  } else {
                    Swal.fire({
                      icon: 'warning',
                      title: 'All inputs are required! Please try again',
                      confirmButtonText: 'OK'
                    })
                  }
              });
          }
      },
    ]).then((result) => {
      if (result.value) {
        if (exists === false) {
          Swal.fire({
            width: 800,
            icon: 'success',
            title: 'All done!',
            html: `${toCamelCase(name)} location's data successfuly changed`,
            confirmButtonText: 'Lovely!'
          })
          axios.put(`/api/locations/${locationToRemove}/${name}/${address}/${coordinates}/${category}/edit`);
          setTimeout(() => {
            window.location.assign("/");
          }, 1500);
        } 
      } 
    })
  }

  const deleteCategory = () => {
    let categoryToRemove = categories[index].name;
    dispatch(changeTitle("Delete a Category"));
    swal({
      title: "Are you sure you want to delete this category?",
      text: "Once deleted, you will not be able to recover!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal(`Poof! Category "${categoryToRemove}" has been deleted!`, {
          icon: "success",
        });
        axios.put(`/api/categories/${categoryToRemove}/delete`);
        setTimeout(() => {
          window.location.assign("/");
        }, 1500);
      } else {
        swal("Your category is safe!");
        dispatch(changeTitle("Categories"));
      }
    });
  }

  const deleteLocation = () => {
    let locationToRemove = locations[index].name;
    dispatch(changeTitle("Delete a Location"));
    swal({
      title: "Are you sure you want to delete this location?",
      text: "Once deleted, you will not be able to recover!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal(`Poof! Location "${locationToRemove}" has been deleted!`, {
          icon: "success",
        });
        axios.put(`/api/locations/${locationToRemove}/delete`);
        setTimeout(() => {
          window.location.assign("/");
        }, 1500);
      } else {
        swal("Your location is safe!");
        dispatch(changeTitle("Locations"));
      }
    });
  }

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="MyLocations" onClick={() => window.location.assign("/")}>
            <RoomIcon />&nbsp;MyLocations
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            {title}
          </Typography>
          {
            index === undefined && (
              <Button color="inherit" onClick={addNewEntity}>New {entity === "categories" ? "category" : "location"} <RoomIcon /></Button>  
            )
          }
          {
            index !== undefined && (url.includes("/categories") || url.includes("/locations")) && (
              <div className="buttons">
                <Button color="inherit" onClick={entity === "categories" ? editCategory : editLocation}>Edit &#9998;</Button>
                <Button color="inherit" onClick={entity === "categories" ? deleteCategory : deleteLocation}>Delete &#128465;</Button>
              </div>
            )
          }
          {
            index !== undefined && !url.includes("/categories") && !url.includes("/locations") && (
              <div className="buttons">
                <Button color="inherit" onClick={showEntity}>View &#128065;</Button>
                <Button color="inherit" onClick={entity === "categories" ? editCategory: editLocation}>Edit &#9998;</Button>
                <Button color="inherit" onClick={entity === "categories" ? deleteCategory : deleteLocation}>Delete &#128465;</Button> 
              </div>
            )
          }
          <Toggle />
        </Toolbar>
      </AppBar>
    </div>
  );
}

import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import BackBtn from './BackBtn';
import { toCamelCase } from '../App';
import swal from 'sweetalert';

export default function AddEntity() {
  const [catToAdd, setCatToAdd] = useState("");
  const [locName, setLocName] = useState("");
  const [locAdd, setLocAdd] = useState("");
  const [locCoor, setLocCoor] = useState("");
  const [locCat, setLocCat] = useState("");
  const categories = useSelector((state) => state.categories.categories);
  const locations = useSelector((state) => state.locations.locations);
  const entity = useSelector((state) => state.entity.entity);
  const input = useRef();

  useEffect(() => {
    input.current.focus();
  }, [])
  
  const addToCategories = (e) => {
    e.preventDefault();
    const newCat = toCamelCase(catToAdd);
    setCatToAdd("");
    let exists = false;
    if (!catToAdd || catToAdd === null || catToAdd === undefined){
      swal(`Please type a valid category name`, {icon: "warning"});
      input.current.focus();
    } else {
      for(let i = 0; i < categories.length; i++){
        if (categories[i].name === newCat) {
          exists = true;
          swal(`Category "${newCat}" already exists`, {icon: "info"});
          input.current.focus();
        } 
      }
    }
    if (exists === false && catToAdd && catToAdd !== null && catToAdd !== undefined && catToAdd.length > 0) {
      swal(`Category "${newCat}" successfully added`, {icon: "success"});
      axios.post(`/api/categories/${catToAdd}/add`);
      setTimeout(() => {
        window.location.assign("/");
      }, 2000);
    } 
  }

  const addToLocations = (e) => {
    e.preventDefault();
    const newLoc = toCamelCase(locName);
    let exists = false;
    if (!locName || !locAdd || !locCoor || !locCat){
      swal(`All inputs are required. Please try again`, {icon: "warning"});
      input.current.focus();
    } else {
      for(let i = 0; i < locations.length; i++){
        if (locations[i].name === newLoc) {
          exists = true;
          swal(`Location already exists`, {icon: "info"});
          input.current.focus();
        } 
      }
    }
    if (exists === false && locName && locAdd && locCoor && locCat) {
        if(!/^([-+]?)([\d]{1,2})(((\.)(\d+)(,)))(\s*)(([-+]?)([\d]{1,3})((\.)(\d+))?)$/.test(locCoor)){
          swal('Coordination must match formation i.e - "32.12345, 31.56789". Please try again', {icon: "info"});
        } else {
        swal(`Location "${newLoc}" successfully added`, {icon: "success"});
        axios.post(`/api/locations/${locName}/${locAdd}/${locCoor}/${locCat}/add`);
        setTimeout(() => {
          window.location.assign("/");
        }, 2000);
      } 
    }
  }

  return (
    <div className="form-container">

      {entity === "categories" && (
        <form onSubmit={addToCategories}>
          <input ref={input} type="text" placeholder={`Category name`} value={catToAdd} onChange={(e) => setCatToAdd(e.target.value)}/>
          <Button type="submit" variant="contained" color="primary">Add To Categories</Button>
        </form>
      )}

      {entity === "locations" && (
        <form onSubmit={addToLocations}>
          <input ref={input} type="text" placeholder={`Location name`} value={locName} onChange={(e) => setLocName(e.target.value)}/>
          <input type="text" placeholder={`Location address`} value={locAdd} onChange={(e) => setLocAdd(e.target.value)}/>
          <input type="text" placeholder={`Location coordinates`} value={locCoor} onChange={(e) => setLocCoor(e.target.value)}/>

          <select value={locCat} onChange={(e) => setLocCat(e.target.value)}>
            <option value="" disabled>Location category</option>
            {
              categories.map(category => (
                <option value={category.name} key={category._id}>{category.name}</option>
              ))
            }
          </select>

          <Button type="submit" variant="contained" color="primary">Add To Locations</Button>
        </form>
      )}

      <BackBtn/>
    </div>

  )
}


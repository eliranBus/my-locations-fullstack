import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { DataGrid } from '@material-ui/data-grid';
import changeIndex from '../redux/actions/indexActions';

const sortModel = [
  {
    field: 'name',
    sort: 'asc',
  },
];

const columns = [
  { field: 'name', width: 230 },
  { field: 'address', width: 330 },
  { field: 'coordinates', width: 330 },
  { field: 'category', width: 230 },
];

export default function LocationTable() {
  const [selectedLocation, setSelectedLocation] = useState();
  const [clickedTwice, setClickedTwice] = useState(false);
  const locations = useSelector((state) => state.locations.locations);
  const dispatch = useDispatch();

  const createLocationsData = useCallback((id, name, address, coordinates, category) => {
    return { id, name, address, coordinates, category };
  }, [])
  
  const rows = locations.map((location) => {
    return createLocationsData(location._id, location.name, location.address, location.coordinates, location.category);
  })

  function handleSelect(selectedName){
    if(selectedName === selectedLocation){
      setClickedTwice(true);
      const elems = document.querySelectorAll(".MuiDataGrid-row");
      [].forEach.call(elems, function(el) {
        el.classList.remove("Mui-selected");
      });
      dispatch(changeIndex(undefined));
    } else {
      setClickedTwice(false);
      let selected = locations.filter((location) => location.name === selectedName)
      let newIndex = locations.indexOf(selected[0]);
      dispatch(changeIndex(newIndex));
      localStorage.setItem("index", newIndex);
      setSelectedLocation(selectedName);
    }
  }

  function handleRowSelect(e, selectedName){
    let selected = locations.filter((location) => location.name === selectedName)
    let newIndex = locations.indexOf(selected[0]);
    if(clickedTwice){
      e.element.classList.add("Mui-selected");
      dispatch(changeIndex(newIndex));
      setClickedTwice(false);
    }
  }

  return (
    <div className="table-wrapper">
      <DataGrid 
        hideFooterSelectedRowCount 
        rowHeight={60}
        headerHeight={70}
        sortModel={sortModel} 
        rows={rows} 
        columns={columns} 
        onRowSelected={(e) => handleSelect(e.data.name)} 
        onRowClick={(e) => handleRowSelect(e, e.row.name)}
      />
    </div>
  );
}

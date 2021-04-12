import React, {useState, useEffect, useCallback} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toggleLoader from '../redux/actions/loaderActions';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackBtn from './BackBtn';
import Loader from './Loader';

export default function Category() {
  const [locations, setLocations] = useState([]);
  const loader = useSelector((state) => state.loader.loader);
  const theme = useSelector((state) => state.theme.theme);
  const { category } = useParams();
  const dispatch = useDispatch();
  
  const fetchCategoryLocations = useCallback(async() => {
    const { data } = await axios.get(`/api/categories/${category}`);
    setLocations(data);
  }, [category])

  useEffect(() => {
    dispatch(toggleLoader());
    fetchCategoryLocations();
    setTimeout(() => {
      dispatch(toggleLoader());
    }, 1500)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
      <div className="top-wrapper">
        <div className="locations-container">
          <ul>
          {
            loader && (
              <Loader />
            )
          }
          { !loader && locations.length === 0 && (
            <div>
              <h3 style={{color: theme === 'light' ? 'black' : 'white'}}>There are no locations found in this category</h3> 
            </div>
          )}
          {
            !loader && (
              <div  className="category-box-top-wrapper">
                <div className="category-box-wrapper">
                  {locations.filter(location => location.category.toLowerCase() === category).map(location => (
                    <li className="box" key={location._id}>
                      <div>
                        <h2>{location.name}</h2>
                        <p><b>address:</b> <br/>{location.address}</p>
                        <p><b>coordinates:</b> <br/>{location.coordinates}</p>
                        <p><b>category:</b> <br/>{location.category}</p>
                      </div>
                    </li>
                    )
                  )}
                </div>
                <BackBtn/>  
              </div>
             ) 
          }
          </ul>
        </div>
      </div>
  );
}

import React, {useState, useEffect, useCallback} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import toggleLoader from '../redux/actions/loaderActions';
import axios from 'axios';
import BackBtn from './BackBtn';
import Loader from './Loader';
import LocationMap from './LocationMap';

export default function Category() {
  const [locationData, setLocationData] = useState([]);
  const loader = useSelector((state) => state.loader.loader);
  const theme = useSelector((state) => state.theme.theme);
  const { location } = useParams();
  const dispatch = useDispatch();
  
  const fetchLocationData = useCallback(async () => {
    const { data } = await axios.get(`/api/locations/${location}`);
    setLocationData(data);
  }, [location])

  useEffect(() => {
    dispatch(toggleLoader());
    fetchLocationData();
    setTimeout(() => {
      dispatch(toggleLoader());
    }, 1500)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  
  return (
      <div className="top-wrapper">
        <div className="locations-container">
          {
            loader && (
              <Loader />
            )
          }
          {
            !loader && locationData.length > 0 && (
              <div className="box-wrapper">
                {locationData.map(location => (
                    <div className="box"  key={location._id}>
                      <h2>{location.name}</h2>
                      <p><b>address:</b> <br/>{location.address}</p>
                      <p><b>coordinates:</b> <br/>{location.coordinates}</p>
                      <p><b>category:</b> <br/>{location.category}</p>
                      <LocationMap location={location}/>
                    </div>
                  )
                )}
                <BackBtn/>
              </div>
            ) 
          }
          { !loader && locationData.length === 0 && (
            <div>
              <h3 style={{color: theme === 'light' ? 'black' : 'white'}}>There is no data for this location</h3> 
              <BackBtn/>
            </div>
          )}
        </div>
      </div>
  );
}

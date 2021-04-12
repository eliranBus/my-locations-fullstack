import React from 'react';
import loader from '../assets/images/loader.gif';
import { useSelector } from 'react-redux';

function Loader() {
  const theme = useSelector((state) => state.theme.theme);
  let textColor = theme === 'light' ? 'black' : 'white';

  return (
    <div className="loader">
      <img src={loader} alt="loader"/>
      <h4 style={{color: textColor}}>Loading...</h4>
    </div>
  );
}

export default Loader;
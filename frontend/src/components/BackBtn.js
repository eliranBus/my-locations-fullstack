import React from 'react';
import Button from '@material-ui/core/Button';

export default function BackBtn() {

  return (
    <div className="btn-container">
      <Button className="back" variant="contained" color="primary" onClick={() => window.location.assign("/")}>Go Back  &#8634;</Button>
    </div>
  )
} 
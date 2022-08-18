import React, { useState, useEffect} from 'react'
import { Switch } from '@mui/material';
import '../../App.css';

function ToggleAdult(props) {
  const [Adults, setAdults] = useState(props.adult);
  
  useEffect(() => {
    setAdults(props.adult)
  }, [props.adult])

  const handleToggle = (event, newCheckedEvent) => {
    let newAdults = !Adults
    props.handleFilters(newAdults, "adults")
  }

  return (
    <div> 
        <Switch
            checked={Adults}
            onChange={event => handleToggle(event.target.value)}
            inputProps={{ 'aria-label': 'controlled' }}
        />
  </div>
  )
}

export default ToggleAdult


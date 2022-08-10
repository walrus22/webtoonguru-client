import React, { useState} from 'react'
import { Switch } from '@mui/material';
import '../../App.css';



function ToggleAdult(props) {
  const [Adults, setAdults] = useState(false);

  const handleToggle = (event, newCheckedEvent) => {
    let newAdults = !Adults
    console.log(Adults)
    setAdults(newAdults) 
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


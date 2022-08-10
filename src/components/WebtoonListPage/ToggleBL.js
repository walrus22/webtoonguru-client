import React, { useState} from 'react'
import { Switch } from '@mui/material';
import '../../App.css';



function ToggleBL(props) {
  const [BL, setBL] = useState(false);

  const handleToggle = (event, newCheckedEvent) => {
    let newBL = !BL
    console.log(BL)
    setBL(newBL) 
    props.handleFilters(newBL, "adults")
    
  }

  return (
    <div> 
        <Switch
            checked={BL}
            onChange={event => handleToggle(event.target.value)}
            inputProps={{ 'aria-label': 'controlled' }}
        />
  </div>
  )
}

export default ToggleBL


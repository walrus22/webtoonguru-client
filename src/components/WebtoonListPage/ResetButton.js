import React, { useState} from 'react'
import { Button } from '@mui/material';
import '../../App.css';



function ResetButton(props) {
  const [Adults, setAdults] = useState(false);

  const handleButton = (event, newCheckedEvent) => {
    let newAdults = !Adults
    console.log(Adults)
    setAdults(newAdults) 
    props.handleFilters(newAdults)
  }

  return (
    <div> 
        {/* <Switch
            checked={Adults}
            onChange={event => handleButton(event.target.value)}
            inputProps={{ 'aria-label': 'controlled' }}
        /> */}
        <Button>

        </Button>
  </div>
  )
}

export default ResetButton


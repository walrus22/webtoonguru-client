import React, { useState, useEffect} from 'react'
import { Switch, ButtonGroup, Button } from '@mui/material';
import '../../App.css';

function ToggleAdult(props) {
  const [Adults, setAdults] = useState(props.adult);
  
  useEffect(() => {
    setAdults(props.adult)
  }, [props.adult])

  const handleToggle = (value) => {
    let newAdults = Adults  
    if(newAdults  === false){
        newAdults = true
    } else if(newAdults === true) {
        newAdults = 'all'
    } else {
        newAdults = false
    }
    props.handleFilters(newAdults)
  }

  const handleColor = (Adults) => {
  if (Adults === false) {
      return {backgroundColor: "transparent"};
  } else if (Adults === true) {
      return {backgroundColor: "transparent"};
  } else {
      return {backgroundColor: "transparent"};
  }
  }

  const handleText = (Adults) => {
    if (Adults === false) {
        return "비성인물";
    } else if (Adults === true) {
        return "성인물";
    } else {
        return '전체';
    }
  }

  return (
    <div> 
        <ButtonGroup 
          color="secondary"
          size="small"
          variant="outlined" 
          aria-label="outlined button group" 
          value={Adults} 
          onClick={event => handleToggle(event.target.value)}>
          <Button value='platform.rank' style={handleColor(Adults)}>{handleText(Adults)}</Button>
      </ButtonGroup>

  </div>
  )
}

export default ToggleAdult



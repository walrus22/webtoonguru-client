// import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import '../../App.css';



function SearchDate(props) {
  const [Checked, setChecked] = useState(props.date) ;// default = all
  const [Dates, setDates] = useState(["월","화","수","목","금","토","일","연재","완결","열흘", "비정기"]);

  useEffect(() => {
    setChecked(props.date)
  }, [props.date])

  const handleToggle = (event, newCheckedEvent) => {
    let value;
    if(Checked.length > newCheckedEvent.length){
      value = Checked.filter(x => newCheckedEvent.indexOf(x) === -1)[0]
    } else {
      value = newCheckedEvent.filter(x => Checked.indexOf(x) === -1)[0]
    }
    
    const currentIndex = Checked.indexOf(value);
    const newChecked = [...Checked];

    if(value === "all"){
      if(Checked.indexOf("all") === -1){ 
        newChecked.length = 0
        newChecked.push("all")
      }
    } else{
      if(Checked.indexOf("all") !== -1){ 
        newChecked.length = 0
        newChecked.push(value)
      } else{ 
        if(currentIndex === -1){
          newChecked.push(value)
        } else {
          newChecked.splice(currentIndex, 1)
          if(newChecked.length === 0){
            newChecked.push("all")
          }
        }
      }
    }

    props.handleFilters(newChecked)
    
  }

  return (
    <div> 
      <div>
        <ToggleButtonGroup
          value={Checked}
          onChange={handleToggle}
          aria-label="dateButton"
          size="small"
          sx={{height:"30px"}}
          // color="success"
          >
          <ToggleButton className="dateToggle" value="all">전체</ToggleButton>
          {Dates?.map((item) => (
            <ToggleButton className="dateToggle" key={item} value={item}>{item}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
  </div>
  )
}

export default SearchDate



// import axios from 'axios';
import React, { useState, useEffect} from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import '../../App.css';
import { platformOrderList } from '../genreEngToKor';

// const platform_list = ["bomtoon", "ktoon", "mrblue", "toomics"];

function SearchPlatform(props) {
  const [Checked, setChecked] = useState(props.platform) ;// default = all
  const [Platforms, setPlatforms] = useState(platformOrderList);

  useEffect(() => {
    setChecked(props.platform)
  }, [props.platform])

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
          aria-label="platformButton"
          size="small"
          sx={{height:"30px"}}
          >
          <ToggleButton className="platformToggle" value="all">전체</ToggleButton>
          {Platforms?.map((item) => (
            <ToggleButton className="platformToggle" key={item} value={item}>
              <img alt="logo" style={{height:"20px", width:"20px", marginRight: "5px"}} className="publisher-logo" src={require(`../../logo/${item}.png`)}/>
              {item}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
  </div>
  )
}

export default SearchPlatform



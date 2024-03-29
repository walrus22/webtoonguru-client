import React, { useState, useEffect } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import '../../App.css';
import genreEngToKor from '../genreEngToKor';

function SearchGenre(props) {
  const [Checked, setChecked] = useState(props.genre) ;// default = all
  const [Genres] = useState(["romance", "drama", "daily", "sensibility", "gag", "fantasy", "thrill+horror", "action", "historical", "school", "sports",  "bl", "gl", "erotic"]);

  useEffect(() => {
    setChecked(props.genre)
  }, [props.genre])
  const handleToggle = (event, newCheckedEvent) => {
    // console.log("newCheckedEvent: " + newCheckedEvent)
    // newCheckedEvent 가 Checked보다 작아지는 경우 : 언클릭
    // newCheckedEvent 가 Checked보다 커지는 경우 : 클릭

    let value;
    if(Checked.length > newCheckedEvent.length){
      // console.log("Checked is longer")
      value = Checked.filter(x => newCheckedEvent.indexOf(x) === -1)[0]
    } else {
      // console.log("newCheckedEvent is longer")
      value = newCheckedEvent.filter(x => Checked.indexOf(x) === -1)[0]
    }
    
    const currentIndex = Checked.indexOf(value);
    let newChecked = [...Checked];

    if(value === "all"){
      //all이 들어있는 경우 무반응
      //기존에 [장르] 인 경우 나머지 체크 풀고 전체만 체크
      if(Checked.indexOf("all") === -1){ 
        newChecked.length = 0
        newChecked.push("all")
      } 
    } else{
      if(Checked.indexOf("all") !== -1){ //all인 경우 all 아닌 장르 선택하면 all 해제, 추가
        newChecked.length = 0
        newChecked.push(value)
      } else{ //all이 아니고 [장르] 있을때 추가
        if(currentIndex === -1){
          newChecked.push(value)
        } else {
          newChecked.splice(currentIndex, 1) // 있으면 지우는거
          if(newChecked.length === 0){
            newChecked.push("all")
          }
        }
      }
    }
    // setChecked(newChecked) 
    props.handleFilters(newChecked, "hello")  // 뒤 인자는 안쓰임..
  }

  return (
    <div> 
      <div>
        <ToggleButtonGroup
          value={Checked}
          onChange={handleToggle}
          aria-label="genreButton"
          size="small"
          // color="success"
          >
          <ToggleButton className="genreToggle" value="all">전체</ToggleButton>
          {Genres?.map((item) => (
            <ToggleButton className="genreToggle" key={item} value={item}>{genreEngToKor(item)}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
  </div>
  )
}

export default SearchGenre


// import axios from 'axios';
import React, { useState } from 'react'
import { Button, ButtonGroup } from '@mui/material';
import '../../App.css';

// 기본(이름순), 랭크순 (각 플랫폼 기준), 업데이트순(날짜? or 크롤링),
// 각각 오름차순, 내림차순


function SearchOrder(props) {
  const [Orders, setOrders] = useState({
    'title' : 1,
    // 'platform.rank' : 0,
  });
  

// 3 state button {0: off, 1: desc, -1: asc}
  const handleToggle = (value) => {
    const newOrders = {...Orders}

    if(Orders[value] === 1){
        newOrders[value]= -1
    } else if(Orders[value] === -1) {
        newOrders[value]= 0
    } else {
        newOrders[value]= 1
    }
    setOrders(newOrders)
    props.handleFilters(newOrders, "Orders")
  }

  const handleColor = (order) => {
    if (order === 0) {
        return {backgroundColor: "transparent"};
    } else if (order === 1) {
        return {backgroundColor: "#dcdcdc"};
    } else {
        return {backgroundColor: "#dcdcdc"};
    }
  }

  const handleArrow = (order) => {
    if (order === 0) {
        return;
    } else if (order === 1) {
        return '\u2191';
    } else {
        return '\u2193';
    }
  }

  return (
    <div> 
    <ButtonGroup 
        color="secondary"
        size="small"
        variant="outlined" 
        aria-label="outlined button group" 
        value={Orders} 
        onClick={event => handleToggle(event.target.value)}>
        <Button value='title' style={handleColor(Orders['title'])}>제목&nbsp;{handleArrow(Orders['title'])}<span style={{fontSize:"1.1em"}}></span></Button>
        {/* <Button value='platform.rank' style={handleColor(Orders['platform.rank'])}>랭킹순 {handleArrow(Orders['platform.rank'])}</Button> */}
    </ButtonGroup>

  </div>
  )
}

export default SearchOrder



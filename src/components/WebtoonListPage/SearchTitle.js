import React, { useState } from 'react'
import '../../App.css';

function SearchTitle(props) {
  const [Title, setTitle] = useState();

  const handleTitle = (value) => {
    setTitle(value)
    props.handleFilters(value)
  }

  return (
    <div> 
        <input style={{width: '220px'}} id="titleSearch" type="text" placeholder='제목을 입력하세요' onChange={event => handleTitle(event.target.value)}/>
        <label htmlFor="titleSearch"></label>
    </div>
  )
}

export default SearchTitle


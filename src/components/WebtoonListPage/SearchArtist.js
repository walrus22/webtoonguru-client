import React, { useState} from 'react'
import '../../App.css';

function SearchArtist(props) {
  const [Artist, setArtist] = useState();

  const handleArtist = (value) => {
    setArtist(value)
    props.handleFilters(value)
  }

  return (
    <div> 
        <input style={{width: '220px'}} id="ArtistSearch" type="text" placeholder='여러 작가 검색시 ,를 사용하세요' onChange={event => handleArtist(event.target.value)}/>
        <label htmlFor="ArtistSearch"></label>
    </div>
  )
}

export default SearchArtist


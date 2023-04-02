import React, { useState, useEffect} from 'react'
import '../../App.css';

function SearchArtist(props) {
  const [Artist, setArtist] = useState(props.artist);
  console.log(props.artist);
  console.log(typeof(props.artist));

  useEffect(() => {
    setArtist(props.artist)
    props.handleFilters(Artist)
  }, [props.artist])

  const handleArtist = (value) => {
    props.handleFilters(value)
  }

  return (
    <div> 
        <input style={{width: '220px'}} id="artist-search" type="text" placeholder='여러 작가 검색시 ,를 사용하세요' onChange={event => setArtist(event.target.value)}/>
        <label htmlFor="ArtistSearch"></label>
    </div>
  )
}

export default SearchArtist


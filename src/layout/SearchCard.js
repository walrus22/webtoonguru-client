import React from 'react';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import originalImageToWebImage from '../components/originalImageToWebImage';


const SearchCard = (props) => {
    const webtoon = props.webtoon;
    // const title = webtoon.title;
    // console.log(webtoon);
    // console.log(webtoon.title);

    return (
      // <Card className='detail-card'>
      //   <a href={`/webtoon/details/${webtoon._id}`} style={{width:'100%', height:'100px'}}>
      //     <Card.Img className='detail-card-img' variant="top" src={originalImageToWebImage(webtoon, 150, 100)} />
      //     <Card.ImgOverlay style={{width:'100%', height:'100px', padding: '0px'}}>
      //       {/* {webtoon.adult === true && <img className="ico-adult" src={require('../../logo/adult.png')} alt="hi" />} */}
      //     </Card.ImgOverlay>
      //   </a>
      //   <Card.Body className='detail-card-title-body'>
      //       <a className = 'detail-card-link' href={`/webtoon/details/${webtoon._id}`}>{webtoon.title}</a>
      //   </Card.Body>
      // </Card>      
      <ul>
        <Card style={{zIndex:'1', background:"yellow"}}>
          <div>
            <Link to={`/webtoon/details/${webtoon._id}`}>
              <Card.Img className='search-card-img' variant="top" src={originalImageToWebImage(webtoon, 165, 100)} />
              <Card.ImgOverlay style={{width:'100%', height:'100px', padding: '0px'}}>
                {webtoon.adult === true && <img className="search-ico-adult" alt="hi" />}
              </Card.ImgOverlay>
            </Link>
          </div>
          <Card.Body className='search-card-title-body'>
              <Link  className='search-card-title' to={`/webtoon/details/${webtoon._id}`}>{webtoon.title}</Link>
          </Card.Body>

          <Card.Body className='search-card-artist-body'>
            {webtoon.artist.map((artist,index, artists) => {
                if(index === artists.length-1){
                  return <Card.Link className='search-card-artist' key={index} href={`/artist/details/${artist._id}`}>{artist.name}</Card.Link>
                } else {
                  return <Link className='search-card-artist' key={index} to={`/artist/details/${artist._id}`}>{artist.name}, </Link>
                }
              })}
          </Card.Body>
        </Card>
      </ul>  
      );
};

export default SearchCard;



const WebtoonListCard = (props) => {
    const webtoon = props.webtoon;

    return (
      // onClick={() => {window.location.href=`/webtoon/details/${webtoon._id}`}}
        <Card>
          <div>
            <Link to={`/webtoon/details/${webtoon._id}`}>
              <Card.Img className='list-card-img' variant="top" src={originalImageToWebImage(webtoon, 165, 100)} />
              <Card.ImgOverlay style={{width:'100%', height:'100px', padding: '0px'}}>
                {webtoon.adult === true && <img className="list-ico-adult" alt="hi" />}
              </Card.ImgOverlay>
            </Link>
          </div>
          <Card.Body className='list-card-title-body'>
              <Link  className='list-card-title' to={`/webtoon/details/${webtoon._id}`}>{webtoon.title}</Link>
          </Card.Body>

          <Card.Body className='list-card-artist-body'>
            {webtoon.artist.map((artist,index, artists) => {
                if(index === artists.length-1){
                  return <Card.Link className='list-card-artist' key={index} href={`/artist/details/${artist._id}`}>{artist.name}</Card.Link>
                } else {
                  return <Link className='list-card-artist' key={index} to={`/artist/details/${artist._id}`}>{artist.name}, </Link>
                }
              })}
          </Card.Body>
        </Card>
      );
};





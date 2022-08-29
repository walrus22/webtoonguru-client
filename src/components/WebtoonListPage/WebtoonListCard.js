import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import Card from 'react-bootstrap/Card';
import originalImageToWebImage from '../originalImageToWebImage';


const WebtoonListCard = (props) => {
    const webtoon = props.webtoon;

    return (
      // onClick={() => {window.location.href=`/webtoon/details/${webtoon._id}`}}
        <Card>
          <div>
            <Link to={`/webtoon/details/${webtoon._id}`}>
              <Card.Img className='list-card-img' variant="top" src={originalImageToWebImage(webtoon, 165, 100)} />
              <Card.ImgOverlay style={{width:'100%', height:'100px', padding: '0px'}}>
                {webtoon.adult === true && <img className="list-ico-adult" src={require('../../logo/adult.png')} alt="hi" />}
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

export default WebtoonListCard;


import React from 'react';
import '../../App.css';
import Card from 'react-bootstrap/Card';
import originalImageToWebImage from '../originalImageToWebImage';

const WebtoonOtherWorkCard = (props) => {
    const webtoon = props.webtoon;

    return (
      <Card className='detail-card'>
        <a href={`/webtoon/details/${webtoon._id}`} style={{width:'100%', height:'100px'}}>
          <Card.Img className='detail-card-img' variant="top" src={originalImageToWebImage(webtoon, 150, 100)} />
          <Card.ImgOverlay style={{width:'100%', height:'100px', padding: '0px'}}>
            {webtoon.adult === true && <img className="ico-adult" src={require('../../logo/adult.png')} alt="hi" />}
          </Card.ImgOverlay>
        </a>
        <Card.Body className='detail-card-title-body'>
            <a className = 'detail-card-link' href={`/webtoon/details/${webtoon._id}`}>{webtoon.title}</a>
        </Card.Body>
      </Card>        
      );
};

export default WebtoonOtherWorkCard;


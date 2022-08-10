import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import Card from 'react-bootstrap/Card';


const WebtoonOtherWorkCard = (props) => {
    const webtoon = props.webtoon;

    return (
      <Card className='detail-card'>
        <a href={`/webtoon/details/${webtoon._id}`} style={{width:'100%', height:'100px'}}>
          <Card.Img className='detail-card-img' variant="top" src={webtoon.thumbnail} />
          <Card.ImgOverlay style={{width:'100%', height:'100px', padding: '0px'}}>
            {webtoon.adult === true && <img className="ico-adult" src={require('../../logo/adult.png')} alt="hi" />}
          </Card.ImgOverlay>
        </a>
        <Card.Body className='detail-card-title-body'>
            <a className = 'detail-card-link' href={`/webtoon/details/${webtoon._id}`}>{webtoon.title}</a>
        </Card.Body>
      </Card>

        // <Card style={{margin:'10px', width: '130px' , height:'100px', backgroundColor: 'transparent', border:0}}>
        //   <Card.Img className='detail-card-img' src={webtoon.thumbnail} />
        //   <Card.Body className='detail-card-body'>
        //     <Card.Title >
        //       <Link className = 'detail-card-link' onClick={() => {window.location.href=`/webtoon/details/${webtoon._id}`}} to={`/webtoon/details/${webtoon._id}`}>{webtoon.title}</Link>
        //       <a className = 'detail-card-link' href={`/webtoon/details/${webtoon._id}`}>{webtoon.title}</a>
        //       </Card.Title>
        //     <Card.Text>
        //       {webtoon.genre.map((item,index) => {
        //         return <span key={index} >{item.name} <br></br></span>
        //       })}
        //     </Card.Text>
        //   </Card.Body>
        // </Card>
        
      );
};

export default WebtoonOtherWorkCard;


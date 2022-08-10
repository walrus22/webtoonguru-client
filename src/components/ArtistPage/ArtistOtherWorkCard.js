import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import Card from 'react-bootstrap/Card';
import { Grid, Typography } from '@mui/material';


const ArtistOtherWorkCard = (props) => {
    const webtoon = props.webtoon;
    console.log(webtoon)

    return (
      <Grid container spacing={2} xs={6} mb={5}>
        <Grid item >
          <a href={`/webtoon/details/${webtoon._id}`}>
            <img className='artist-card-img' src={webtoon.thumbnail}/>
            {/* <Card.ImgOverlay style={{width:'100%', height:'100px', padding: '0px'}} >
              {webtoon.adult === true && <img className="ico-adult" src={require('../../logo/adult.png')} alt="hi" />}
            </Card.ImgOverlay> */}
          </a>
        </Grid>
        <Grid item >
          <Typography mb={0.5}>
            <a className='artist-card-title' href={`/webtoon/details/${webtoon._id}`}>{webtoon.title}</a>
          </Typography>
          <Typography mb={0.5}>
            {webtoon.artist.map((artist) => {
              return <a >{artist.name}</a>
            })}
          </Typography>
          <Typography mb={0.5}>
            {webtoon.genre.map((genre, index, genres) =>{
              if(index === genres.length-1){
                return <Link className="genre-link" key={genre._id} to={`/genre/all/${genre._id}` }>{genre.name}</Link>
              } else {
                return <React.Fragment><Link className="genre-link" key={genre._id} to={`/genre/all/${genre._id}` }>{genre.name}</Link><span>,&nbsp;</span></React.Fragment>
              }})}
            {webtoon.adult ? <span>성인</span> : <span></span>}
          </Typography>
          <Typography mb={0.5}>
              {webtoon.date.map((date, index, dates) => {
              if(index === dates.length-1){
                return <Link className="date-link" key={date._id} to={`/date/all/${date._id}`}>{date.date}</Link>
              } else {
                return <React.Fragment><Link className="date-link" key={date._id} to={`/date/all/${date._id}`}>{date.date}</Link><span>/&nbsp;</span></React.Fragment>
              }}
              )}
          </Typography>
          <Typography>
            {webtoon.platform.map((platform, index, platforms)=> {
              if(index===0){
                return <React.Fragment>
                          <a href={platform.address} style={{marginRight:'5px'}}>
                            <img alt="logo" className="publisher-logo" src={require(`../../logo/${platform.name}.png`)}></img>
                          </a>
                        </React.Fragment>
              } else if(platform.name !== platforms[index-1].name) {
                return <React.Fragment>
                          <a href={platform.address} style={{marginRight:'5px'}}>
                            <img alt="logo" className="publisher-logo" src={require(`../../logo/${platform.name}.png`)}></img>
                          </a>
                        </React.Fragment>
              }
            })} 
          </Typography>
        </Grid>
      </Grid>
      );
};

export default ArtistOtherWorkCard;


  // <Card className='detail-card'>
  //   <a href={`/webtoon/details/${webtoon._id}`} style={{width:'100%', height:'100px'}}>
  //     <Card.Img className='artist-card-img' variant="top" src={webtoon.thumbnail} />
  //     <Card.ImgOverlay style={{width:'100%', height:'100px', padding: '0px'}}>
  //       {webtoon.adult === true && <img className="ico-adult" src={require('../../logo/adult.png')} alt="hi" />}
  //     </Card.ImgOverlay>
  //   </a>
  //   <Card.Body className='artist-card-title-body'>
  //       <a className = 'artist-card-link' href={`/webtoon/details/${webtoon._id}`}>{webtoon.title}</a>
  //   </Card.Body>
  // </Card>
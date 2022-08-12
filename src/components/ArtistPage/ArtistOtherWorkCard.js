import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import Card from 'react-bootstrap/Card';
import { Grid, Typography } from '@mui/material';



const ArtistOtherWorkCard = (props) => {
    const webtoon = props.webtoon;
    console.log(webtoon)

    return (
      <Grid container item spacing={2} xs={6} mb={5}>
        <Grid item >
          <a style={{position:'relative'}} href={`/webtoon/details/${webtoon._id}`}>
            <img className='artist-card-img' src={webtoon.thumbnail}/>
            {webtoon.adult === true && <img className="artist-ico-adult" src={require('../../logo/adult.png')} alt="hi" />}
          </a>
        </Grid>
        <Grid item >
          <Typography mb={0.5}>
            <a className='artist-card-title' href={`/webtoon/details/${webtoon._id}`}>{webtoon.title}</a>
          </Typography>
          <Typography mb={0.5}>
            {webtoon.artist.map((artist, index, artists) => {
              if(index === artists.length-1){
                return <a href={`/artist/details/${artist._id}`}>{artist.name}</a>
              } else {
                return <a href={`/artist/details/${artist._id}`}>{artist.name}<span>,&nbsp;</span></a>
              }
            })}
          </Typography>
          <Typography mb={0.5}>
            {webtoon.genre.map((genre, index, genres) =>{
              if(index === genres.length-1){
                return <Link className="genre-link" key={genre._id} to={`/genre/all/${genre._id}` }>{genre.name}</Link>
              } else {
                return <Link className="genre-link" key={genre._id} to={`/genre/all/${genre._id}` }>{genre.name}<span>,&nbsp;</span></Link>
              }})}
            {webtoon.date.map((date, index, dates) => {
              console.log(date);
            if(index === dates.length-1){
              return <Link className="date-link" key={date._id} to={`/date/all/${date._id}`}><span className='separator'/>{date.name}</Link>
            } else {
              return <Link className="date-link" key={date._id} to={`/date/all/${date._id}`}>{date.name}<span>/&nbsp;</span></Link>
            }}
            )}
          </Typography>
          <Typography mb={0.5}>
          </Typography>
          <Typography>
            {webtoon.platform.map((platform, index, platforms)=> {
              if(index===0){
                return <React.Fragment>
                          <a href={platform._id.address} style={{marginRight:'5px'}}>
                            <img alt="logo" className="publisher-logo" src={require(`../../logo/${platform.name}.png`)}></img>
                          </a>
                        </React.Fragment>
              } else if(platform.name !== platforms[index-1].name) {
                return <React.Fragment>
                          <a href={platform._id.address} style={{marginRight:'5px'}}>
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
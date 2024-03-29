import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import { Grid, Typography } from '@mui/material';
import originalImageToWebImage from '../originalImageToWebImage';


const ArtistOtherWorkCard = (props) => {
    const webtoon = props.webtoon;
    console.log(webtoon)

    return (
      <Grid container item spacing={2} xs={6} mb={5}>
        <Grid item >
          <a style={{position:'relative'}} href={`/webtoon/details/${webtoon._id}`}>
            <img className='artist-card-img' src={originalImageToWebImage(webtoon, 300, 200)}/>
            {webtoon.adult === true && <img className="artist-ico-adult" src={require('../../logo/adult.png')} alt="" />}
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
                return <Link className="genre-link" key={genre._id} to={`/webtoon/list?genre=${genre.name}`}>{genre.name}</Link>
              } else {
                return <Link className="genre-link" key={genre._id} to={`/webtoon/list?genre=${genre.name}`}>{genre.name}<span>,&nbsp;</span></Link>
              }})}
            {webtoon.date.map((date, index, dates) => {
              console.log(date);
              if(index === 0){
                return <Link className="date-link" key={date._id} to={`/webtoon/list?date=${date.name}`}><span className='separator'/>{date.name}</Link>
              } else {
                return <Link className="date-link" key={date._id} to={`/webtoon/list?date=${date.name}`}>{date.name}<span>/&nbsp;</span></Link>
            }})}
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
              } else {
                return <React.Fragment/>
              }

            })} 
          </Typography>
        </Grid>
      </Grid>
      );
};

export default ArtistOtherWorkCard;
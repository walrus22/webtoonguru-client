import React from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useParams  } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import { Grid, Paper, Typography, ButtonBase, styled, Box} from '@mui/material';
import WebtoonOtherWorkCard from './WebtoonOtherWorkCard';
import Buttonbar from '../../layout/Buttonbar'
import Card from 'react-bootstrap/Card';
import WebtoonRankChart from './WebtoonRankChart'
import Stack from '@mui/material/Stack';
import genreEngToKor from '../genreEngToKor';



export function withRouter(Children){
  return(props)=>{
     const match  = {params: useParams()};
     return <Children {...props}  match = {match}/>
 }
}


class WebtoonDetails extends React.Component {
  constructor(props) {
    console.log(props)
    super(props);
    this.state = {
      webtoon: {},
      dates: [],
      genres: [],
      platforms: [],
      artists: [],
      artistsHaveOthers: [],
      orders: {},
      // dominantColor: [],
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .post('http://localhost:5000/api/webtoon/details/' + this.props.match.params.id)
      .then(res => {
        console.log(res.data);
        this.setState({
          webtoon: res.data,
          genres : res.data.genre,
          dates : res.data.date,
          platforms : res.data.platform,
          artists: res.data.artist,
        })
        // this.getDominantColor(res.data)
        this.getOtherWorkList(res.data)
      })
      .catch(err => {
        console.log("Error from showWebtoonDetail");
      })
  };

  // onDeleteClick (id) {
  //   axios
  //     .delete('http://localhost:5000/api/webtoons/'+id)
  //     .then(res => {
  //       this.props.history.push("/");
  //     })
  //     .catch(err => {
  //       console.log("Error form showWebtoonDetail_deleteClick");
  //     })
  // };

  // getDominantColor = (webtoon) => {
  //   const colorThief = new window.ColorThief();
  //   const img = new Image();
  //   let imageURL = webtoon.thumbnail;
  //   let googleProxyURL = 'https://images1-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&refresh=2592000&url=';
  //   img.crossOrigin = 'Anonymous';
  //   img.src = googleProxyURL + encodeURIComponent(imageURL);

  //   img.addEventListener('load', () => {
  //     this.setState({dominantColor : colorThief.getColor(img)})
  //     return colorThief.getColor(img);
  //   })
  // }

  getOtherWorkList = (webtoon) => {
    let artists_temp = [...webtoon.artist];
    artists_temp.forEach((artist) => {
      if(artist.work_list.map(work => work._id).indexOf(webtoon._id) !== -1 ) {
        artist.work_list.splice(artist.work_list.map(work => work._id).indexOf(webtoon._id),1)
      } 
      if(artist.work_list.length === 0){
        artists_temp.splice(artists_temp.indexOf(artist))
      } else { 
      }
    })
    this.setState({
      artistsHaveOthers : artists_temp
    })
  }

  
  render() {
    const webtoon = this.state.webtoon;
    const artists = this.state.artists;
    const artistsHaveOthers = this.state.artistsHaveOthers;
    const genres = this.state.genres;
    const platforms = this.state.platforms;
    const dates = this.state.dates;
    // const dominantColor = this.state.dominantColor?.join();

    const publishDate = () => {
      if(webtoon.finish_status === "완결"){
        return <React.Fragment>완결</React.Fragment>
      } else {
        return <React.Fragment>
          매주&nbsp;
          {dates.map((date, index, dates) => {
            if(index === dates.length-1){
              return <Link className="date-link" key={date._id} to={`/date/all/${date._id}`}>{date.name}</Link>
            } else {
              return <React.Fragment><Link className="date-link" key={date._id} to={`/date/all/${date._id}`}>{date.name}</Link><span>,&nbsp;</span></React.Fragment>
            }}
          )} 연재
        </React.Fragment>
      }
    }

    const artistList = () => {
      return artists.map((artist, index, artists) => {
        if(index === artists.length-1){
          return <Link className='artist-link' key={artist._id} to={`/artist/details/${artist._id}`}>{artist.name} </Link>
        } else {
          return <React.Fragment> <Link className='artist-link' key={artist._id} to={`/artist/details/${artist._id}`}>{artist.name} </Link><span className='separator'></span></React.Fragment>
        }
      })
    }
    
    const genreList = () => {
      return <React.Fragment>
            {genres.map((genre, index, genres) =>{
              if(index === genres.length-1){
                return <Link className="genre-link" key={genre._id} to={`/genre/all/${genre._id}` }>{genreEngToKor(genre.name)}</Link>
              } else {
                return <React.Fragment><Link className="genre-link" key={genre._id} to={`/genre/all/${genre._id}` }>{genre.name}</Link><span>,&nbsp;</span></React.Fragment>
              }})}
            {webtoon.adult ? <span><span className='separator'></span>성인</span> : <span></span>}
      </React.Fragment>
    }
    
    // backup -> 8.8 이전
    const otherWorkList = () => {
      return <React.Fragment>
            {artistsHaveOthers.map((artist) => {
              return <React.Fragment key={artist._id} >
                      <Box className="detail-other-box">
                        <div className='detail-other-artist'>{artist.name} 작가의 다른 작품</div>
                        <div className='detail-other-worklist'>
                          {artist.work_list.map((work, index) => {
                              if(index === 0){
                                return <WebtoonOtherWorkCard style={{width:"150px"}} webtoon={work}/>
                              } else {
                                return <WebtoonOtherWorkCard style={{width:"150px"}} webtoon={work} key={artist.name + index}/>
                              }
                          })}
                        </div>
                      </Box>
              </React.Fragment>
            })}
      </React.Fragment>
    }

    const getPublisher = () => {
      return <React.Fragment>
        {platforms.map((platform, index)=> {
          {/* console.log(platform) */}
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
      })} </React.Fragment>
    }

    const Img = styled('img')({
      margin: 'auto',
      display: 'block',
      maxWidth: '100%',
      maxHeight: '100%',
    });


    return (
      <div className="main"> 
      {/* height: 100vh */}
        {/* <style>{'body { background-image: linear-gradient(rgba(248,212,203,0.5), 80%,  white); }'}</style> */}
        {/* <HelmetProvider>
          <Helmet className="detailHelmet">
            <style>{`body { background-image: linear-gradient(rgba(248,212,203,0.5), white ) }`}</style>
            <style>{`body { background-image: linear-gradient(rgba(${dominantColor}, 0.9), white ) }`}</style>
            'background-image': `linear-gradient(to left, white, rgba(${dominantColor}, 0.2) 25%, rgba(${dominantColor}, 0.5) 75%, white 100%)`
          </Helmet>
        </HelmetProvider> */}

        <Paper
        // justifyContent="flex-start"
        // pt={3}
        sx={{
          pt: 5,
          pb: 5,
          margin: 'auto',
          // maxWidth: 1200,
          flexGrow: 1,
          boxShadow: '0',
          backgroundColor: 'transparent',
          
        }}
      >
        <Grid container spacing={2}>
          <Grid item md={5.5}>
            <ButtonBase sx={{boxShadow: 0, width: 500, height: 300}}>
              <Img className='detail-img' alt="IMG" src={webtoon.thumbnail} />
            </ButtonBase>
          </Grid>
          <Grid item container xs={12} ml={1.5} md={5} spacing={2} sx={{backgroundColor: 'white', mt: 2}}>
            <Grid item mr={3}>
              <Typography className="detail-title" mb={2} gutterBottom variant="h4" component="div">
                {webtoon.title}
              </Typography>
              <Typography gutterBottom mb={1} sx={{fontSize: "16px"}}>
                {artistList()}
              </Typography>
              <Typography gutterBottom mb={1.5} sx={{fontSize: "15px"}}>
                {publishDate()}<span className='separator'></span>{genreList()}&nbsp;&nbsp;
              </Typography>
              <Box ml={-0.5}>
                {getPublisher()}
              </Box>

              <Box sx={{overflowY:'auto', width:400, height: 100, marginTop:"18px"}}>
                <Typography variant="body2" color="text.secondary">
                  {webtoon.synopsis}
                </Typography>
              </Box>
            </Grid>

            <Grid item mt={7.5}>
            </Grid>
          </Grid>
        </Grid>
      </Paper>



      <Paper
        sx={{
          pt: 3,
          // margin: 'auto',
          maxWidth: 1200,
          // height: 00,
          flexGrow: 1,
          boxShadow: '0',
          backgroundColor: 'transparent',
        }}>
        <Grid container spacing={2}>
          <Grid item xs={6} md={5.5}>
            <WebtoonRankChart webtoon={webtoon} platforms={platforms}/>  
          </Grid>
          <Grid item xs={6}>
            {otherWorkList()}
          </Grid>
          
          <Grid item xs={6}>댓글 예정</Grid>
          <Grid item xs={6}>동일 장르 인기 웹툰 </Grid>
        </Grid>
      </Paper>
    </div>
    );
  }
}

// 뒤로가기 or 목차 or 돌아가기 기능 추가

export default withRouter(WebtoonDetails);



  // getPublisher = (platforms) => {
  //   platforms.map((platform, index)=> {
  //     if(index===0){
  //       return <React.Fragment>
  //                 <a href={platform.address}>
  //                   <img className="publisher-logo" src={require(`../../logo/${platform.name}.png`)}></img>
  //                 </a>
  //               </React.Fragment>
  //     } else if(platform.name !== platforms[index-1].name) {

  //     }
  //   })

        
  // return <React.Fragment>
  //   {platforms.map((platform, index)=> {
  //     if(index===0){
  //       return <React.Fragment>
  //                 <a href={platform.address}>
  //                   <img className="publisher-logo" src={require(`../../logo/${platform.name}.png`)}></img>
  //                 </a>
  //                   <span>&nbsp;&nbsp;{platform.genre.name} {platform.rank}위 </span>
  //               </React.Fragment>
  //     } else if(platform.name !== platforms[index-1].name) {
  //       return <React.Fragment>
  //                 <br />
  //                 <a href={platform.address}>
  //                   <img className="publisher-logo" src={require(`../../logo/${platform.name}.png`)}></img>
  //                 </a>
  //                   <span>&nbsp;&nbsp;{platform.genre.name} {platform.rank}위 </span>
  //               </React.Fragment>
  //     } else {
  //       return <span>&nbsp;{platform.genre.name} {platform.rank}위 </span>
  //     }
  // })} </React.Fragment>


    // return <React.Fragment>      
    // {platforms.map((platform, index) => {
    //       return <a href={platform.address} key={platform._id}>{platform.genre.name} {platform.rank}위</a>
    // })}
    
    
    
    // {platforms.map((platform, index, platforms) => {

    //   console.log("platforms" + platforms[0])
    //   console.log("platform.name" + platform.name)
    //   {/* console.log("platforms[index-1].name"  + platforms[index+1].name) */}
      
    //     if(index===0 || platform.name !== platforms[index-1].name){
    //       return <React.Fragment>
    //       <a href={platform.address}>
    //         <img className="publisher-logo" src={require(`../../logo/${platform.name}.png`)}></img>
    //         </a>
    //     </React.Fragment>
    //     }
    // })}
    // </React.Fragment>

  // }
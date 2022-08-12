import React from 'react';
import { Link, useParams  } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import ArtistOtherWorkCard from './ArtistOtherWorkCard';
import { Grid } from '@mui/material';

export function withRouter(Children){
  return(props)=>{
     const match  = {params: useParams()};
     return <Children {...props}  match = {match}/>
 }
}

class ArtistDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artist:{},
      work_list: [],
    };
  }

  componentDidMount() {
    // console.log("Print id: " + this.props.match.params.id);
    axios
      .get('http://13.209.26.234:5000/api/artist/details/' + this.props.match.params.id)
      .then(res => {
        console.log(res.data)
        this.setState({
          artist: res.data[0],
          work_list : res.data[0].work_list,
        })
      })
      .catch(err => {
        console.log("Error from showWebtoonDetail");
      })
  };
  

  render() {
    const artist = this.state.artist;
    const work_list = this.state.work_list;

    // const 

    return (
      <div className="main" style={{marginTop: "30px"}}>
        <div className="artist-detail-name">
          {artist.name} 
        </div>
        <div className="artist-detail-count">
          총 {work_list.length}개의 작품
        </div>

        <Grid container columns={12}>
          {work_list.map((webtoon) => {
            return <ArtistOtherWorkCard webtoon={webtoon} />
          })}
        </Grid>

        {/* <Grid container xs={12}>
          <Grid container xs={6} >
          hello<br></br>
          hello<br></br>
          hello<br></br>
          hello<br></br>
          hello<br></br>
          hello<br></br>
          hello<br></br>
          hello<br></br>
          </Grid>
          <Grid container  xs={6} >
          hi<br></br>
          hi<br></br>
          hi<br></br>
          hi<br></br>
          hi<br></br>
          hi<br></br>
          hi<br></br>
          </Grid>
        </Grid> */}


      </div>

    );
    
  }
}

export default withRouter(ArtistDetails);
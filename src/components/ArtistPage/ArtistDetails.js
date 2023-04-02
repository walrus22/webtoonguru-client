import React from 'react';
import '../../App.css';
import axios from 'axios';
import ArtistOtherWorkCard from './ArtistOtherWorkCard';
import { Grid } from '@mui/material';
import { useParams } from 'react-router-dom';

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
    axios
      .get(process.env.REACT_APP_API + 'artist/details/' + this.props.match.params.id)
      .then(res => {
        // console.log(res.data)
        this.setState({
          artist: res.data,
          work_list : res.data.work_list,
        })
      })
      .catch(err => {
        console.log("Error from showWebtoonDetail");
      })
  };
  

  render() {
    const artist = this.state.artist;
    const work_list = this.state.work_list;

    return (
      <div className="main" style={{marginTop: "30px"}}>
        <div className="artist-detail-name">
          {artist.name} 
        </div>
        <div className="artist-detail-count">
          총 {work_list.length}개의 작품
        </div>

        <Grid container columns={12}>
          {console.log(artist)}
          {work_list.map((webtoon) => {
            return <ArtistOtherWorkCard webtoon={webtoon._id} />
          })}
        </Grid>
      </div>
    );
    
  }
}

export default withRouter(ArtistDetails);
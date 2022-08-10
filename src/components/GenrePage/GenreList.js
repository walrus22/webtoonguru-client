
import React from 'react';
import { Link, useParams  } from 'react-router-dom';
import '../../App.css';
import {Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import GenreCard from './GenreCard';
import { styled } from '@mui/system';
import axios from 'axios';
import GenreSubNavbar from './GenreSubNavbar';
import genreEngToKor from '../genreEngToKor';



export function withRouter(Children){
  return(props)=>{
     const match  = {params: useParams()};
     return <Children {...props}  match = {match}/>
 }
}

class GenreList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      platforms: [],
      genre_name: "",
      platform_list: [], //toomics
    };
  }

  componentDidMount() {
    axios
    .get('http://localhost:5000/api/genre/' + this.props.match.params.id)
    .then(res => {
      this.setState({
        platforms : res.data,
        genre_name : this.props.match.params.id,
      })
      removeEmpty(res.data)
    })
    .catch(err =>{
        console.log('Error from GenreList');
    })

    const removeEmpty = (platforms) => {
      const platform_order = ['naver', 'lezhin', 'bomtoon', 'ktoon', 'mrblue', 'onestory']; //, 'toomics'

      let temp = [];
      platforms.forEach((platform) => {
        if(temp.indexOf(platform.name) === -1) {
          temp.push(platform.name)
        }
      })

      temp.sort((a, b) => platform_order.indexOf(a) - platform_order.indexOf(b))

      // 투믹스 중복 1위 제거하기 전까진 일단 냅둬
      temp.splice(temp.indexOf("toomics"),1) 
      // 

      this.setState({
        platform_list : temp
      })   
    }
  };


render() {
  // const platforms = this.state.platforms
  // const genre_name = this.state.genre_name
  // const platform_list = this.state.platform_list;
  // console.log(platforms)
  
  const genre_list = ["romance", "drama", "daily", "sensibility", "gag", "fantasy", "thrill/horror", "action", "historical", "school", "sports",  "bl", "gl", "erotic"]
  const StyledTableCell = styled(TableCell)({
    padding: 8,
    borderBottom: 0,
  })

  return (
    <div className="main">
      {/* <GenreSubNavbar genreSelected={this.props.match.params.id}/> */}

      <Grid className='subnav-container' container spacing={3}  wrap="nowrap">
          {genre_list.map((name, index) => {
              if(name === this.props.match.params.id){
                  return <Grid item><a className='subnav-selected' key={index} href={`/genre/${name}`}>{genreEngToKor(name)}</a></Grid>
              } else {
                  return <Grid item><a className='subnav-notselected' key={index} href={`/genre/${name}`}>{genreEngToKor(name)}</a></Grid>
              }
          })}
      </Grid>

      <Grid container mt={3}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <StyledTableCell></StyledTableCell>
                <StyledTableCell align="center">1위</StyledTableCell>
                <StyledTableCell align="center">2위</StyledTableCell>
                <StyledTableCell align="center">3위</StyledTableCell>
                <StyledTableCell align="center">4위</StyledTableCell>
                <StyledTableCell align="center">5위</StyledTableCell>
                <StyledTableCell align="center">6위</StyledTableCell>
                <StyledTableCell align="center">7위</StyledTableCell>
                <StyledTableCell align="center">8위</StyledTableCell>
                <StyledTableCell align="center">9위</StyledTableCell>
                <StyledTableCell align="center">10위</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.platform_list?.map((platform_name, index) => {
                return <TableRow key={index}>
                        <StyledTableCell>
                          <img alt="platform" className='home-logo' src={require(`../../logo/${platform_name}.png`)}/>
                        </StyledTableCell>
                        {this.state.platforms.filter(platform => platform.name === platform_name).map((platform, index, platforms) => {
                          return <GenreCard key={index} platform={platform} webtoon={platform.webtoon_extend[0]}/>
                        })}
              </TableRow>
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Typography className='update-time' variant='subtitle1'>업데이트 시간 {this.state.platforms[0]?.update_time.slice(5,10)} {this.state.platforms[0]?.update_time.slice(11,16)}</Typography>

      </Grid>

    </div>
  );
}
}

export default withRouter(GenreList);
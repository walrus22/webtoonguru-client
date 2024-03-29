
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import '../../App.css';
import {Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import WeekdayCard from './WeekdayCard';
import { styled } from '@mui/system';
import axios from 'axios';
// import WeekdaySubNavbar from './WeekdaySubNavbar';
import { platformOrderList, dateOrderList } from '../genreEngToKor';



export function withRouter(Children){
  return(props)=>{
     const match  = {params: useParams()};
     return <Children {...props}  match = {match}/>
 }
}

class WeekdayList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      platforms: [],
      platform_list: [], //toomics
    };
  }

  componentDidMount() {
    axios
    .get(process.env.REACT_APP_API + 'date/' + this.props.match.params.id)
    .then(res => {
      this.setState({
        platforms : res.data,
      })
      console.log(res.data);
      removeEmpty(res.data)
  })
    .catch(err =>{
      console.log('Error from GenreList');
    })

    const removeEmpty = (platforms) => {
      const platform_order = platformOrderList
      let temp = [];
      platforms.forEach((platform) => {
        if(temp.indexOf(platform.name) === -1) {
          temp.push(platform.name)
        }
      })
      temp.sort((a, b) => platform_order.indexOf(a) - platform_order.indexOf(b))
      this.setState({
        platform_list : temp
      })   
    }
  }

render() {
  const platforms = this.state.platforms
  const platform_list = this.state.platform_list;
  const date_name = this.props.match.params.id;
  const date_list = dateOrderList

  const StyledTableCell = styled(TableCell)({
    padding: 8,
    borderBottom: 0,
  })

  if(date_list.indexOf(this.props.match.params.id) === -1){
    return <Navigate to='/date/월'/>
  } else {
    return(
      <div className="main">
        <Grid container className='subnav-container' spacing={3} wrap="nowrap">
            {date_list.map((name, index) => {
                if(name === this.props.match.params.id){
                    return <Grid item><a className='subnav-selected' key={index} href={`/date/${name}`}>{name}</a></Grid>
                } else {
                    return <Grid item><a className='subnav-notselected' key={index} href={`/date/${name}`}>{name}</a></Grid>
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
                  {platform_list?.map((platform_name, index) => {
                    return <TableRow key={index}>
                            <StyledTableCell>
                              <img alt="platform" className='home-logo' src={require(`../../logo/${platform_name}.png`)}/>
                            </StyledTableCell>
                            {platforms.filter(platform => platform.name === platform_name).map((platform, index, platforms) => {
                              if(index < 10){
                                return <WeekdayCard key={index} platform={platform} webtoon={platform.webtoon[0]}/>
                              }
                            })}
                  </TableRow>
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <Typography className='update-time' variant='subtitle1'>업데이트 시간 {platforms[0]?.update_time.slice(5,10)} {platforms[0]?.update_time.slice(11,16)}</Typography>
        </Grid>
      </div>
    )
  }
}
}

export default withRouter(WeekdayList);
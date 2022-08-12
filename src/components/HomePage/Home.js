import React, { useEffect, useState } from 'react';
import '../../App.css';
import axios from 'axios';
import {Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography} from '@mui/material';
import HomeCard from './HomeCard';
import { styled } from '@mui/system';


function Home() {
  const [Webtoons, setWebtoons] = useState([])
  const [Platforms, setPlatforms] = useState([])

  useEffect(() => {
    getWebtoons()
  }, [])
  
  const getWebtoons = () => {
    axios
    .get('http://13.209.26.234:5000/api/home/')
    .then(res => {
      setPlatforms(res.data)
      console.log(res.data)
    })
    .catch(err =>{
        console.log('Error from ShowWebtoonList');
    })
  }

  const genre_list = ["romance", "drama", "daily", "sensibility", "gag", "fantasy", "thrill/horror", "action", "historical", "school", "sports",  "bl", "gl", "erotic"]
  const platform_list = ['naver', 'lezhin', 'bomtoon', 'ktoon', 'mrblue',  'onestory'] //'toomics'

  const rank_list = (platform_name) => {
    return <TableRow>
      <StyledTableCell><img alt="platform" className='home-logo' src={require(`../../logo/${platform_name}.png`)}/></StyledTableCell>
      {Platforms.filter(platform => platform.name === platform_name).sort((a, b) => genre_list.indexOf(a.genre.name) - genre_list.indexOf(b.genre.name)).map((platform, index) => {
        return <HomeCard key={index} platform={platform} webtoon={platform.webtoon[0]}/>
      })}
      </TableRow>
  }

  const StyledTableCell = styled(TableCell)({
    padding: 8,
    borderBottom: 0,
})

  return (
    <div className='main'>
      <Typography style={{marginTop: '25px'}} variant='h4'>오늘의 플랫폼별 1위 웹툰</Typography>
      <Typography style={{marginTop: '15px', borderBottom:'1px solid rgba(0,0,0,0.3)'}} variant='subtitle1'>업데이트 시간 {Platforms[0]?.update_time.slice(5,10)} {Platforms[0]?.update_time.slice(11,16)}</Typography>

      <Grid container mt={3}>
        <TableContainer>
          <Table>
            <TableHead>
              {/* <TableRow>
                  <StyledTableCell></StyledTableCell>
                  <StyledTableCell>로맨스</StyledTableCell>
                  <StyledTableCell align="left">드라마</StyledTableCell>
                  <StyledTableCell align="left">일상</StyledTableCell>
                  <StyledTableCell align="left">감성</StyledTableCell>
                  <StyledTableCell align="left">개그</StyledTableCell>
                  <StyledTableCell align="left">판타지</StyledTableCell>
                  <StyledTableCell align="left">스릴러/공포</StyledTableCell>
                  <StyledTableCell align="left">액션</StyledTableCell>
                  <StyledTableCell align="left">무협</StyledTableCell>
                  <StyledTableCell align="left">학원</StyledTableCell>
                  <StyledTableCell align="left">스포츠</StyledTableCell>
                  <StyledTableCell align="left">BL</StyledTableCell>
                  <StyledTableCell align="left">GL</StyledTableCell>
                  <StyledTableCell align="left">야한거</StyledTableCell>  
                </TableRow> */}
            </TableHead>
            <TableBody>
              {platform_list.map((platform) => {
                return rank_list(platform)
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </div>

  )
}

export default Home;

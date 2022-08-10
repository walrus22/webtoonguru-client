// import React, { Component } from 'react';
import React, { useEffect, useState } from 'react';
import '../../App.css';
import axios from 'axios';
// import { Link } from 'react-router-dom';
import WebtoonListCard from './WebtoonListCard';
import SearchTitle from './SearchTitle';
import SearchArtist from './SearchArtist';
import SearchGenre from './SearchGenre';
import SearchDate from './SearchDate';
import SearchOrder from './SearchOrder';
import SearchPlatform from './SearchPlatform';
import ToggleAdult from './ToggleAdult';
// import ToggleBL from './ToggleBL';
import { Grid, Typography} from '@mui/material';
import Box from '@mui/material/Box';

import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/system';

function WebtoonList() {
  // const [WebtoonCards, setWebtoonCards] = useState([])
  const [Limit, setLimit] = useState(30)
  const [Webtoons, setWebtoons] = useState([])
  const [Count, setCount] = useState(0)
  const [Page, setPage] = useState(1)
  const [Filters, setFilters] = useState({
    title: "",
    artist: "",
    date: ['all'],
    genre: ['all'],
    genreOperator: "",
    platform: ['all'],
    adult: false,
    order: { 'title' : 1,
    // 'platform.rank' : 0, 
  },
  })

  useEffect(() => {
    const getSetting = {
        page: Page,
        filters: Filters,
        limit: Limit,
    }
    console.log(getSetting)
    getWebtoons(getSetting)
  }, [Page])

  
  const getWebtoons = (getSetting) => {
    axios
    .post('http://localhost:5000/api/webtoon/list', getSetting)
    .then(res => {
      if(res.data[0].sample.length !== 0){
        setWebtoons(res.data[0].sample)
        setCount(res.data[0].count[0].count)
        console.log(res)
      } else {
        setWebtoons([])
        setCount(0)
        console.log(res)
      }
      console.log(getSetting)
    })
    .catch(err =>{
        console.log('Error from ShowWebtoonList');
    })
  }

  const showFilteredResults = (filters) =>{
    const getSetting = {
        page: Page,
        limit: Limit,
        filters: filters,
    }
    getWebtoons(getSetting)
    setPage(1)
  }

  const handleFilters  = (filters, category) => {
    let newFilters = {...Filters}
    newFilters[category] = filters

    console.log(newFilters)

    showFilteredResults(newFilters)
    setFilters(newFilters)
  }

  const handlePage = (event, p) => {
    setPage(p)
  }
  
  // const TableCell = styled(TableCell)({
  //   padding: '10px',
  //   borderBottom: '0px',
  // })

  return (
    <div className="main">
      <Grid container>
        {/* <Grid item xs={12} >
          <Typography variant='h3' display="flex" >전체보기</Typography>  
        </Grid> */}
        <Grid item xs={12} style={{margin: '40px 0px 40px 0px'}}>
          <TableContainer className="search-box" component={Paper} sx={{border: 'solid rgba(0,0,0,0.1) 1px', boxShadow: 0, backgroundColor:'white'}}>
            <Table sx={{minWidth: 650}} aria-label="webtoon_table">
              {/* <TableHead>
                <TableRow>
                  <TableCell>1</TableCell>
                  <TableCell align="right">2</TableCell>
                  <TableCell align="right">3</TableCell>
                  <TableCell align="right">4</TableCell>
                </TableRow>
              </TableHead> */}
              <TableBody>
                <TableRow >
                  <TableCell className="list-table-cell">제목</TableCell>
                  <TableCell className="list-table-cell" colSpan={4}><SearchTitle handleFilters={filters => handleFilters(filters, "title")}/></TableCell>
                </TableRow>
                <TableRow >
                  <TableCell className="list-table-cell">작가</TableCell>
                  <TableCell className="list-table-cell" colSpan={4}><SearchArtist handleFilters={filters => handleFilters(filters, "artist")}/></TableCell>
                </TableRow>
                <TableRow >
                  <TableCell className="list-table-cell">연재요일</TableCell>
                  <TableCell className="list-table-cell" colSpan={4}><SearchDate handleFilters={filters => handleFilters(filters, "date")}/></TableCell>
                </TableRow>
                <TableRow >
                  <TableCell className="list-table-cell">플랫폼</TableCell>
                  <TableCell className="list-table-cell" colSpan={4}><SearchPlatform handleFilters={filters => handleFilters(filters, "platform")}/></TableCell>
                </TableRow>
                <TableRow >
                  <TableCell className="list-table-cell">성인물</TableCell>
                  <TableCell className="list-table-cell"><ToggleAdult handleFilters={filters => handleFilters(filters, "adult")}/>
                  </TableCell>
                </TableRow>
                <TableRow >
                  <TableCell className="list-table-cell">정렬 방식</TableCell>
                  <TableCell className="list-table-cell" colSpan={4}><SearchOrder handleFilters={filters => handleFilters(filters, "order")}/></TableCell>
                </TableRow>
                <TableRow >
                  <TableCell className="list-table-cell">장르</TableCell>
                  <TableCell className="list-table-cell" colSpan={4}><SearchGenre handleFilters={filters => handleFilters(filters, "genre")}/></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={12}>
          {/* mt: 5, padding: 5 */}
          <Box sx={{flexGrow: 1,}}> 
            <Typography style={{paddingBottom: '5px', borderBottom: '1px solid #486075', marginBottom: '23px'}}> 총 <span></span>{Count} 작품 </Typography>
            <Grid container rowSpacing={{ xs: 3.5, sm: 3.5, md: 5 }} columnSpacing={{ xs: 3.5, sm: 3.5, md: 3.8 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {/* {Webtoons.slice((Page-1)*Limit, (Page)*Limit).map((webtoon, index) => ( */}
              {Webtoons.map((webtoon, index) => (
                <Grid item  style={{width: '200px'}} key={index}>
                  <WebtoonListCard webtoon={webtoon} key={webtoon._id}/>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Grid>
      </Grid>
      <Stack alignItems="center" className='list-pagination-stack' spacing={2}>
        <Pagination 
        showFirstButton={true} 
        showLastButton={true}
        siblingCount={3} 
        boundaryCount={0} 
        count={Math.ceil(Count/Limit)} 
        page={Page}
        shape="rounded" 
        onChange={handlePage}
        // sx={{width:'100%',justifyContent:'center'}}
        />
      </Stack>
    </div>

  )
}

export default WebtoonList;

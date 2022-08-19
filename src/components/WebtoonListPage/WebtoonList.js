// import React, { Component } from 'react';
import React, { useEffect, useState } from 'react';
import { useHistory, Link, useSearchParams } from 'react-router-dom';
import '../../App.css';
import axios from 'axios';
import WebtoonListCard from './WebtoonListCard';
import SearchTitle from './SearchTitle';
import SearchArtist from './SearchArtist';
import SearchGenre from './SearchGenre';
import SearchDate from './SearchDate';
import SearchOrder from './SearchOrder';
import SearchPlatform from './SearchPlatform';
import ToggleAdult from './ToggleAdult';
import ToggleOperator from './ToggleOperator';

// import ToggleBL from './ToggleBL';

import { Button, Paper, Box, Stack, Pagination, Grid, Typography} from '@mui/material';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, } from '@mui/material';

function WebtoonList() {
  // const [WebtoonCards, setWebtoonCards] = useState([])
  const [Limit, setLimit] = useState(30)
  const [Webtoons, setWebtoons] = useState([])
  const [Count, setCount] = useState(0)
  const [Page, setPage] = useState(1)
  const [PageUrl, setPageUrl] = useState(process.env.REACT_APP_API + "webtoon/list")
  const [searchParams, setSearchParams] = useSearchParams();
  const [Filters, setFilters] = useState({
    title: !searchParams.get("title") ? "" : searchParams.get("title"),
    artist: !searchParams.get("artist") ? "" : searchParams.get("artist"),
    date: !searchParams.get("date") ? ['all'] : searchParams.get("date").split(','),
    genre: !searchParams.get("genre") ? ['all'] : searchParams.get("genre").split(','),
    platform: !searchParams.get("platform") ? ['all'] : searchParams.get("platform").split(','),
    adult: !searchParams.get("adult") ? false : (searchParams.get("adult") === "all" ? "all" : (searchParams.get("adult") === "true")), // string 타입이라 boolean으로 바꿔줘야함 
    order: { 'title' : 1,
    // 'platform.rank' : 0, 
    // 최신순
    },
    dateOperator: !searchParams.get("dateOperator") ? ['or'] : [searchParams.get("dateOperator")],
    genreOperator: !searchParams.get("genreOperator") ? ['or'] : [searchParams.get("genreOperator")],
    platformOperator: !searchParams.get("platformOperator") ? ['or'] : [searchParams.get("platformOperator")],
  })

  useEffect(() => {
    const getSetting = {
        page: Page,
        filters: Filters,
        limit: Limit,
    }
    // console.log(getSetting)
    getWebtoons(getSetting)
  }, [Page])
  
  const getWebtoons = (getSetting) => {
    axios
    .post(PageUrl, getSetting)
    .then(res => {
      if(res.data[0].sample.length !== 0){
        setWebtoons(res.data[0].sample)
        setCount(res.data[0].count[0].count)
        // console.log(res)
      } else {
        setWebtoons([])
        setCount(0)
        // console.log(res)
      }
      // console.log(getSetting)
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

  const handleFilters  = async (filters, category) => {
    let newFilters = {}
    if(category) {
      // console.log("yes");
      newFilters = {...Filters}
      newFilters[category] = filters
    } else {
      // console.log("no");
      newFilters = filters
    }

    // console.log(newFilters)

    showFilteredResults(newFilters)
    queryURL(newFilters)
    setFilters(newFilters)

  }

  const handlePage = (event, p) => {
    setPage(p)
  }
  
  const queryURL = async (filters) => {
    // console.log(filters)
    // let newUrl = process.env.REACT_APP_API + "webtoon/list";
    // let newUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    let newUrl = "http://localhost:3000/webtoon/list";
    for await (const [filterName, filter] of Object.entries(filters)){
      if(typeof(filter) === "string" && filter !== "") {
        newUrl += `&${filterName}=${filter}`;
      } else if(Array.isArray(filter) === true && filter[0] !== 'all') {
        newUrl += `&${filterName}=${filter.join(',')}`;
      } else if(typeof(filter) === "boolean") {
        newUrl += `&${filterName}=${filter}`;
      }
    }
    // if no "?" in url, change first "&" to "?"
    if(newUrl.indexOf("&") !== -1){
      newUrl = newUrl.substring(0, newUrl.indexOf("&")) + "?" + newUrl.substring(newUrl.indexOf("&")+1)
    }
    window.history.pushState({path:newUrl},'',newUrl);
    // setPageUrl(newUrl)
    // console.log(PageUrl);
  }

  const handleReset = () => {
    const resetFilter = {
      title: "",
      artist: "",
      date: ['all'],
      genre: ['all'],
      platform: ['all'],
      adult: false, 
      order: { 'title' : 1,
      // 'platform.rank' : 0, 
      },
      dateOperator: ["or"],
      genreOperator: ["or"],
      platformOperator: ["or"],
    };
    handleFilters(resetFilter)
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
                  <TableCell className="list-table-cell" colSpan={4}>
                    <input style={{width: '220px'}} id="title-search" type="text" placeholder='제목을 입력해주세요' onChange={event => handleFilters(event.target.value, "title")} value={Filters.title}/>
                    <label htmlFor="title-search"></label>
                  </TableCell>
                </TableRow>
                <TableRow >
                  <TableCell className="list-table-cell">작가</TableCell>
                  <TableCell className="list-table-cell" colSpan={4}>
                    <input style={{width: '220px'}} id="artist-search" type="text" placeholder='여러 작가 검색시 ,를 사용하세요' onChange={event => handleFilters(event.target.value, "artist")} value={Filters.artist}/>
                    <label htmlFor="artist-search"></label>
                  </TableCell>
                </TableRow>
                <TableRow >
                  <TableCell className="list-table-cell">성인물</TableCell>
                  <TableCell className="list-table-cell"><ToggleAdult adult={Filters.adult} handleFilters={filters => handleFilters(filters, "adult")}/>
                  </TableCell>
                </TableRow>
                <TableRow >
                  <TableCell className="list-table-cell">정렬 방식</TableCell>
                  <TableCell className="list-table-cell" colSpan={4}><SearchOrder order={Filters.order} handleFilters={filters => handleFilters(filters, "order")}/></TableCell>
                </TableRow>
                <TableRow >
                  <TableCell className="list-table-cell">연재요일 <ToggleOperator operator={Filters.dateOperator} handleFilters={filters => handleFilters(filters, "dateOperator")}/></TableCell>
                  {/* 뒤 함수가 이 paraent의 function인거고 앞의 handleFilters는 props로 전달하는 이름뿐인거, 앞의 filters = newChecked, 뒤에껀 그걸 인자로 받은거  */}
                  <TableCell className="list-table-cell" colSpan={4}><SearchDate date={Filters.date} handleFilters={filters => handleFilters(filters, "date")}/></TableCell>
                </TableRow>
                <TableRow >
                  <TableCell className="list-table-cell">플랫폼 <ToggleOperator operator={Filters.platformOperator} handleFilters={filters => handleFilters(filters, "platformOperator")}/></TableCell>
                  <TableCell className="list-table-cell" colSpan={4}><SearchPlatform platform={Filters.platform} handleFilters={filters => handleFilters(filters, "platform")}/></TableCell>
                </TableRow>
                <TableRow >
                  <TableCell className="list-table-cell">장르 <ToggleOperator operator={Filters.genreOperator} handleFilters={filters => handleFilters(filters, "genreOperator")}/></TableCell>
                  <TableCell className="list-table-cell" colSpan={3}><SearchGenre genre={Filters.genre} handleFilters={filters => handleFilters(filters, "genre")}/></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Button onClick={handleReset}> filter reset </Button>
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

// title: "",
// artist: "",
// date: ['all'],
// genre: ['all'],
// genreOperator: "",
// platform: ['all'],
// adult: false,
// order: { 'title' : 1,
// // 'platform.rank' : 0, 
// },
// genreOperator: "",
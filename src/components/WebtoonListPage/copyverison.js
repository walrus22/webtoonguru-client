// import React, { Component } from 'react';
import React, { useEffect, useState } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import WebtoonCard from '../WebtoonCard';
import SearchBox from './SearchBox';



// function WebtoonList() {
//   const [webtoons, setWebtoons] = useState([])
//   const [Skip, setSkip] = useState(0)
//   const [Limit, setLimit] =

//   return (
//     <div>WebtoonList</div>
//   )
// }

// export default WebtoonList

class WebtoonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      webtoons: [],
      skip: 0,
      limit : 50,
      filters : {
        genres: [],

      }
    };
  }

  // componentDidMount() {
  //   axios
  //     .get('http://localhost:5000/api/webtoon/list')
  //     .then(res => {
  //       this.setState({
  //         webtoons: res.data
  //       })
  //   })
  //   .catch(err =>{
  //       console.log('Error from ShowWebtoonList');
  //   })
  // };

  
  render() {
    const webtoons = this.state.webtoons;
    const getSetting = {skip:this.state.skip, limit: this.state.limit}
    // console.log("PrintWebtoon: " + webtoons);
    let webtoonList;

    if(!webtoons) {
      webtoonList = "there is no webtoon record!";
    } else {
      webtoonList = webtoons.map((webtoon, k) =>
        <WebtoonCard webtoon={webtoon} key={k} />
      );
    }

    const getWebtoons = (getSetting) => {
      axios
      .get('http://localhost:5000/api/webtoon/list', getSetting)
      .then(res => {
        this.setState({
          webtoons: res.data
        })
    })
    .catch(err =>{
        console.log('Error from ShowWebtoonList');
    })
    }

    const showFilteredResults = (filters) =>{

    }

    const handleFilters  = (filters, category) => {
      console.log(filters)
      const newFilters = {...this.state.filters}
      newFilters[category] = filters

      // if(category === "")

      this.setState({filters, newFilters})

    }

    return (
      <div className="ShowWebtoonList">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <br />
              <h2 className="display-4 text-center">Webtoons List</h2>
            </div>

            <SearchBox
              handleFilters={filters => handleFilters(filters, "genres")}
            />

            <div className="col-md-11">
              {/* <Link to="/create-webtoon" className="btn btn-outline-warning float-right">
                + Add New Webtoon
              </Link> */}
              <br />
              <br />
              <hr />
            </div>

          </div>

          <div className="list">
                {webtoonList}
          </div>
        </div>
      </div>
    );
  }
}

export default WebtoonList;
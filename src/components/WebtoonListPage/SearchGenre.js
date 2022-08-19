import React, { useState, useEffect } from 'react'
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import '../../App.css';
import genreEngToKor from '../genreEngToKor';

function SearchGenre(props) {
  const [Checked, setChecked] = useState(props.genre) ;// default = all
  const [Genres] = useState(["romance", "drama", "daily", "sensibility", "gag", "fantasy", "thrill/horror", "action", "historical", "school", "sports",  "bl", "gl", "erotic"]);
  
  // console.log(props.genre);
  // console.log(Checked);
  // if(!arrayEquals(Checked, props.genre)){
  //   setChecked(props.genre)
  // } 
  
  useEffect(() => {
    // bringGenres()
    setChecked(props.genre)
  }, [props.genre])

  // const bringGenres = () => {
  //   axios
  //   .post(process.env.REACT_APP_API + 'genre/list')
  //   .then(res => {
  //     // console.log(res.data)
  //     setGenres(res.data)
  //     // console.log(Genres)
  //   })
  //   .catch(err =>{
  //       console.log('Error from ShowWebtoonList');
  //   })
  // }


  const handleToggle = (event, newCheckedEvent) => {
    // console.log("newCheckedEvent: " + newCheckedEvent)
    // newCheckedEvent 가 Checked보다 작아지는 경우 : 언클릭
    // newCheckedEvent 가 Checked보다 커지는 경우 : 클릭

    let value;
    if(Checked.length > newCheckedEvent.length){
      // console.log("Checked is longer")
      value = Checked.filter(x => newCheckedEvent.indexOf(x) === -1)[0]
    } else {
      // console.log("newCheckedEvent is longer")
      value = newCheckedEvent.filter(x => Checked.indexOf(x) === -1)[0]
    }
    
    const currentIndex = Checked.indexOf(value);
    let newChecked = [...Checked];

    // console.log("Filter value:" + value)
    // console.log("typeof value:" + typeof(value))
    // console.log("Checked: " + Checked)

    if(value === "all"){
      //all이 들어있는 경우 무반응
      //기존에 [장르] 인 경우 나머지 체크 풀고 전체만 체크
      if(Checked.indexOf("all") === -1){ 
        newChecked.length = 0
        newChecked.push("all")
      } 
    } else{
      if(Checked.indexOf("all") !== -1){ //all인 경우 all 아닌 장르 선택하면 all 해제, 추가
        newChecked.length = 0
        newChecked.push(value)
      } else{ //all이 아니고 [장르] 있을때 추가
        if(currentIndex === -1){
          newChecked.push(value)
        } else {
          newChecked.splice(currentIndex, 1) // 있으면 지우는거
          if(newChecked.length === 0){
            newChecked.push("all")
          }
        }
      }
    }
        
    // console.log("newChecked:" + newChecked)
    // setChecked(newChecked) 
    props.handleFilters(newChecked, "hello")  // 뒤 인자는 안쓰임..
  }

  return (
    <div> 
      <div>
        <ToggleButtonGroup
          value={Checked}
          onChange={handleToggle}
          aria-label="genreButton"
          size="small"
          // color="success"
          >
          <ToggleButton className="genreToggle" value="all">전체</ToggleButton>
          {Genres?.map((item) => (
            <ToggleButton className="genreToggle" key={item} value={item}>{genreEngToKor(item)}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div>
      {/* <div>
        <ToggleButtonGroup
          value={Checked}
          onChange={handleToggle}
          aria-label="genreButton"
          size="small"
          // sx={{height:"30px"}}
          >
          {Genres?.slice(8).map((item) => (
            <ToggleButton className="genreToggle" key={item} value={item}>{genreEngToKor(item)}</ToggleButton>
          ))}
        </ToggleButtonGroup>
      </div> */}
  </div>
  )
}

export default SearchGenre



/* 과거 유산
                {<div className="btn-group" role="group" aria-label="GenreButtonGroup">
                  <React.Fragment>
                    <input
                      className="btn-check"
                      checked={Checked.indexOf("all") === -1 ? false : true}
                      id={`btn-check-all`}
                      type="checkbox"
                      onChange={() => handleToggle("all")}
                      autoComplete="off"
                    />
                    <label className="btn btn-light btn-sm" htmlFor={`btn-check-all`}>전체</label>
                </React.Fragment>

                {Genres?.slice(0,12).map((value, index) => (
                  <React.Fragment key={index}>
                    <input
                      className="btn-check"
                      checked={Checked.indexOf(value._id) === -1 ? false : true}
                      id={`btn-check-${value._id}`}
                      type="checkbox"
                      onChange={() => handleToggle(value._id)}
                      autoComplete="off"
                    />
                    <label className="btn btn-light btn-sm" htmlFor={`btn-check-${value._id}`}>{value.name}</label>
                  </React.Fragment>
                ))}
              </div>    
              <div className="btn-group" role="group" aria-label="GenreButtonGroup">
                {Genres?.slice(12).map((value, index) => (
                    <React.Fragment key={index}>
                      <input
                        className="btn-check"
                        checked={Checked.indexOf(value._id) === -1 ? false : true}
                        id={`btn-check-${value._id}`}
                        type="checkbox"
                        onChange={() => handleToggle(value._id)}
                        autoComplete="off"
                      />
                      <label className="btn btn-outline-primary" htmlFor={`btn-check-${value._id}`}>{value.name}</label>
                    </React.Fragment>
                  ))}
              </div> }

      <Form>
          {{genres.map((value, index) => (
            <React.Fragment key={index}>
              <Form.Check 
                inline
                checked={Checked.indexOf(value.id) === -1 ? false : true}
                id={`inline-checkbox-${value.id}`}
                type="checkbox"
                onChange={() => handleToggle(value.id)}
              />
              <label className="form-check-label" htmlFor={`inline-checkbox-${value.id}`}>{value.name}</label>
            </React.Fragment>
          ))} }
          </Form>  */

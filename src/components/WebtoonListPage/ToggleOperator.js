import React, { useState, useEffect} from 'react'
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import '../../App.css';

function ToggleOperator(props) {
  // const [Operator, setOperator] = useState("and")
  const [Checked, setChecked] = useState(props.operator)

  useEffect(() => {
    setChecked(props.operator)
  }, [props.operator])

  const handleToggle = (event, newCheckedEvent) => {
    let value = newCheckedEvent.filter(x => Checked.indexOf(x) === -1)[0]; // 같은 버튼 누르면 undefined, 다른 버튼 누르면 해당값
    let newChecked = [...Checked];
    if(value) {
      newChecked = [value]
    } 
    props.handleFilters(newChecked)  
  }



  return (
    <div>
    <ToggleButtonGroup
      value={Checked}
      onChange={handleToggle}
      aria-label="OperatorButton"
      size="small"
      // color="success"
      >
      <ToggleButton className="OperatorToggle" key={2} value="or">OR</ToggleButton>
      <ToggleButton className="OperatorToggle" key={1} value="and">AND</ToggleButton>
    </ToggleButtonGroup>
  </div>
  )


}

export default ToggleOperator



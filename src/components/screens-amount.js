import Select from 'react-select'
import {useContext} from "react";
import {ScreensAmountContext} from "../context/screens-amount-context";

export const ScreensAmount = () => {
  const {screenAmount, setScreenAmount} = useContext(ScreensAmountContext);
  const grid = [
    {value: '2*2', label: '2x2'},
    {value: '3*3', label: '3x3'},
    {value: '4*4', label: '4x4'}
  ]

  const layoutSelectHandler = (data) => {
    setScreenAmount(data.value)
  }

  return (
    <div className="layout">
      <label htmlFor="layout_select">Select layout</label>
      <Select options={grid} defaultValue={{value: '3*3', label: '3*3'}} onChange={layoutSelectHandler}
              isSearchable={false}/>
    </div>
  )
}
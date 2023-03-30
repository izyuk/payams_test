import {useState} from "react";

import Select from 'react-select'

import {Screen} from "./screen";

export const CameraPlayer = () => {

  const [screen, setScreen] = useState(null);


  const usersList = new Array(9).fill().map((e, i) => {
    return {value: i + 1, label: i + 1}
  });
  const screenHandler = (e) => {
    setScreen(e.value);
  }


  return (
    <div className="camera">
      <Screen screen={screen} screensInTotal={usersList[usersList.length - 1].value}/>

      <div className="camera_screen_select">
        <label htmlFor="camera_screen_select">Show user</label>
        <Select options={usersList} onChange={screenHandler}/>
      </div>
    </div>
  )

}
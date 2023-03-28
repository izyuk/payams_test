import {useEffect, useState} from "react";

import Select from 'react-select'

import {Screen} from "./screen";

export const CameraPlayer = ({usersCount}) => {

  const [selectedUser, selectUser] = useState();
  // const selectScreen = (e) => {
  //   console.log(e.value)
  //   // clearAllVideoSrcs();
  //   // document.getElementById(`screen-${e.value}`).appendChild(document.getElementById('video'));
  //   // getVideoResource(videoElement);
  //   selectUser(e.value);
  // }

  return (
    <div className="camera">
      <Screen/>
      <div className="camera_screen_select">
        <label htmlFor="camera_screen_select">Show user</label>
        {/*<Select options={usersCount} isSearchable={false}*/}
        {/*      onChange={selectScreen}*/}
        {/*      defaultValue={{value: 1, label: 1}}/>*/}
      </div>
    </div>
  )

}
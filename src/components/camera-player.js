import { useContext, useState } from "react";

import Select from "react-select";

import { Screen } from "./screen";
import { ScreensAmountContext } from "../context/screens-amount-context";
import { VideoContext } from "../context/video-context";

export const CameraPlayer = () => {
  const { screenAmount, setScreenAmount } = useContext(ScreensAmountContext);
  const { video, setVideo } = useContext(VideoContext);
  const [screen, setScreen] = useState(null);

  const usersList = new Array(eval(screenAmount)).fill().map((e, i) => {
    return { value: i + 1, label: i + 1 };
  });

  const rowsAndColumns = Math.sqrt(usersList[usersList.length - 1].value);
  const screenDimensions = {
    width: video.videoWidth / rowsAndColumns,
    height: video.videoHeight / rowsAndColumns,
  };

  const screenHandler = (e) => {
    setScreen(e.value);
  };

  return (
    <div className="camera">
      <Screen screen={screen} screenDimensions={screenDimensions} rowsAndColumns={rowsAndColumns} />

      <div className="camera_screen_select">
        <label htmlFor="camera_screen_select">Show user</label>
        <Select options={usersList} onChange={screenHandler} />
      </div>
    </div>
  );
};

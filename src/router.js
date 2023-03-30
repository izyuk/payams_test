import { useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";

import { Home } from "./pages/home";
import { MeetingRoom } from "./pages/meeting-room";
import { NotFound } from "./pages/not-found";
import { ScreensAmountContext } from "./context/screens-amount-context";
import { VideoContext } from "./context/video-context";

export const AppRouter = () => {
  const [screenAmount, setScreenAmount] = useState("3*3");
  const [video, setVideo] = useState(null);

  const screenAmountProvider = useMemo(
    () => ({ screenAmount, setScreenAmount }),
    [screenAmount, setScreenAmount],
  );

  const videoProvider = useMemo(() => ({ video, setVideo }), [video, setVideo]);

  return (
    <ScreensAmountContext.Provider value={screenAmountProvider}>
      <VideoContext.Provider value={videoProvider}>
        <Routes>
          <Route path={"/"} element={<Home />} errorElement={<NotFound />} />
          <Route path={"/meeting/:meetingId"} element={<MeetingRoom amountOfScreens={3} />} />
          <Route path={"*"} element={<NotFound />} />
        </Routes>
      </VideoContext.Provider>
    </ScreensAmountContext.Provider>
  );
};

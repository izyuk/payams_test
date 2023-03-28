import {useMemo, useState} from "react";
import {Route, Routes} from "react-router-dom";

import {Home} from "./pages/home";
import {MeetingRoom} from "./pages/meeting-room";
import {NotFound} from "./pages/not-found";
import {ScreensAmountContext} from "./context/screens-amount-context";

export const AppRouter = () => {
  const [screenAmount, setScreenAmount] = useState('3*3');

  const screenAmountProvider = useMemo(() => ({screenAmount, setScreenAmount}), [screenAmount, setScreenAmount])

  return (
    <ScreensAmountContext.Provider value={screenAmountProvider}>
      <Routes>
        <Route path={"/"} element={<Home/>} errorElement={<NotFound/>}/>
        <Route path={"/meeting/:meetingId"} element={<MeetingRoom numUsers={3}/>}/>
        <Route path={"*"} element={<NotFound/>}/>
      </Routes>
    </ScreensAmountContext.Provider>
  )
}
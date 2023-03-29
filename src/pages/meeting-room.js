import {
  useEffect, useState
} from "react";

import {Link} from "react-router-dom";

import {CameraPlayer} from "../components/CameraPlayer";

import {getVideoResource} from "../hooks/useVideo";

export const MeetingRoom = ({numUsers}) => {

  useEffect(() => {
    const hls = getVideoResource();
    if (!hls)
      console.warn('HLS is not supported by your browser');


    return () => {
      if (hls) {
        console.log('Free memory');
        hls.destroy();
      }
    }
  }, [])


  return (
    <div>
      <div className="head">
        <nav className="links">
          <ul>
            <li>
              <p>Return to <Link to="/">Home page</Link></p>
            </li>
          </ul>
        </nav>
      </div>
      <div className="grid">
        <CameraPlayer/>
        <CameraPlayer/>
        <CameraPlayer/>
      </div>
      <video id="video"/>

    </div>
  )
}
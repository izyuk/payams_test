import {
  useEffect, useState
} from "react";

import {Link} from "react-router-dom";

import {CameraPlayer} from "../components/CameraPlayer";

import {getVideoResource} from "../hooks/useVideo";
import {Loader} from "../components/loader";

export const MeetingRoom = ({amountOfScreens}) => {
  const [video, setVideo] = useState(null)
  const [isReadyToPlay, updateReadinessToPlay] = useState(false);

  useEffect(() => {
    const video = document.getElementById("video");
    setVideo(video);
  }, [])

  useEffect(() => {
    if (!video) return;
    video.addEventListener('playing', () => updateReadinessToPlay(true))
    return () => video.addEventListener('playing', () => updateReadinessToPlay(false));
  }, [video])

  useEffect(() => {
    const hls = getVideoResource();
    if (!hls)
      console.warn('HLS is not supported by your browser');

    return () => {
      if (hls) {
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

      {
        isReadyToPlay ? <div className="grid">
          {
            [...Array(amountOfScreens)].map((item, i) => {
              return <CameraPlayer key={i} isReadyToPlay={isReadyToPlay}/>
            })
          }
        </div> :
          <Loader />
      }

      <video id="video" muted={true}/>

    </div>
  )
}
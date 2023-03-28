import {
  useEffect, useState
} from "react";

import {Link} from "react-router-dom";

import {CameraPlayer} from "../components/CameraPlayer";

import {getVideoResource} from "../hooks/useVideo";

export const MeetingRoom = ({numUsers}) => {

  const [hlsInstance, setHlsInstance] = useState(null);


  const usersCount = new Array(9).fill().map((e, i) => {
    return {value: i + 1, label: i + 1}
  });

  useEffect(() => {
    const hls = getVideoResource();
    if (hls) {
      setHlsInstance(hls);
    } else {
      console.warn('HLS is not supported by your browser');
    }
    return () => {
      if (hlsInstance) {
        console.log('Free memory');
        hlsInstance.destroy();
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
        <CameraPlayer usersCount={usersCount}/>
        <CameraPlayer usersCount={usersCount}/>
        <CameraPlayer usersCount={usersCount}/>
      </div>

      <video id="video"/>

    </div>
  )
}
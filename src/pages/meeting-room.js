import { useContext, useEffect, useState } from "react";

import { Link } from "react-router-dom";

import { CameraPlayer } from "../components/camera-player";

import { getVideoResource } from "../heplers/video-helpers";
import { Loader } from "../components/loader";
import { ScreensAmount } from "../components/screens-amount";
import { VideoContext } from "../context/video-context";

export const MeetingRoom = ({ amountOfScreens }) => {
  const { video, setVideo } = useContext(VideoContext);
  const [isReadyToPlay, updateReadinessToPlay] = useState(false);

  useEffect(() => {
    const video = document.getElementById("video");
    setVideo(video);
  }, []);

  useEffect(() => {
    if (!video) return;
    video.addEventListener("playing", () => updateReadinessToPlay(true));
    return () => video.addEventListener("playing", () => updateReadinessToPlay(false));
  }, [video]);

  useEffect(() => {
    const hls = getVideoResource();
    if (!hls) console.warn("HLS is not supported by your browser");

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, []);

  return (
    <div>
      <div className="head">
        <nav className="links">
          <ul>
            <li>
              <p>
                Return to <Link to="/">Home page</Link>
              </p>
            </li>
          </ul>
        </nav>
        <ScreensAmount />
      </div>

      {isReadyToPlay ? (
        <>
          <div className="grid">
            <h2>For better experience make sure you're selected correct stream layout</h2>
            <h3>
              If the input layout is different from the selected one, it will cause the stream to be
              clipped incorrectly
            </h3>
            <div className="wrap">
              {[...Array(amountOfScreens)].map((item, i) => {
                return <CameraPlayer key={i} isReadyToPlay={isReadyToPlay} />;
              })}
            </div>
          </div>
        </>
      ) : (
        <Loader />
      )}

      <video id="video" muted={true} />
    </div>
  );
};

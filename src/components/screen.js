import {useEffect, useRef, useState} from "react";

export const Screen = () => {
  const canvas = useRef(null);
  const [video, setVideo] = useState(null);
  const [context, saveContext] = useState(null);

  useEffect(() => {
    if (!video) return;
    let i;
    video.addEventListener('play', () => requestAnimationFrame(updateCanvas), false)
    return () => video.removeEventListener('play', () => requestAnimationFrame(updateCanvas), false);
  }, [video, context])

  const updateCanvas = () => {
    if (!video) return;
    if (video.ended || video.paused) return;

    console.log(context);
    console.log(video.videoWidth);
    context.drawImage(video,
      0, 0, video.videoWidth/3, video.videoHeight/3,
      0, 0, video.videoWidth/3, video.videoHeight/3);

    requestAnimationFrame(updateCanvas)
  }

  useEffect(() => {
    const video = document.getElementById("video");
    const context = canvas.current.getContext('2d');
    saveContext(context)
    setVideo(video);

  }, []);


  return (
    <div className='screen'>
      <canvas ref={canvas}/>
    </div>
  )
}

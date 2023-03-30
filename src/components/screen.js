import { useEffect, useRef, useState } from "react";

export const Screen = ({ screen, screensInTotal }) => {
  const canvas = useRef(null);
  const [video, setVideo] = useState(null);
  const [context, saveContext] = useState(null);

  const [canvasData, setCanvasParams] = useState(null);

  useEffect(() => {
    if (!video) return;
    requestAnimationFrame(updateCanvas);
  }, [video, context, canvasData]);

  const updateCanvas = () => {
    if (!video || video.ended || video.paused) return;
    if (!canvas.current) return;
    if (!canvasData) return;

    const {
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      destinationX,
      destinationY,
      destinationWidth,
      destinationHeight,
    } = canvasData;

    context.drawImage(
      video,
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      destinationX,
      destinationY,
      destinationWidth,
      destinationHeight,
    );

    requestAnimationFrame(updateCanvas);
  };

  const cropHandler = () => {
    if (!screen) return;
    let sourceX, sourceY, sourceWidth, sourceHeight;
    let destinationX = 0,
      destinationY = 0;
    let destinationWidth = canvas.current.clientWidth;
    let destinationHeight = canvas.current.clientHeight;

    const rowsAndColumns = Math.sqrt(screensInTotal);
    let inRow = Math.floor((screen - 1) / rowsAndColumns);
    let inColumn = Math.floor((screen - 1) % rowsAndColumns);

    sourceX = (video.videoWidth * inColumn) / rowsAndColumns;
    sourceY = (video.videoHeight * inRow) / rowsAndColumns;
    sourceWidth = video.videoWidth / rowsAndColumns;
    sourceHeight = video.videoHeight / rowsAndColumns;

    setCanvasParams({
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      destinationX,
      destinationY,
      destinationWidth,
      destinationHeight,
    });
  };

  useEffect(() => {
    if (video) {
      video.muted = false;
    }
  }, [screen]);

  useEffect(() => {
    if (video) {
      cropHandler();
    }
  }, [screen, video]);

  useEffect(() => {
    const video = document.getElementById("video");
    const context = canvas.current.getContext("2d");
    saveContext(context);
    setVideo(video);
  }, []);

  return (
    <div className="screen">
      <canvas ref={canvas} width={320} height={240} />
    </div>
  );
};

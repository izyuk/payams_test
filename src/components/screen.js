import {useEffect, useRef, useState} from "react";

export const Screen = ({screen, screensInTotal}) => {
  const canvas = useRef(null);
  const [video, setVideo] = useState(null);
  const [context, saveContext] = useState(null);

  const [canvasData, setCanvasParams] = useState(null);

  useEffect(() => {
    if (!video) return;
    requestAnimationFrame(updateCanvas);
  }, [video, context, canvasData])

  const updateCanvas = () => {
    if (!video || (video.ended || video.paused)) return;
    if (!canvas.current) return;
    if (!canvasData) return;

    const {
      sourceX, sourceY, sourceWidth, sourceHeight,
      destinationX, destinationY, destinationWidth, destinationHeight
    } = canvasData;

    context.drawImage(video,
      sourceX, sourceY, sourceWidth, sourceHeight,
      destinationX, destinationY, destinationWidth, destinationHeight)

    requestAnimationFrame(updateCanvas)
  }

  const cropHandler = () => {
    if (!screen) return
    let sourceX, sourceY, sourceWidth, sourceHeight;
    let destinationX = 0, destinationY = 0;
    let destinationWidth = canvas.current.clientWidth;
    let destinationHeight = canvas.current.clientWidth/1.33;

    const rowsAndColumns = Math.sqrt(screensInTotal);

    /**   y->j
     * x-> i[123]
     *      [456]
     *      [789]
     */

    console.log("selected screen: ", screen)

    let inRow = Math.floor((screen - 1) / rowsAndColumns);
    let inColumn = Math.floor((screen - 1) % rowsAndColumns);

    // console.log('In row: ', inRow);
    // console.log('In Column: ', inColumn);
    // console.log("maxRows: ", maxRows, "maxColumns: ", maxColumns)

    console.log('screen: ', screen, "in row: ", inRow, "in column: ", inColumn);

    sourceX = video.videoWidth * inColumn / rowsAndColumns ;
    sourceY = video.videoHeight * inRow / rowsAndColumns ;
    sourceWidth = video.videoWidth / rowsAndColumns;
    sourceHeight = video.videoHeight / rowsAndColumns;

    console.log(sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      destinationX,
      destinationY,
      destinationWidth,
      destinationHeight);

    setCanvasParams({
      sourceX,
      sourceY,
      sourceWidth,
      sourceHeight,
      destinationX,
      destinationY,
      destinationWidth,
      destinationHeight
    })

    /**
     * sx => videoWidth
     * */
  }

  useEffect(() => {
    if (video) cropHandler();
  }, [screen, video])

  useEffect(() => {
    const video = document.getElementById("video");
    const context = canvas.current.getContext('2d');
    saveContext(context)
    setVideo(video);
    console.log(screen)
  }, []);


  return (
    <div className='screen'>
      <canvas ref={canvas}/>
    </div>
  )
}

import Hls from "hls.js";
export const getVideoResource = () => {

  const videoSrc = 'https://s138.lab.sgigs.com/HLS/playlist.m3u8';
  const element = document.getElementById('video');

  if (Hls.isSupported()) {
    const hls = new Hls();

    hls.loadSource(videoSrc);

    hls.attachMedia(element);

    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      element.play();
    });

    return hls;

  } else {
    return null
  }
}
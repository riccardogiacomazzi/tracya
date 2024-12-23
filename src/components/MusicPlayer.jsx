import React, { useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { useMusicPlayer } from "./MusicPlayerContext.jsx";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Typography } from "@mui/material";
import discography from "../assets/discography.js";

const MusicPlayer = () => {
  const {
    currentTrack,
    setCurrentTrack,
    isPlaying,
    setIsPlaying,
    playingIndex,
    setPlayingIndex,
    nextTrack,
    prevTrack,
  } = useMusicPlayer();
  const playerRef = useRef(null);

  let currentTrackUrl = currentTrack?.tracklist?.[playingIndex]?.url || currentTrack?.player || "";

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * discography.length);
    const randomAlbum = discography[randomIndex];

    if (randomAlbum && randomAlbum.tracklist && randomAlbum.tracklist.length > 0) {
      setCurrentTrack(randomAlbum);
    }
  }, []);

  return (
    <div>
      <div className="music-player">
        <div className="buttons-container">
          <div onClick={prevTrack} className="button">
            <SkipPreviousIcon />
          </div>
          <div onClick={() => setIsPlaying(!isPlaying)} className="button">
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </div>
          <div onClick={nextTrack} className="button">
            <SkipNextIcon />
          </div>
        </div>
        <div className="text-container">
          <div className="scrolling-text">
            {currentTrack && currentTrack.tracklist[playingIndex].title && isPlaying && (
              <Typography fontSize={17} fontFamily={"Heming"}>
                Playing: "{currentTrack.tracklist[playingIndex].title.toUpperCase()}" from{" "}
                {currentTrack.title.toUpperCase()}
              </Typography>
            )}{" "}
          </div>
        </div>
      </div>

      <ReactPlayer
        ref={playerRef}
        url={currentTrackUrl}
        playing={isPlaying}
        controls
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        width="0"
        height="0"
        style={{ display: currentTrack ? "block" : "none" }}
      />
    </div>
  );
};

export default MusicPlayer;

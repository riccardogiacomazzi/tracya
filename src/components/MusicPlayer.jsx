import React, { useRef } from "react";
import ReactPlayer from "react-player";
import { useMusicPlayer } from "./MusicPlayerContext.jsx";

import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";

const MusicPlayer = () => {
  const { currentTrack, isPlaying, setIsPlaying } = useMusicPlayer();
  const playerRef = useRef(null);

  return (
    <div>
      <div className="music-player">
        <div className="buttons-container">
          <div>
            <SkipPreviousIcon />
          </div>
          <div onClick={() => setIsPlaying(!isPlaying)}>{isPlaying ? <PauseIcon /> : <PlayArrowIcon />}</div>
          <div>
            <SkipNextIcon />
          </div>
        </div>
        <div className="text-container">
          <div className="scrolling-text">title here</div>
        </div>
      </div>

      <ReactPlayer
        ref={playerRef}
        url={currentTrack || null}
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

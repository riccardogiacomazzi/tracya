import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import { useMusicPlayer } from "../MusicPlayerContext.jsx";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { Typography } from "@mui/material";
import discography from "../../assets/discography.js";
import { useWindowSize } from "@uidotdev/usehooks";

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

  const size = useWindowSize();

  const playerRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  let currentTrackUrl = currentTrack?.tracklist?.[playingIndex]?.url || currentTrack?.player || "";

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * discography.length);
    const randomAlbum = discography[randomIndex];

    if (randomAlbum && randomAlbum.tracklist && randomAlbum.tracklist.length > 0) {
      setCurrentTrack(randomAlbum);
    }
  }, []);

  // reset bar on new track loaded
  useEffect(() => {
    setProgress(0);
  }, [currentTrack]);

  // Update progress bar based on track progress
  const handleProgress = (state) => {
    setProgress(state.played * 100);
  };

  // Get duration of the track
  const handleDuration = (duration) => {
    setDuration(duration);
  };

  // handle advancing in progress bar
  const handleSeek = (e) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    if (playerRef.current) {
      playerRef.current.seekTo((newProgress / 100) * duration, "seconds");
    }
  };

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
                Playing: {currentTrack.tracklist[playingIndex].title.toUpperCase()} from{" "}
                {currentTrack.title.toUpperCase()}
              </Typography>
            )}
          </div>
        </div>

        {size.width > 768 && (
          <div className="player-progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
            <input
              type="range"
              min="0"
              max="100"
              step="0.1"
              value={progress}
              onChange={handleSeek}
              className="progress-slider"
            />
          </div>
        )}
      </div>

      <ReactPlayer
        ref={playerRef}
        url={currentTrackUrl}
        playing={isPlaying}
        controls
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onDuration={handleDuration}
        onProgress={handleProgress}
        onEnded={nextTrack}
        width="0"
        height="0"
        style={{ display: currentTrack ? "block" : "none" }}
      />
    </div>
  );
};

export default MusicPlayer;

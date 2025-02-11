import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import "./Sidebar.css";
import { useMusicPlayer } from "../MusicPlayerContext";

const Sidebar = ({ pages, size }) => {
  const [selectedPage, setSelectedPage] = useState();
  const { playTrack, currentTrack, playingIndex, isPlaying, progress, setProgress, playerRef } = useMusicPlayer();

  const handlePageSelect = (item) => {
    setSelectedPage(item);
  };

  const handleSeek = (e) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);

    if (playerRef.current) {
      const duration = playerRef.current.getDuration();
      playerRef.current.seekTo((newProgress / 100) * duration);
    }
  };

  return (
    <div className="sidebar">
      <div className="vertical-navigation">
        {size.width > 768 && <MusicPlayer />}
        <div className="title-container" onClick={() => setSelectedPage()}>
          {size.width < 768 && <MusicPlayer />}
          <Typography
            align="left"
            fontFamily={"Agnes"}
            fontSize={size.width > 768 ? "70px" : "30px"}
            sx={{
              writingMode: size.width > 768 ? "vertical-rl" : "",
              textOrientation: "upright",
              outline: "none",
              marginBottom: "-5px",
            }}
          >
            <Link to={"/"} style={{ color: "black" }}>
              Tracya
            </Link>
          </Typography>
        </div>
        <div className="pages-buttons-container">
          {pages.map((item, index) => (
            <Link
              to={`/${item.replace(/ /g, "_").toLowerCase()}`}
              style={{ color: "black" }}
              className="link-outlines"
              key={index}
            >
              <Typography
                onClick={() => handlePageSelect(item)}
                fontSize={size.width > 768 && "14px"}
                align={"center"}
                style={{
                  textDecoration: selectedPage === item && "underline",
                  height: size.width > 768 && "30px",
                }}
              >
                {item.toLocaleUpperCase()}
              </Typography>
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Progress Bar */}
      {size.width < 768 && currentTrack && (
        <div className="player-progress-bar">
          <input
            type="range"
            min="0"
            max="100"
            step="0.1"
            value={progress}
            onChange={handleSeek}
            className="progress-slider"
          />
          <div className="progress-info">
            <Typography>Playing:</Typography> <Typography>{currentTrack.tracklist[playingIndex]?.title}</Typography>
          </div>
          <div className="progress-fill" style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;

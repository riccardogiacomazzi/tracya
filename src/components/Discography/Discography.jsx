import ReactPlayer from "react-player";
import { useMusicPlayer } from "../MusicPlayerContext";
import discography from "../../assets/discography";
import { Typography, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import "./Discography.css";

import { useState, useEffect, useRef } from "react";

const Discography = ({ size }) => {
  const [releases, setReleases] = useState([]);
  const [playerOpen, setPlayerOpen] = useState([]);
  const [imageLoad, setImageLoad] = useState(false);

  const { playTrack, currentTrack, playingIndex, isPlaying } = useMusicPlayer();

  const [height, setHeight] = useState([]);
  const refs = useRef([]);

  useEffect(() => {
    const fetch = () => {
      let sortedDiscography = discography.sort((a, b) => b.year - a.year);
      setReleases(sortedDiscography);
    };

    fetch();
  }, []);

  useEffect(() => {
    const updatedPlayer = releases.map(() => false);
    setPlayerOpen(updatedPlayer);
  }, [releases]);

  // set .release div height
  useEffect(() => {
    if (refs.current.length > 0 && height.length === 0 && size.width < 768) {
      setTimeout(() => {
        const newHeight = refs.current.map((ref) => {
          if (ref) {
            if (ref.offsetHeight > 500) {
              return ref.offsetHeight;
            } else {
              return 500;
            }
          }
          return 0;
        });
        setHeight(newHeight);
      }, 500);
    } else if (refs.current.length > 0 && height.length === 0) {
      setTimeout(() => {
        const newHeight = refs.current.map((ref) => {
          if (ref) {
            return ref.offsetHeight;
          }
          return 0;
        });
        setHeight(newHeight);
      }, 500);
    }
  }, [releases, height, size]);

  const handlePlayerOpen = (index) => {
    const updatedPlayer = [...playerOpen];
    if (releases[index].player) {
      updatedPlayer[index] = !updatedPlayer[index];
    }
    setPlayerOpen(updatedPlayer);
  };

  const handleImageLoad = () => {
    setImageLoad(true);
  };

  return (
    <div className="discography-main">
      <div className="disc-release-container">
        {releases &&
          releases.map((item, index) => (
            <div className="release-container">
              {size.width > 768 && (
                <div className="ep-title-info">
                  <Typography
                    sx={{
                      marginTop: size.width < 768 && "10px",
                    }}
                  >
                    {size.width > 768 && (
                      <>
                        <b>
                          {item.artist} - {item.title}
                        </b>
                        <br />
                      </>
                    )}
                    {item.year}
                  </Typography>
                </div>
              )}
              <div
                key={index}
                className="release"
                ref={(el) => (refs.current[index] = el)}
                style={{
                  height: height.length === releases.length && `${height[index]}px`,
                  minHeight:
                    playerOpen[index] &&
                    height.length === releases.length &&
                    height[index] < 460 &&
                    size.width < 768 &&
                    "500px",
                  transition: "min-height 0.5s ease",
                  maxHeight: height[index],
                }}
              >
                {playerOpen[index] === false ? (
                  <>
                    {size.width < 768 && (
                      <Typography>
                        <b>
                          {item.artist} - {item.title}
                        </b>
                        <br />
                        <p>{item.year}</p>
                      </Typography>
                    )}

                    <div className="image-container" style={{ height: "250px" }}>
                      <img onClick={() => handlePlayerOpen(index)} src={item.thumb} className="image-release" />
                      <br />
                    </div>

                    <Box className="release-info">
                      <Box className="info-container-grid">
                        <div className="item-tracklist">
                          {item.tracklist.map((track, trackIndex) => (
                            <Typography
                              sx={{
                                transition: "background-color 0.3s, color 0.3s",
                                backgroundColor:
                                  currentTrack.title === item.title && playingIndex == trackIndex
                                    ? "black"
                                    : "transparent",
                                color:
                                  currentTrack.title === item.title && playingIndex == trackIndex ? "white" : "black",
                                display: "flex",
                                height: "100%",
                                justifyContent: "space-between",
                                alignItems: "center",
                                width: "100%",
                                px: "5px",
                                py: "5px",
                                ":hover": {
                                  cursor: "pointer",
                                  backgroundColor: "black",
                                  color: "white",
                                },
                              }}
                              align="left"
                              key={trackIndex}
                              onClick={() => playTrack(item, trackIndex)}
                            >
                              <div className="title">
                                <div>{trackIndex + 1 + "."}</div>
                                <p>{track.title}</p>
                              </div>

                              <p>{track.duration}</p>
                            </Typography>
                          ))}
                        </div>
                      </Box>
                    </Box>
                  </>
                ) : (
                  <>
                    <Box className="player-container">
                      {item.player && (
                        <ReactPlayer
                          url={item.player}
                          width="100%"
                          height="100%"
                          playing={false}
                          controls={size.width > 768 ? false : true}
                        />
                      )}
                    </Box>
                    <Box>
                      <IconButton onClick={() => handlePlayerOpen(index)}>
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  </>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Discography;

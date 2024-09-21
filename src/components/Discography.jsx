import discogsService from "../services/discogsService";
import ReactPlayer from "react-player";
import discography from "../assets/discography";
import { Typography, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useState, useEffect, useRef } from "react";

const Discography = ({ size }) => {
  const [releases, setReleases] = useState([]);
  const [playerOpen, setPlayerOpen] = useState([]);
  const [imageLoad, setImageLoad] = useState(false);

  const [height, setHeight] = useState([]);
  const refs = useRef([]);

  useEffect(() => {
    const fetch = () => {
      setReleases(discography);
    };

    fetch();
  }, []);

  useEffect(() => {
    const updatedPlayer = releases.map(() => false);
    setPlayerOpen(updatedPlayer);
  }, [releases]);

  // set .release div height
  useEffect(() => {
    if (refs.current.length > 0 && height.length === 0) {
      setTimeout(() => {
        const newHeight = refs.current.map((ref) => {
          if (ref) {
            return ref.offsetHeight;
          }
          return 0;
        });
        setHeight(newHeight);
      }, 100);
    }
  }, [releases, height]);

  const handlePlayerOpen = (index) => {
    const updatedPlayer = [...playerOpen];
    updatedPlayer[index] = !updatedPlayer[index];
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
            <div
              key={index}
              className="release"
              ref={(el) => (refs.current[index] = el)}
              style={{
                height: height.length === releases.length && `${height[index]}px`,
              }}
            >
              {playerOpen[index] === false ? (
                <>
                  {size.width < 700 && (
                    <Typography>
                      <b>
                        {item.artist} - {item.title}
                      </b>
                    </Typography>
                  )}
                  <div className="image-container">
                    <img onClick={() => handlePlayerOpen(index)} src={item.thumb} className="image-release" />
                    <br />
                  </div>

                  <Box className="release-info">
                    <div>
                      <Typography
                        sx={{
                          wordWrap: "break-word",
                          overflowWrap: "break-word",
                          whiteSpace: "normal",
                          marginTop: size.width < 700 && "10px",
                        }}
                      >
                        {size.width > 700 && (
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
                    <Box className="info-container-grid">
                      <div className="item-tracklist">
                        {item.tracklist.map((track, trackIndex) => (
                          <Typography
                            sx={{
                              ":hover": {
                                cursor: "pointer",
                              },
                            }}
                            align="left"
                            key={trackIndex}
                            onClick={() => handlePlayerOpen(index)}
                          >
                            <b>{track.title}</b> {track.duration}
                          </Typography>
                        ))}
                      </div>
                      <div className="item-genre">
                        <div>
                          <Typography align="right">
                            {item.styles.map((style, index) => (
                              <span key={index}>{style} </span>
                            ))}
                          </Typography>
                        </div>
                        <Typography align="right" sx={{ marginTop: "20px" }}>
                          <i>{item.label}</i>
                        </Typography>
                      </div>
                    </Box>
                  </Box>
                  <Box className="button-container"></Box>
                </>
              ) : (
                <>
                  <Box className="player-container">
                    {item.player && (
                      <ReactPlayer
                        url={item.player}
                        width="100%"
                        height="100%"
                        playing={false} // Controls if the player should play automatically
                        controls={size.width > 700 ? false : true} // Show controls
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
          ))}
      </div>
      {size.width > 700 && (
        <Box className="disc-img-container">
          <img
            className={`disc-img ${imageLoad ? "loaded" : ""}`}
            src="https://live.staticflickr.com/65535/53499079679_09e89593e7_o.jpg"
            onLoad={handleImageLoad}
          />
        </Box>
      )}
    </div>
  );
};

export default Discography;

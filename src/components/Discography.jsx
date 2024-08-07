import discogsService from "../services/discogsService";
import ReactPlayer from "react-player";
import discography from "../assets/discography";
import { Typography, Box, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import { useState, useEffect } from "react";

const Discography = () => {
  const [releases, setReleases] = useState([]);
  const [playerOpen, setPlayerOpen] = useState([]);

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

  const handlePlayerOpen = (index) => {
    const updatedPlayer = [...playerOpen];
    updatedPlayer[index] = !updatedPlayer[index];
    setPlayerOpen(updatedPlayer);
  };

  return (
    <div>
      {releases &&
        releases.map((item, index) => (
          <Box key={index} className="release">
            {playerOpen[index] === false ? (
              <>
                <Box className="image-container">
                  <img onClick={() => handlePlayerOpen(index)} src={item.thumb} className="image-release" />
                  <br />
                </Box>

                <Box className="release-info">
                  <Box>
                    <Typography
                      sx={{
                        wordWrap: "break-word",
                        overflowWrap: "break-word",
                        whiteSpace: "normal",
                      }}
                    >
                      <b>
                        {item.artist} - {item.title}
                      </b>
                      <br />
                      {item.year}
                    </Typography>
                  </Box>
                  <Box className="info-container-grid">
                    <div className="item">
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
                    <div className="item">
                      <Typography align="right">
                        {item.styles.map((style, index) => (
                          <span key={index}>{style} </span>
                        ))}
                      </Typography>
                      <Typography align="right">
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
                      controls={false} // Show controls
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
          </Box>
        ))}
    </div>
  );
};

export default Discography;

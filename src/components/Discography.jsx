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
    const fetch = async () => {
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
                  <Typography sx={{ wordWrap: "break-word", overflowWrap: "break-word", whiteSpace: "normal" }}>
                    <b>
                      {item.artist} - {item.title}
                    </b>
                    <br />
                    {item.year}
                  </Typography>
                </Box>
                <Box className="info-container">
                  <div>
                    {item.tracklist.map((track, index) => (
                      <Typography align="left" key={index}>
                        <b>{track.title}</b> {track.duration}
                      </Typography>
                    ))}
                  </div>
                  <div>
                    <Typography align="right">
                      {item.styles.map((style, index) => (
                        <span key={index}>{style} </span>
                      ))}
                    </Typography>
                    <Typography align="right">
                      <b>{item.label}</b>
                    </Typography>
                  </div>
                </Box>
                <Box className="button-container"></Box>
              </>
            ) : (
              <>
                <Box className="player-container">
                  {item.player && (
                    <ReactPlayer
                      style={{ background: "none" }}
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

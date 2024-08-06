import discogsService from "../services/discogsService";
import ReactPlayer from "react-player";
import discography from "../assets/discography";
import { Typography, Box } from "@mui/material";

import { useState, useEffect } from "react";

const Discography = () => {
  const [releases, setReleases] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      setReleases(discography);
    };

    fetch();
  }, []);

  return (
    <div>
      {releases &&
        releases.map((item, index) => (
          <Box key={index} className="release">
            <Box className="image-container">
              <img src={item.thumb} className="image-release" />
              <Typography>
                {item.title}
                <br />
                {item.year}
              </Typography>
            </Box>
            <Box className="player-container">
              {item.player && (
                <ReactPlayer
                  style={{ background: "none" }}
                  url={item.player}
                  width="100%"
                  height="100%"
                  playing={false} // Controls if the player should play automatically
                  controls={true} // Show controls
                />
              )}
            </Box>
          </Box>
        ))}
    </div>
  );
};

export default Discography;

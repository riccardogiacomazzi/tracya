import { useState, useEffect } from "react";
import { Typography, Box, IconButton } from "@mui/material";
import ReactPlayer from "react-player";
import liveSets from "../assets/liveSets";

const LiveSets = () => {
  const [live, setLive] = useState([]);

  useEffect(() => {
    setLive(liveSets);
  }, [live]);

  return (
    <div className="live-grid">
      {live.map((item, index) => (
        <Box className="grid-item" key={index}>
          <div className="info">
            <Typography align="left">{item.event}</Typography>
            <Typography align="right">{item.location}</Typography>
          </div>
          <ReactPlayer
            style={{ paddingLeft: "5px", paddingRight: "5px" }}
            url={item.url}
            width="100%"
            height="80%"
            playing={false}
            controls={true}
          />
          <div className="info">
            <Typography align="left">Equipment:</Typography>
            <Typography align="right">
              {item.equipment.map((item) => (
                <span>{item} </span>
              ))}
            </Typography>
          </div>
        </Box>
      ))}
    </div>
  );
};

export default LiveSets;

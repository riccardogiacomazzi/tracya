import { useState } from "react";
import ReactPlayer from "react-player";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import P5Wrapper from "../assets/P5Wrapper";
import sketchPath from "../assets/sketchPath";

const ThePath = () => {
  const [canvasKey, setCanvasKey] = useState(0);
  const [artworkIndex, setArtworkIndex] = useState(0);

  const handleImageClick = () => {
    setCanvasKey((prevKey) => prevKey + 1);
  };

  const handleButtonClick = (value) => {
    if (value < 0 && artworkIndex >= 0) {
      setArtworkIndex(artworkIndex + value);
      console.log(artworkIndex);
    } else if (value > 0) {
      console.log(value);

      setArtworkIndex(artworkIndex + value);
      console.log(artworkIndex);
    }
  };

  return (
    <div className="path-container">
      <div className="wrapper" onClick={handleImageClick}>
        <P5Wrapper sketch={sketchPath} canvasKey={canvasKey} />
      </div>
      <div className="player">
        <ReactPlayer url={"https://youtu.be/ekdgpXHxIWc?si=uuggCQJOyF_dvCXZ"} playing={false} controls={true} />
      </div>
      {/* <div className="artworks">
        <div
          className="buttons"
          onClick={() => {
            handleButtonClick(-1);
          }}
        >
          <IconButton>
            <ArrowBackIcon />
          </IconButton>
        </div>
        <div className="img">
          <img src={AssetThePath[0].asset} />
        </div>
        <div
          className="buttons"
          onClick={() => {
            handleButtonClick(1);
          }}
        >
          <IconButton>
            <ArrowForwardIcon />
          </IconButton>
        </div>
      </div> */}
    </div>
  );
};

export default ThePath;

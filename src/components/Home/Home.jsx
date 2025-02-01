import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Discography from "../Discography/Discography";
import VisualArt from "../VisualArt/VisualArt";
import Info from "../Info/Info";
import LiveSets from "../LiveSets/LiveSets";
import "./Home.css";
import { Typography } from "@mui/material";
import { Height } from "@mui/icons-material";

const Home = ({ size, itemData }) => {
  return (
    <div className="home-pages">
      <Link to={"/xyz"} style={{ color: "black" }}>
        <img className="image" src="https://live.staticflickr.com/65535/53726399750_65be5b34fa_o.jpg"></img>
      </Link>
      <div className="page">
        <Typography className="pages-text" fontFamily={"Agnes"} fontSize={36}>
          Discography
        </Typography>
        <Discography size={size} />
      </div>
      <div className="page">
        <Typography className="pages-text" fontFamily={"Agnes"} fontSize={36}>
          Live Sets
        </Typography>
        <LiveSets className="main-content" size={size} />
      </div>
      <div className="visual-art">
        <Link to={"/visual_art"} style={{ color: "black" }}>
          <Typography className="pages-text" fontFamily={"Agnes"} fontSize={36}>
            Visual Art
          </Typography>
          <VisualArt itemData={itemData} size={size} />
        </Link>
      </div>
      <div className="page">
        <Typography className="pages-text" fontFamily={"Agnes"} fontSize={36}>
          Info
        </Typography>
        <Info size={size} className="info-page" />
      </div>
    </div>
  );
};

export default Home;

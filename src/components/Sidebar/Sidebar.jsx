import { useState } from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import "./Sidebar.css";

const Sidebar = ({ pages, size }) => {
  const [selectedPage, setSelectedPage] = useState();

  const handlePageSelect = (item) => {
    setSelectedPage(item);
  };

  return (
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
              style={{ textDecoration: selectedPage === item && "underline", height: size.width > 768 && "30px" }}
            >
              {item.toLocaleUpperCase()}
            </Typography>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

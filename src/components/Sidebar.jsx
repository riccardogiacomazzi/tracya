import { useState } from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import MusicPlayer from "./MusicPlayer";

const Sidebar = ({ pages, size }) => {
  const [selectedPage, setSelectedPage] = useState();

  const handlePageSelect = (item) => {
    setSelectedPage(item);
  };

  return (
    <div className="vertical-navigation">
      {" "}
      {size.width > 700 && <MusicPlayer />}
      <div className="title-container" onClick={() => setSelectedPage()}>
        <Typography
          align="left"
          fontFamily={"Agnes"}
          fontSize={size.width > 700 ? "70px" : "30px"}
          sx={{
            writingMode: size.width > 700 ? "vertical-rl" : "",
            textOrientation: "upright",
            outline: "none",
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
              fontSize={size.width > 700 && "14px"}
              align={"center"}
              style={{ textDecoration: selectedPage === item && "underline", height: size.width > 700 && "30px" }}
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

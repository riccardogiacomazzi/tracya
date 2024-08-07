import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import Discography from "./components/Discography";
import LiveSets from "./components/LiveSets";
import "./App.css";

function App() {
  const pages = ["Home", "Discography", "Live Sets", "Visual Art", "Archive"];
  const [currentPage, setCurrentPage] = useState("Home");

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);

  return (
    <div className="main">
      <div className="vertical-navigation">
        {pages.map((item, index) => (
          <Typography align="left" onClick={() => setCurrentPage(item)} key={index}>
            {item}
          </Typography>
        ))}
      </div>
      <div className="main-content">
        {currentPage === "Home" && (
          <img className="image" src="https://live.staticflickr.com/65535/53726399750_65be5b34fa_o.jpg" />
        )}
        {currentPage === "Discography" && <Discography />}
        {currentPage === "Live Sets" && <LiveSets />}
      </div>
    </div>
  );
}

export default App;

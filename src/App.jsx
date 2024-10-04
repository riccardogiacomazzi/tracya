import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";
import { Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import Home from "./components/Home";
import Discography from "./components/Discography";
import LiveSets from "./components/LiveSets";
import VisualArt from "./components/VisualArt";
import Archive from "./components/Archive";
import Info from "./components/Info";
import Experiments from "./components/Experiments";
import FlickrAPI from "./services/flickrService";
import "./App.css";

function App() {
  const pages = ["Discography", "Live Sets", "Visual Art", "Info"];
  const [selectedPage, setSelectedPage] = useState();
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    const flickrService = async () => {
      const data = await FlickrAPI.FlickrPhotos();
      setItemData(data.itemData);
    };

    flickrService();
  }, []);

  const size = useWindowSize();

  const handlePageSelect = (item) => {
    setSelectedPage(item);
  };

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <div className="main">
            <div className="vertical-navigation">
              <div className="title-container">
                <Typography
                  align="left"
                  fontFamily={"Agnes"}
                  fontSize={size.width > 700 ? "70px" : "30px"}
                  sx={{
                    writingMode: size.width > 700 ? "vertical-rl" : "",
                    textOrientation: "upright",
                    outline: "none",
                  }}
                  onClick={() => setSelectedPage()}
                >
                  <Link to={"/"} style={{ color: "black" }}>
                    Tracya
                  </Link>
                </Typography>
              </div>

              <div className="pages-buttons-container">
                {pages.map((item, index) => (
                  <Typography
                    onClick={() => handlePageSelect(item)}
                    fontSize={size.width > 700 && "14px"}
                    align={"center"}
                    key={index}
                    style={{ textDecoration: selectedPage === item && "underline" }}
                  >
                    <Link
                      to={`/${item.replace(/ /g, "_").toLowerCase()}`}
                      style={{ color: "black" }}
                      className="link-outlines"
                    >
                      {item.toLocaleUpperCase()}
                    </Link>
                  </Typography>
                ))}
              </div>
            </div>
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/discography" element={<Discography size={size} />} />
                <Route path="/live_sets" element={<LiveSets />} />
                <Route path="/visual_art" element={<VisualArt itemData={itemData} size={size} />} />
                <Route path="/archive" element={<Archive size={size} />} />
                <Route path="/info" element={<Info />} />
                <Route path="/xyz" element={<Experiments size={size} />} />
              </Routes>
            </div>
          </div>
        </CssBaseline>
      </ThemeProvider>
    </Router>
  );
}

export default App;

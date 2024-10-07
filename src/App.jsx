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
import ThePath from "./components/ThePath";
import FlickrAPI from "./services/flickrService";
import "./App.css";
import Sidebar from "./components/Sidebar";

function App() {
  const pages = ["Discography", "Live Sets", "Visual Art", "Info"];
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    const flickrService = async () => {
      const data = await FlickrAPI.FlickrPhotos();
      setItemData(data.itemData);
    };

    flickrService();
  }, []);

  const size = useWindowSize();

  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <div className="main">
            <Sidebar pages={pages} size={size} />
            <div className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/discography" element={<Discography size={size} />} />
                <Route path="/live_sets" element={<LiveSets />} />
                <Route path="/visual_art" element={<VisualArt itemData={itemData} size={size} />} />
                <Route path="/archive" element={<Archive size={size} />} />
                <Route path="/info" element={<Info />} />
                <Route path="/xyz" element={<Experiments size={size} />} />
                <Route path="the_path" element={<ThePath />} />
              </Routes>
            </div>
          </div>
        </CssBaseline>
      </ThemeProvider>
    </Router>
  );
}

export default App;

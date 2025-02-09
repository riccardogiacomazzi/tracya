import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useWindowSize } from "@uidotdev/usehooks";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import Home from "./components/Home/Home";
import Discography from "./components/Discography/Discography";
import LiveSets from "./components/LiveSets/LiveSets";
import VisualArt from "./components/VisualArt/VisualArt";
import Archive from "./components/Archive/Archive";
import Info from "./components/Info/Info";
import Experiments from "./components/Experiments/Experiments";
import ThePath from "./components/ThePath/ThePath";
import FlickrAPI from "./services/flickrService";
import Sidebar from "./components/Sidebar/Sidebar";
import { MusicPlayerProvider } from "./components/MusicPlayerContext";
import "./App.css";

function App() {
  const pages = ["Discography", "Live Sets", "Visual Art", "Info"];
  const [itemData, setItemData] = useState([]);
  const [appHeight, setAppHeight] = useState(window.innerHeight);

  // api fetch pictures
  useEffect(() => {
    const flickrService = async () => {
      const data = await FlickrAPI.FlickrPhotos();
      setItemData(data.itemData);
    };

    flickrService();
  }, []);

  const size = useWindowSize();

  // determines app height for the browser's navbar
  useEffect(() => {
    const handleResize = () => {
      setAppHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <MusicPlayerProvider>
      <div
        style={{
          maxWidth: "100vw",
          width: "100vw",
          maxHeight: `${appHeight}px`,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Router>
          <ThemeProvider theme={theme}>
            <CssBaseline>
              <div className="main">
                <Sidebar pages={pages} size={size} />
                <div className="main-content">
                  <Routes>
                    <Route path="/" element={<Home size={size} itemData={itemData} />} />
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
      </div>
    </MusicPlayerProvider>
  );
}

export default App;

import { useState, useEffect } from "react";
import { useWindowSize } from "@uidotdev/usehooks";
import { Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import Discography from "./components/Discography";
import LiveSets from "./components/LiveSets";
import VisualArt from "./components/VisualArt";
import Info from "./components/Info";
import FlickrAPI from "./services/flickrService";
import "./App.css";

function App() {
  const pages = ["Discography", "Live Sets", "Visual Art", "Archive", "Info"];
  const [currentPage, setCurrentPage] = useState("Home");
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);

  useEffect(() => {
    const flickrService = async () => {
      const data = await FlickrAPI.FlickrPhotos();
      setItemData(data.itemData);
    };

    flickrService();
  }, []);

  const size = useWindowSize();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <div className="main">
          <div className="vertical-navigation">
            <Typography
              align="left"
              fontFamily={"Agnes"}
              fontSize={"90px"}
              sx={{
                flexGrow: 1,
                writingMode: "vertical-rl",
                textOrientation: "upright",
              }}
              onClick={() => setCurrentPage("Home")}
            >
              Tracya
            </Typography>
            {pages.map((item, index) => (
              <Typography align="left" onClick={() => setCurrentPage(item)} key={index}>
                {item.toLocaleUpperCase()}
              </Typography>
            ))}
          </div>
          <div className="main-content">
            {currentPage === "Home" && (
              <img className="image" src="https://live.staticflickr.com/65535/53726399750_65be5b34fa_o.jpg" />
            )}
            {currentPage === "Discography" && <Discography />}
            {currentPage === "Live Sets" && <LiveSets />}
            {currentPage === "Visual Art" && <VisualArt itemData={itemData} size={size} />}
            {currentPage === "Info" && <Info />}
          </div>
        </div>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;

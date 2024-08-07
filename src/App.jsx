import { useState, useEffect } from "react";
import { Typography } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import Discography from "./components/Discography";
import LiveSets from "./components/LiveSets";
import Info from "./components/Info";
import "./App.css";

function App() {
  const pages = ["Discography", "Live Sets", "Visual Art", "Archive", "Info"];
  const [currentPage, setCurrentPage] = useState("Home");

  useEffect(() => {
    console.log(currentPage);
  }, [currentPage]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline>
        <div className="main">
          <div className="vertical-navigation">
            <Typography
              align="left"
              fontFamily={"Agnes"}
              fontSize={"110px"}
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
            {currentPage === "Info" && <Info />}
          </div>
        </div>
      </CssBaseline>
    </ThemeProvider>
  );
}

export default App;

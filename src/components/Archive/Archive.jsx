import archive from "../../assets/archive";
import ReactPlayer from "react-player";
import P5Wrapper from "../../assets/P5Wrapper";
import sketchArchive from "../../assets/sketchArchive";
import { useEffect, useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import ContrastIcon from "@mui/icons-material/Contrast";

const Archive = ({ size }) => {
  const [eventOpen, setEventOpen] = useState(archive.map(() => false));
  const [selectedEvent, setSelectedEvent] = useState();

  const [mobileCanva, setMobileCanva] = useState(false);
  const [canvasKey, setCanvasKey] = useState(0);

  const parseDate = (string) => {
    const [day, month, year] = string.split(".");
    const fullYear = "20" + year;
    return new Date(`${fullYear}-${month}-${day}`);
  };

  const sortedArchive = archive.sort((a, b) => parseDate(b.date) - parseDate(a.date));

  const handleEventSelect = (index) => {
    handleSketchClick();
    const open = [...eventOpen];
    open[index] = !eventOpen[index];

    setEventOpen(open);

    setSelectedEvent(archive[index]);
  };

  const handleButtonClick = () => {
    setMobileCanva(!mobileCanva);
  };

  const handleSketchClick = () => {
    setCanvasKey((prevKey) => prevKey + 1);
  };

  return (
    <div
      className="archive-container"
      style={{ flexDirection: size.width > 700 && "row", overflow: size.width < 700 && mobileCanva && "hidden" }}
    >
      <div className="box-gigs">
        {sortedArchive.map((item, index) => (
          <Accordion
            key={index}
            expanded={eventOpen[index]}
            className="accordion-container"
            sx={{ border: item === selectedEvent && size.width > 700 && "solid", backgroundColor: "inherit" }}
          >
            <AccordionSummary
              expandIcon={eventOpen[index] === true ? <RemoveIcon /> : <AddIcon />}
              onClick={() => handleEventSelect(index)}
              sx={{
                "& .MuiAccordionSummary-expandIconWrapper": {
                  transform: "none",
                },
                "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
                  transform: "none",
                },
              }}
            >
              <div className="accordion-summary">
                <Typography>
                  {item.date} - {item.type} <br /> @ {item.eventName}
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              {size.width < 700 && selectedEvent && (
                <div>
                  {item.img && (
                    <div className="image-up">
                      <img src={item.img} className="img" />
                    </div>
                  )}
                  {item.url && !item.img && (
                    <div className="image-up-video">
                      <ReactPlayer
                        url={sortedArchive[index].url}
                        width={"100%"}
                        height={"100%"}
                        playing={false}
                        controls={true}
                      />
                    </div>
                  )}
                </div>
              )}
              <Typography>
                {item.location.venue && item.location.venue} - {item.location.city}
                <br /> {item.otherArtist.length > 0 && `w/ ${item.otherArtist.map((artist) => artist)}`}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
        {/* Image mobile version */}
        {mobileCanva && (
          <div onClick={handleSketchClick} className="canvas">
            <P5Wrapper sketch={sketchArchive} canvasKey={canvasKey} className="canvas" />
          </div>
        )}
      </div>

      <div className="button" onClick={handleButtonClick}>
        {size.width < 700 && (
          <ContrastIcon
            sx={{
              transform: mobileCanva ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.03s ease",
            }}
          />
        )}
      </div>

      {/* lateral images WEB version */}
      {size.width > 700 && (
        <div className="imgs-container">
          {selectedEvent && selectedEvent.img && (
            <div className="image-up">
              <img src={selectedEvent.img} className="img" />
            </div>
          )}
          {selectedEvent && selectedEvent.url && (
            <div className="image-up-video">
              <ReactPlayer url={selectedEvent.url} width={"100%"} height={"100%"} playing={false} controls={true} />
            </div>
          )}

          <div className="image-down" onClick={handleSketchClick} style={{ cursor: "crosshair" }}>
            <P5Wrapper sketch={sketchArchive} canvasKey={canvasKey} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Archive;

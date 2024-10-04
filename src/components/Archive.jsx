import archive from "../assets/archive";
import P5Wrapper from "../assets/P5Wrapper";
import sketchArchive from "../assets/sketchArchive";
import { useEffect, useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const Archive = ({ size }) => {
  const [eventOpen, setEventOpen] = useState(archive.map(() => false));
  const [selectedEvent, setSelectedEvent] = useState();

  const [canvasKey, setCanvasKey] = useState(0);

  const handleImageClick = () => {
    setCanvasKey((prevKey) => prevKey + 1);
  };

  const handleEventSelect = (index) => {
    handleImageClick();
    const open = [...eventOpen];
    open[index] = !eventOpen[index];
    setEventOpen(open);
    setSelectedEvent(archive[index]);
  };

  return (
    <div className="archive-container">
      <div className="box-gigs">
        {archive.map((item, index) => (
          <Accordion key={index} expanded={eventOpen[index]} className="accordion-container">
            <AccordionSummary
              expandIcon={eventOpen[index] === true ? <RemoveIcon /> : <AddIcon />}
              onClick={() => handleEventSelect(index)}
            >
              <div className="accordion-summary">
                <Typography>
                  {item.date} - {item.type} <br /> @ {item.eventName}
                </Typography>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              {size.width < 700 && selectedEvent && (
                <div className="image-up">
                  <img src={selectedEvent.img} className="img" />
                </div>
              )}
              <Typography>
                {item.location.venue && item.location.venue} - {item.location.city}
                <br /> {item.otherArtist.length > 0 && `w/ ${item.otherArtist.map((artist) => artist)} `}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
      {size.width > 700 && (
        <div className="imgs-container">
          {selectedEvent && selectedEvent.img.length > 0 && (
            <div className="image-up">
              <img src={selectedEvent.img} className="img" />
            </div>
          )}
          <div className="image-down" onClick={handleImageClick} style={{ cursor: "crosshair" }}>
            <P5Wrapper sketch={sketchArchive} canvasKey={canvasKey} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Archive;

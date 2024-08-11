import archive from "../assets/archive";
import P5Wrapper from "../assets/P5Wrapper";
import sketch from "../assets/sketch";
import { useEffect, useState } from "react";

const Archive = () => {
  const [eventOpen, setEventOpen] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState();

  useEffect(() => {
    const elementOpen = archive.map((item) => false);
    setEventOpen(elementOpen);
  }, []);

  const handleEventSelect = (index) => {
    console.log("selected:", index);
    const open = [...eventOpen];
    eventOpen[index] = !eventOpen[index];
    console.log(eventOpen);

    setSelectedEvent(archive[index]);
  };

  return (
    <div className="archive-container">
      <div className="box-gigs">
        {archive.map((item, index) => (
          <li key={index} onClick={() => handleEventSelect(index)}>
            {item.date} - {item.type} @{item.eventName}
            <br />
            {eventOpen[index] === true && (
              <>
                {item.location.venue && item.location.venue} - {item.location.city}
                <br /> {item.otherArtist.length > 0 && `w/ ${item.otherArtist.map((artist) => artist)} `}
              </>
            )}
          </li>
        ))}
      </div>
      <div className="imgs-container">
        {/* {selectedEvent && selectedEvent.img.length > 0 && (
          <div className="image-up">
            <img src={selectedEvent.img} className="img" />
          </div>
        )} */}
        <div className="image-down">
          <P5Wrapper sketch={sketch} />
        </div>
      </div>
    </div>
  );
};

export default Archive;

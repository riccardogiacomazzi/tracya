import archive from "../assets/archive";
import P5Wrapper from "../assets/P5Wrapper";
import sketch from "../assets/sketch";
import { useState } from "react";

const Archive = () => {
  const [selectedEvent, setSelectedEvent] = useState();

  const handleEventSelect = (index) => {
    const events = [...archive];
    setSelectedEvent(events[index]);
  };

  return (
    <div className="archive-container">
      <div className="box-gigs">
        {archive.map((item, index) => (
          <li key={index} onClick={() => handleEventSelect(index)}>
            {item.date} - {item.type} @{item.eventName}
            <br />
            {selectedEvent && selectedEvent.date === item.date && (
              <>
                {item.location.venue && item.location.venue} - {item.location.city}
                <br /> {item.otherArtist.length > 0 && `w/ ${item.otherArtist.map((artist) => artist)} `}
              </>
            )}
          </li>
        ))}
      </div>
      <div className="imgs-container">
        {/* <div className="image-up">{selectedEvent && <img src={selectedEvent.img} className="img" />}</div> */}
        <div className="image-down">
          <P5Wrapper sketch={sketch} />
        </div>
      </div>
    </div>
  );
};

export default Archive;

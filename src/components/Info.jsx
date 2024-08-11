import { Typography } from "@mui/material";
import { useEffect, useState, useLayoutEffect } from "react";
import bio from "../assets/bio";

const Info = () => {
  const [imageLoad, setImageLoad] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const infoTextElement = document.querySelector(".info-text");
      if (infoTextElement) {
        infoTextElement.scrollIntoView({ behavior: "instant", block: "center" });
      }
    }, 10);

    return () => clearTimeout(timer);
  }, []);

  // image loading fade in CSS
  const handleImageLoad = () => {
    setImageLoad(true);
  };

  return (
    <div className="info-page">
      <img
        src={bio.pics[0].url}
        className={`info-img ${imageLoad ? "loaded" : ""}`}
        loading="lazy"
        onLoad={handleImageLoad}
      />
      <div className="info-text">
        <Typography fontFamily={"Heming"}>
          {bio.text}
          <br />
          <br />
          <div className="contacts-container">
            {bio.contacts.map((item) => (
              <div>
                <a href={item.link}>{item.name}</a>
              </div>
            ))}
          </div>
        </Typography>
      </div>

      <img
        src={bio.pics[1].url}
        className={`info-img ${imageLoad ? "loaded" : ""}`}
        loading="lazy"
        onLoad={handleImageLoad}
      />
    </div>
  );
};

export default Info;

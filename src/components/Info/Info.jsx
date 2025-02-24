import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import bio from "../../assets/bio";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Info.css";

const Info = () => {
  const [imageLoad, setImageLoad] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/info") {
      const timer = setTimeout(() => {
        const infoTextElement = document.querySelector(".info-text");
        if (infoTextElement) {
          infoTextElement.scrollIntoView({ behavior: "instant", block: "center" });
        }
      }, 10);

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  // image loading fade in CSS
  const handleImageLoad = () => {
    setImageLoad(true);
  };

  return (
    <div className="info-page">
      <Link to={"/archive"}>
        <img
          src={bio.pics[0].url}
          className={`info-img ${imageLoad ? "loaded" : ""}`}
          loading="lazy"
          onLoad={handleImageLoad}
        />
      </Link>
      <div className="info-text">
        <Typography fontFamily={"Heming"}>
          {bio.text}
          <br />
          <br />
          <div className="contacts-container">
            {bio.contacts.map((item, index) => (
              <div key={index} className="item">
                <a href={item.link}>{item.name}</a>
              </div>
            ))}
            <br />
          </div>
        </Typography>
      </div>

      <Link to={"/archive"}>
        <img
          src={bio.pics[1].url}
          className={`info-img ${imageLoad ? "loaded" : ""}`}
          loading="lazy"
          onLoad={handleImageLoad}
        />
      </Link>
    </div>
  );
};

export default Info;

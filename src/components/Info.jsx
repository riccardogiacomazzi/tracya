import { Typography } from "@mui/material";
import { useEffect } from "react";
import bio from "../assets/bio";

const Info = () => {
  useEffect(() => {
    const infoTextElement = document.querySelector(".info-text");
    if (infoTextElement) {
      infoTextElement.scrollIntoView({ behavior: "instant", block: "center" });
    }
  }, []);

  return (
    <div className="info-page">
      <img src={bio.pics[0].url} className="info-img" />
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

      <img src={bio.pics[1].url} className="info-img" />
    </div>
  );
};

export default Info;

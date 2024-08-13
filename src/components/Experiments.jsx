import P5Wrapper from "../assets/P5Wrapper";
import sketch from "../assets/sketch";
import { useState } from "react";

const Experiments = ({}) => {
  const [canvasKey, setCanvasKey] = useState(0);

  const handleImageClick = () => {
    setCanvasKey((prevKey) => prevKey + 1);
  };

  return (
    <div className="experiment-container" onClick={handleImageClick} style={{ cursor: "crosshair" }}>
      <P5Wrapper sketch={sketch} canvasKey={canvasKey} className="wrapper" />
    </div>
  );
};

export default Experiments;

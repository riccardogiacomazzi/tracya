import P5Wrapper from "../../assets/P5Wrapper";
import sketch from "../../assets/sketch";
import generator2 from "../../assets/generator2";
import { useEffect, useState } from "react";

const Experiments = ({}) => {
  const [canvasKey, setCanvasKey] = useState(0);
  const [generatorDisplay, setGeneratorDisplay] = useState(true);

  const handleImageClick = () => {
    setCanvasKey((prevKey) => prevKey + 1);
  };

  useEffect(() => {
    let random = Math.random();

    if (random > 0.5) {
      setGeneratorDisplay(true);
    } else {
      setGeneratorDisplay(false);
    }
  }, []);

  return (
    <div className="experiment-container" onClick={handleImageClick} style={{ cursor: "crosshair" }}>
      {!generatorDisplay ? (
        <P5Wrapper sketch={sketch} canvasKey={canvasKey} />
      ) : (
        <P5Wrapper sketch={generator2} canvasKey={canvasKey} />
      )}
    </div>
  );
};

export default Experiments;

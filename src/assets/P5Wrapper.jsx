import React, { useRef, useEffect } from "react";
import p5 from "p5";

const P5Wrapper = ({ sketch }) => {
  const sketchRef = useRef(null);

  useEffect(() => {
    if (sketchRef.current) {
      new p5(sketch, sketchRef.current);
    }
  }, [sketch]);

  return <div ref={sketchRef}></div>;
};

export default P5Wrapper;

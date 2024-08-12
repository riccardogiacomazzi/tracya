import React, { useRef, useEffect } from "react";
import p5 from "p5";

const P5Wrapper = ({ sketch, canvasKey }) => {
  const sketchRef = useRef(null);
  const p5Instance = useRef(null);

  useEffect(() => {
    if (sketchRef.current) {
      // Clean up any existing p5 instance
      if (p5Instance.current) {
        p5Instance.current.remove();
      }

      // Create a new p5 instance
      p5Instance.current = new p5(sketch, sketchRef.current);
    }

    // Cleanup on unmount or when sketch changes
    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
      }
    };
  }, [sketch, canvasKey]);

  return <div ref={sketchRef}></div>;
};

export default P5Wrapper;

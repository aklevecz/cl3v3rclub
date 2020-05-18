import React, { useEffect } from "react";
import { VenueBox } from "./VenueBox";

// const ids = [
//   "PATCH",
//   "CLOSED_x5F_OUTLINE",
//   "CLOSED_x5F_CLUBCLEVER",
//   "CLOSED_x5F_SMILER",
//   "CLOSED_x5F_CLAW",
//   "CLOSED_x5F_SPIRAL",
//   "CLOSED_x5F_HEART",
//   "CLOSED_x5F_CLOSED",
//   "CLOSED_x5F_OPEN",
//   "CLOSED_x5F_SMALLSMILE",
//   "CLOSED_x5F_DOOR",
//   "CLOSED_x5F_MUSICNOTE",
//   "CLOSED_x5F_SQUIGGLE",
//   "CLOSED_x5F_ROOF",
// ];

const Venue = () => {
  useEffect(() => {
    const heart = document.getElementById("CLOSED_x5F_HEART");
    const closedSign = document.getElementById("CLOSED_x5F_CLOSED");
    var frameCount = 0;
    var frame, fpsInterval, now, then, elapsed;
    startAnimating(5);
    function startAnimating(fps) {
      fpsInterval = 1000 / fps;
      then = Date.now();
      animate();
    }

    function animate() {
      frame = requestAnimationFrame(animate);

      now = Date.now();
      elapsed = now - then;

      if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        const wave =
          (255 * Math.sin(frameCount * Math.PI * 2 * 0.1) + 255) * 0.5;
        heart.setAttribute("stroke", frameCount % 9 ? "red" : "white");
        closedSign.setAttribute("stroke", `rgb(255,${wave},${wave} )`);
        frameCount++;
      }
    }
    return () => cancelAnimationFrame(frame);
  }, []);
  return (
    <div>
      <VenueBox />
    </div>
  );
};
export default Venue;

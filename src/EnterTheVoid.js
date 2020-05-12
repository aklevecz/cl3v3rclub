import React, { useEffect } from "react";
import { VoidBanner } from "./VoidBanner";
import styled from "styled-components";

const VoidWrapper = styled.div`
  max-width: 460px;
  margin: auto;
  svg {
    /* display: block;
    margin: auto; */
    /* max-width: 860px; */
  }
`;
const EnterTheVoid = () => {
  useEffect(() => {
    const voidSvg = document.getElementById("void");
    const voidPaths = voidSvg.getElementsByTagName("path");
    // for (let i = 0; i < voidPaths.length; i++) {
    //   voidPaths[i].setAttribute("fill", "red");
    // }
    let counter = 0;
    let frame;
    const animate = () => {
      frame = requestAnimationFrame(animate);
      const cfill = voidPaths[counter % voidPaths.length].getAttribute(
        "fill",
        "red"
      );
      voidPaths[counter % voidPaths.length].setAttribute(
        "fill",
        cfill === "red" ? "white" : "red"
      );
      counter++;
    };
    animate();
    return () => cancelAnimationFrame(frame);
  });
  return (
    <VoidWrapper>
      <VoidBanner name={"void"} />
    </VoidWrapper>
  );
};
export default EnterTheVoid;

import React, { useState, useEffect } from "react";
import { Info } from "./App";
import meiosis from "./MEIOSIS-combinedd.jpg";

const Meiosis = () => {
  const [clickCount, setClickCount] = useState(0);
  const [solved, setSolved] = useState(false);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    if (clickCount > 3) {
      setPhase(1);
    }
  }, [clickCount]);

  useEffect(() => {
    if (solved) {
      setPhase(2);
    }
  }, [solved]);

  useEffect(() => {
    if (phase === 2) {
      const door = document.querySelector("rect");
      const start = Date.now();
      const animate = () => {
        const diff = Date.now() - start;
        const wave = 0.5 * (1 + Math.sin(diff * 0.001 * Math.PI * 2));
        door.style.opacity = wave;
        requestAnimationFrame(animate);
      };
      animate();
    }
  }, [phase]);

  const changeColor = (e) => {
    const el = e.target;
    switch (el.getAttribute("fill")) {
      case "white":
        el.setAttribute("fill", "red");
        break;
      case "red":
        el.setAttribute("fill", "blue");
        break;
      case "blue":
        el.setAttribute("fill", "white");
        break;
    }
    const circles = document.getElementsByClassName("circle");
    const answer = [
      "blue",
      "blue",
      "red",
      "red",
      "blue",
      "red",
      "red",
      "blue",
      "blue",
    ];
    let countCorrect = 0;
    for (let i = 0; i < circles.length; i++) {
      const ccColor = circles[i].getAttribute("fill");
      if (ccColor === answer[i]) {
        countCorrect++;
      }
    }
    if (countCorrect === 9) {
      setSolved(true);
    }
  };

  const d = new Date();
  const date = d.getUTCDate();
  const hour = d.getUTCHours();
  let open = false;
  if (date === 9 && hour > 1) {
    open = true;
  }
  return (
    <div>
      {phase === 0 && (
        <Info
          onClick={() => setClickCount(clickCount + 1)}
          color="rgba(0,0,0, .7)"
          img={meiosis}
        >
          <div className="text">MEIOSIS :)</div>
        </Info>
      )}
      {phase === 1 && (
        <Info color="rgba(0,0,0, .7)" img={meiosis}>
          <div
            className="text"
            style={{ display: "grid", gridTemplateRows: "1fr 1fr 1fr" }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                maxWidth: "350px",
                margin: "auto",
              }}
            >
              <Circle press={changeColor} />
              <Circle press={changeColor} />
              <Circle press={changeColor} />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                maxWidth: "350px",
                margin: "auto",
              }}
            >
              <Circle press={changeColor} />
              <Circle press={changeColor} />
              <Circle press={changeColor} />
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-around",
                maxWidth: "350px",
                margin: "auto",
              }}
            >
              <Circle press={changeColor} />
              <Circle press={changeColor} />
              <Circle press={changeColor} />
            </div>
          </div>
        </Info>
      )}
      {phase === 2 && (
        <Info color="rgba(0,0,0, .7)">{open ? <Door /> : <DoorClosed />}</Info>
      )}
    </div>
  );
};
export default Meiosis;

function Circle(props) {
  return (
    <svg height="100" width="100">
      <circle
        className="circle"
        onClick={props.press}
        cx="50"
        cy="50"
        r="40"
        fill="white"
      />
    </svg>
  );
}

function Door(props) {
  return (
    <div
      onClick={() =>
        (window.location.href =
          "https://meiosis.cl3v3r.club?hihello=dfea6ac51cdd73223ada76c6039f18d0")
      }
    >
      <svg id="Layer_1" x="0px" y="0px" viewBox="0 0 320 320">
        <rect
          x="109"
          y="54"
          fill="red"
          stroke="#000000"
          strokeMiterlimit="10"
          width="102"
          height="212"
        />
        <polygon
          fill="#2D2D2D"
          stroke="#FFFFFF"
          strokeMiterlimit="10"
          points="0.5,319.5 109.5,265.5 210.5,265.5 319.5,319.5 "
        />
        <polygon
          fill="#2D2D2D"
          stroke="#FFFFFF"
          strokeMiterlimit="10"
          points="0.5,-0.5 109.5,54.5 109.5,265.5 0.5,319.5 "
        />
        <path
          fill="#FFFFFF"
          stroke="#000000"
          strokeMiterlimit="10"
          d="M210.5,54.5l109-54L210.5,54.5z"
        />
        <polygon
          fill="#2D2D2D"
          stroke="#FFFFFF"
          strokeMiterlimit="10"
          points="210.5,54.5 319.5,0.5 0.5,-0.5 109.5,54.5 "
        />
        <polygon
          fill="#2D2D2D"
          stroke="#FFFFFF"
          strokeMiterlimit="10"
          points="210.5,265.5 210.5,54.5 319.5,0.5 319.5,319.5 "
        />
      </svg>
    </div>
  );
}

function DoorClosed() {
  return (
    <svg x="0px" y="0px" viewBox="0 0 320 320">
      <rect
        x="109"
        y="54"
        fill="#FFFFFF"
        stroke="#000000"
        strokeMiterlimit="10"
        width="102"
        height="212"
      />
      <polygon
        fill="#2D2D2D"
        stroke="#FFFFFF"
        strokeMiterlimit="10"
        points="0.5,319.5 109.5,265.5 210.5,265.5 319.5,319.5 "
      />
      <polygon
        fill="#2D2D2D"
        stroke="#FFFFFF"
        strokeMiterlimit="10"
        points="0.5,-0.5 109.5,54.5 109.5,265.5 0.5,319.5 "
      />
      <path
        fill="#FFFFFF"
        stroke="#000000"
        strokeMiterlimit="10"
        d="M210.5,54.5l109-54L210.5,54.5z"
      />
      <polygon
        fill="#2D2D2D"
        stroke="#FFFFFF"
        strokeMiterlimit="10"
        points="210.5,54.5 319.5,0.5 0.5,-0.5 109.5,54.5 "
      />
      <polygon
        fill="#2D2D2D"
        stroke="#FFFFFF"
        strokeMiterlimit="10"
        points="210.5,265.5 210.5,54.5 319.5,0.5 319.5,319.5 "
      />
      <rect
        x="110.5"
        y="56.5"
        stroke="#FFFFFF"
        strokeMiterlimit="10"
        width="99"
        height="208"
      />
      <g>
        <rect
          x="128.5"
          y="114.5"
          transform="matrix(0.984 -0.1781 0.1781 0.984 -19.9721 30.5193)"
          fill="#FFFFFF"
          stroke="#FF8B98"
          strokeMiterlimit="10"
          width="63"
          height="24"
        />
        <g>
          <path
            d="M144.33,127.76l-2.11,0.38c-0.47-0.79-1.34-1.19-2.32-1.02c-1.32,0.24-2.11,1.41-1.86,2.79c0.25,1.38,1.4,2.2,2.72,1.96
			c0.98-0.18,1.66-0.86,1.82-1.76l2.11-0.38c-0.06,2-1.48,3.68-3.58,4.06c-2.44,0.44-4.65-1.07-5.09-3.51
			c-0.44-2.43,1.1-4.62,3.54-5.07C141.66,124.83,143.58,125.9,144.33,127.76z"
          />
          <path d="M151.51,129.76l0.35,1.91l-5.42,0.98l-1.5-8.26l2.01-0.36l1.15,6.35L151.51,129.76z" />
          <path
            d="M160.52,125.84c0.44,2.43-1.1,4.62-3.54,5.07c-2.44,0.44-4.65-1.07-5.09-3.5c-0.44-2.43,1.1-4.62,3.54-5.07
			C157.87,121.9,160.08,123.41,160.52,125.84z M153.91,127.04c0.25,1.38,1.4,2.2,2.72,1.96c1.32-0.24,2.11-1.41,1.86-2.79
			c-0.25-1.38-1.4-2.2-2.72-1.96C154.45,124.49,153.66,125.66,153.91,127.04z"
          />
          <path
            d="M163.44,123.02l0.21,1.18l3.88-0.7l0.94,5.17l-5.88,1.06l-0.35-1.91l3.88-0.7l-0.24-1.35l-3.88,0.7l-0.9-5l5.88-1.07
			l0.35,1.91L163.44,123.02z"
          />
          <path
            d="M170.98,121.66l0.22,1.23l3.41-0.62l0.35,1.91l-3.41,0.62l0.23,1.3l3.68-0.67l0.35,1.91l-5.69,1.03l-1.5-8.26l5.69-1.03
			l0.35,1.91L170.98,121.66z"
          />
          <path
            d="M178.81,118.27c2.4-0.44,4.55,1.01,4.97,3.37c0.43,2.35-1.07,4.46-3.47,4.9l-3.08,0.56l-1.5-8.26L178.81,118.27z
			 M178.89,124.81l1.07-0.19c1.32-0.24,2.06-1.3,1.82-2.62c-0.24-1.32-1.3-2.06-2.62-1.82l-1.07,0.19L178.89,124.81z"
          />
        </g>
      </g>
      <polyline
        fill="none"
        stroke="#FF8B98"
        strokeMiterlimit="10"
        points="144.24,116.77 147.5,93.5 162.81,113.74 "
      />
      <path
        fill="none"
        stroke="#FF8B98"
        strokeMiterlimit="10"
        d="M105.5-46.5"
      />
      <circle
        fill="#FFFFFF"
        stroke="#FF8B98"
        strokeMiterlimit="10"
        cx="147"
        cy="93"
        r="2.5"
      />
      <g>
        <line
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeMiterlimit="10"
          x1="162.61"
          y1="210.59"
          x2="173.6"
          y2="218.41"
        />
        <line
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeMiterlimit="10"
          x1="172.02"
          y1="209"
          x2="164.2"
          y2="219.99"
        />
        <line
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeMiterlimit="10"
          x1="194.6"
          y1="210.03"
          x2="181.29"
          y2="212.27"
        />
        <path
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="2"
          strokeMiterlimit="10"
          d="M166.17,228.72c0,0,19.34,21.3,29.42-5.41"
        />
        <g>
          <g>
            <path
              fill="#FFFFFF"
              d="M168.66,230.93c-1.46,1.3-2.32,3.28-2.84,5.12c-0.58,2.04-0.83,4.3-0.35,6.38
				c0.51,2.21,2.12,3.88,4.41,4.16c2.14,0.26,4.44-0.71,5.95-2.22c2.16-2.15,2.86-5.13,3.23-8.06c0.08-0.67-0.63-1.25-1.25-1.25
				c-0.75,0-1.17,0.58-1.25,1.25c-0.24,1.95-0.68,4.08-1.92,5.66c-0.97,1.24-2.49,2.13-4.01,2.16c-1.48,0.03-2.37-0.9-2.71-2.24
				c-0.37-1.47-0.19-3.24,0.21-4.8c0.24-0.92,0.53-1.75,0.95-2.55c0.42-0.81,0.73-1.28,1.36-1.84c0.51-0.45,0.46-1.31,0-1.77
				C169.93,230.43,169.17,230.48,168.66,230.93L168.66,230.93z"
            />
          </g>
        </g>
        <g>
          <g>
            <path
              fill="#FFFFFF"
              d="M172.62,233.75c-0.67,0.58-1.28,1.21-1.78,1.94c-0.57,0.82-0.87,1.76-0.98,2.74
				c-0.03,0.3,0.16,0.68,0.37,0.88c0.22,0.22,0.57,0.38,0.88,0.37c0.32-0.01,0.66-0.12,0.88-0.37c0.24-0.26,0.33-0.54,0.37-0.88
				c0-0.04,0.01-0.08,0.01-0.12c-0.01,0.11-0.03,0.22-0.04,0.33c0.05-0.39,0.16-0.76,0.31-1.13c-0.04,0.1-0.08,0.2-0.13,0.3
				c0.17-0.4,0.4-0.77,0.67-1.12c-0.07,0.08-0.13,0.17-0.2,0.25c0.41-0.53,0.9-1,1.41-1.43c0.23-0.2,0.37-0.59,0.37-0.88
				c0-0.31-0.14-0.67-0.37-0.88C173.86,233.26,173.15,233.29,172.62,233.75L172.62,233.75z"
            />
          </g>
        </g>
      </g>
      <g>
        <path
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="0.5"
          strokeMiterlimit="10"
          d="M130.05,165.7c0,1.69-1.31,2.98-3,2.98
		s-3-1.29-3-2.98s1.31-2.98,3-2.98S130.05,164.01,130.05,165.7z M125.46,165.7c0,0.96,0.67,1.65,1.59,1.65s1.59-0.69,1.59-1.65
		c0-0.96-0.67-1.65-1.59-1.65S125.46,164.74,125.46,165.7z"
        />
        <path
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="0.5"
          strokeMiterlimit="10"
          d="M135.58,166.32c0,1.4-0.89,2.36-2.04,2.36
		c-0.57,0-0.99-0.24-1.28-0.59v2.38h-1.4v-6.4h1.4v0.51c0.29-0.37,0.71-0.62,1.29-0.62C134.68,163.95,135.58,164.91,135.58,166.32z
		 M132.26,166.32c0,0.63,0.41,1.03,0.95,1.03c0.53,0,0.95-0.4,0.95-1.03c0-0.62-0.41-1.03-0.95-1.03
		C132.67,165.28,132.26,165.69,132.26,166.32z"
        />
        <path
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="0.5"
          strokeMiterlimit="10"
          d="M140.88,165.95c0.03,0.27,0.01,0.47-0.01,0.63
		h-3.22c0.05,0.58,0.43,0.92,0.96,0.92c0.39,0,0.75-0.19,0.83-0.58h1.44c-0.17,1.12-1.18,1.76-2.28,1.76
		c-1.39,0-2.37-1.03-2.37-2.36c0-1.34,0.99-2.37,2.33-2.37C139.72,163.95,140.73,164.72,140.88,165.95z M137.75,165.66h1.66
		c-0.11-0.42-0.49-0.57-0.82-0.57C138.2,165.09,137.9,165.3,137.75,165.66z"
        />
        <path
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="0.5"
          strokeMiterlimit="10"
          d="M144.5,168.57v-3.18h-1.43v3.18h-1.4v-4.51h4.22
		v4.51H144.5z"
        />
        <path
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="0.5"
          strokeMiterlimit="10"
          d="M148.44,162.67c0,0.48-0.37,0.8-0.87,0.8
		s-0.87-0.32-0.87-0.8s0.37-0.8,0.87-0.8S148.44,162.19,148.44,162.67z M146.87,168.57v-4.51h1.4v4.51H146.87z"
        />
        <path
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="0.5"
          strokeMiterlimit="10"
          d="M152.07,168.57v-3.18h-1.43v3.18h-1.4v-4.51h4.22
		v4.51H152.07z"
        />
        <path
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="0.5"
          strokeMiterlimit="10"
          d="M157.6,164.57v-0.51h1.4v6.4l-4.14,0v-1.32h2.74
		v-1.11c-0.29,0.35-0.71,0.59-1.28,0.59c-1.15,0-2.04-0.97-2.04-2.34c0-1.38,0.9-2.34,2.03-2.34
		C156.89,163.95,157.31,164.2,157.6,164.57z M155.7,166.29c0,0.61,0.42,1.01,0.95,1.01c0.54,0,0.95-0.4,0.95-1.01
		c0-0.6-0.41-1.01-0.95-1.01C156.11,165.28,155.7,165.69,155.7,166.29z"
        />
        <path
          fill="#FFFFFF"
          d="M168.84,164.16v0.91h2.37v1.33h-2.37v2.18h-1.4v-5.75h3.96v1.33H168.84z"
        />
        <path
          fill="#FFFFFF"
          d="M176.16,166.51l0.83,2.06h-1.5l-0.84-2.06h-0.88v2.06h-1.4v-5.75h4.38v3.68H176.16z M173.78,165.33h1.71
		v-1.17h-1.71V165.33z"
        />
        <path fill="#FFFFFF" d="M177.89,168.57v-5.75h1.4v5.75H177.89z" />
        <path
          fill="#FFFFFF"
          d="M182.57,162.83c1.67,0,2.94,1.24,2.94,2.87s-1.27,2.87-2.94,2.87h-2.14v-5.75H182.57z M181.82,167.24h0.75
		c0.92,0,1.54-0.63,1.54-1.54s-0.63-1.54-1.54-1.54h-0.75V167.24z"
        />
        <path
          fill="#FFFFFF"
          d="M189.79,168.57v-1.72h-1.99v1.72h-1.4v-5.75h4.78v5.75H189.79z M187.8,165.53h1.99v-1.37h-1.99V165.53z"
        />
        <path
          fill="#FFFFFF"
          d="M193.95,168.57v-1.83l-1.99-3.91h1.57l1.12,2.25l1.12-2.25h1.57l-1.99,3.91v1.83H193.95z"
        />
        <path
          fill="#FFFFFF"
          d="M126.43,172.67c1.67,0,2.94,1.24,2.94,2.87s-1.27,2.87-2.94,2.87h-2.14v-5.75H126.43z M125.69,177.09h0.74
		c0.92,0,1.54-0.63,1.54-1.54s-0.63-1.54-1.54-1.54h-0.74V177.09z"
        />
        <path
          fill="#FFFFFF"
          d="M136.03,175.54c0,1.69-1.31,2.98-3,2.98s-3-1.29-3-2.98s1.31-2.98,3-2.98S136.03,173.85,136.03,175.54z
		 M131.44,175.54c0,0.96,0.67,1.65,1.59,1.65s1.59-0.69,1.59-1.65c0-0.96-0.67-1.65-1.59-1.65S131.44,174.58,131.44,175.54z"
        />
        <path
          fill="#FFFFFF"
          d="M142.69,175.54c0,1.69-1.31,2.98-3,2.98s-3-1.29-3-2.98s1.31-2.98,3-2.98S142.69,173.85,142.69,175.54z
		 M138.1,175.54c0,0.96,0.67,1.65,1.59,1.65s1.59-0.69,1.59-1.65c0-0.96-0.67-1.65-1.59-1.65S138.1,174.58,138.1,175.54z"
        />
        <path
          fill="#FFFFFF"
          d="M147.37,176.36l0.83,2.06h-1.5l-0.84-2.06h-0.87v2.06h-1.4v-5.75h4.38v3.68H147.37z M144.99,175.18h1.71
		V174h-1.71V175.18z"
        />
        <path
          fill="#FFFFFF"
          d="M150.5,174v0.82h2.7v3.6h-4.09v-1.33h2.7v-0.94h-2.7v-3.48h4.09V174H150.5z"
        />
        <path
          fill="#FFFFFF"
          d="M174.95,178.42h-1.57l2.41-4.42h-2.65v-1.33h4.23V174L174.95,178.42z"
        />
        <path
          fill="#FFFFFF"
          d="M179.54,176.61v1.81h-1.4v-5.75h4.41v3.94H179.54z M179.54,175.28h1.62V174h-1.62V175.28z"
        />
        <path
          fill="#FFFFFF"
          d="M188.18,178.42v-3.69l-1.52,2.09h-0.13l-1.52-2.09v3.69h-1.4v-5.75h1.58l1.4,1.91l1.4-1.91h1.58v5.75
		H188.18z"
        />
        <path
          fill="#FFFFFF"
          d="M125.69,183.84v0.82h2.7v3.6h-4.09v-1.33h2.7v-0.94h-2.7v-3.48h4.09v1.33H125.69z"
        />
        <path
          fill="#FFFFFF"
          d="M133.14,188.26V186h-2.21v2.27h-1.4v-5.75h1.4v2.15h2.21v-2.15h1.4v5.75H133.14z"
        />
        <path
          fill="#FFFFFF"
          d="M141.44,185.39c0,1.69-1.31,2.98-3,2.98s-3-1.29-3-2.98s1.31-2.98,3-2.98S141.44,183.7,141.44,185.39z
		 M136.84,185.39c0,0.96,0.67,1.65,1.59,1.65s1.59-0.69,1.59-1.65c0-0.96-0.67-1.65-1.59-1.65S136.84,184.43,136.84,185.39z"
        />
        <path
          fill="#FFFFFF"
          d="M146.62,188.26l-0.5-2.08l-0.29-2.03h-0.11l-0.29,2.03l-0.5,2.08h-1.73l-1.39-5.75h1.44l0.67,2.75
		l0.17,1.29l0.17-1.29l0.67-2.75h1.75l0.67,2.75l0.17,1.29l0.17-1.29l0.67-2.75h1.43l-1.39,5.75H146.62z"
        />
        <path
          fill="#FFFFFF"
          d="M173.51,188.26v-5.74l4.38-0.01v5.75H173.51z M174.9,184.77h1.59v-0.93h-1.59V184.77z M174.9,186.93h1.59
		v-0.98h-1.59V186.93z"
        />
        <path
          fill="#FFFFFF"
          d="M180.42,186.46v1.81h-1.4v-5.75h4.41v3.94H180.42z M180.42,185.13h1.62v-1.28h-1.62V185.13z"
        />
        <path
          fill="#FFFFFF"
          d="M189.06,188.26v-3.69l-1.52,2.09h-0.13l-1.52-2.09v3.69h-1.4v-5.75h1.58l1.4,1.91l1.4-1.91h1.58v5.75
		H189.06z"
        />
      </g>
    </svg>
  );
}

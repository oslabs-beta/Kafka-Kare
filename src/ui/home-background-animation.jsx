import React, { useRef, useState, useEffect } from "react";

const BackgroundAnimation = ({
  children,
  interactive = true,
  gradientBackgroundStart = "rgb(0, 136, 204)",
  gradientBackgroundEnd = "rgb(49, 151, 149)",
}) => {
  const interactiveRef = useRef(null);
  const [curX, setCurX] = useState(0);
  const [curY, setCurY] = useState(0);
  const [tgX, setTgX] = useState(0);
  const [tgY, setTgY] = useState(0);

  useEffect(() => {
    document.body.style.setProperty(
      "--gradient-background-start",
      gradientBackgroundStart
    );
    document.body.style.setProperty(
      "--gradient-background-end",
      gradientBackgroundEnd
    );
    document.body.style.setProperty(
      "height",
      "100vh"
    );
  }, []);

  useEffect(() => {
    function move() {
      if (!interactiveRef.current) {
        return;
      }
      setCurX(curX + (tgX - curX) / 20);
      setCurY(curY + (tgY - curY) / 20);
      interactiveRef.current.style.transform = `translate(${Math.round(curX)}px, ${Math.round(curY)}px)`;
    }

    move();
  }, [tgX, tgY]);

  const handleMouseMove = (event) => {
    if (interactiveRef.current) {
      const rect = interactiveRef.current.getBoundingClientRect();
      setTgX(event.clientX - rect.left - window.innerWidth/2);
      setTgY(event.clientY - rect.top - window.innerHeight/2);
    }
  };

  return (
    <div
      className="h-screen w-screen relative overflow-hidden top-0 left-0"
      style={{
        background: `linear-gradient(40deg, ${gradientBackgroundStart}, ${gradientBackgroundEnd})`,
        overflow: 'hidden',
        height: '100%'
      }}
      
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="10"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div className="gradient-container h-screen w-screen blur-lg">
        <div className="gradients-container h-screen w-screen blur-lg"></div>
          <div className="absolute animate-first"></div>
          <div className="absolute animate-second"></div>
          <div className="absolute animate-third"></div>
          <div className="absolute animate-fourth"></div>
          <div className="absolute animate-fifth"></div>

        {interactive && (
          <div
            ref={interactiveRef}
            onMouseMove={handleMouseMove}
            className="absolute animate-cursor"
          ></div>
        )}
      </div>
      <div
        className="center-container text-white"
        style={{marginTop: "-18vh"}}
      >{children}</div>
    </div>
  );
};

export default BackgroundAnimation;

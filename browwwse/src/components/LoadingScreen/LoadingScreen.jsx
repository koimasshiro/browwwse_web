import { useEffect, useRef } from "react";
import gsap from "gsap";
import "./LoadingScreen.css";
import WebsiteContent from "../WebsiteContent/WebsiteContent";

const LoadingScreen = () => {
  const counter1Ref = useRef(null);
  const counter2Ref = useRef(null);
  const counter3Ref = useRef(null);
  const loaderRef = useRef(null);

  useEffect(() => {
    const counter3 = counter3Ref.current;

    // Clear previous animations
    gsap.killTweensOf("*");

    // Reset GSAP styles
    gsap.set(".loading-screen", { opacity: 1, display: "block" });
    gsap.set(".loader", { scale: 1, rotate: 0, x: 0, y: 0, background: "rgb(80, 80, 80)" });
    gsap.set(".loader-1", { width: 0, rotate: 0, y: 0 });
    gsap.set(".loader-2", { width: 0, x: 0, y: 0 });
    gsap.set(".digit", { top: 0 });

    // Reset counter3 content
    counter3.innerHTML = "";
    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 10; j++) {
        const div = document.createElement("div");
        div.className = "num";
        div.textContent = j;
        counter3.appendChild(div);
      }
    }
    const finalDiv = document.createElement("div");
    finalDiv.className = "num";
    finalDiv.textContent = "0";
    counter3.appendChild(finalDiv);

    // Animate counters
    const animate = (counter, duration, delay = 0) => {
      const numHeight = counter.querySelector(".num").clientHeight;
      const totalDistance = (counter.querySelectorAll(".num").length - 1) * numHeight;

      gsap.to(counter, {
        y: -totalDistance,
        duration,
        delay,
        ease: "power2.inOut",
      });
    };

    animate(counter3, 0);
    animate(counter2Ref.current, 6);
    animate(counter1Ref.current, 2, 4);

    // Loader animation
    gsap.fromTo(".loader-1", { width: 0 }, { width: "200px", duration: 6, ease: "power2.inOut" });
    gsap.fromTo(".loader-2", { width: 0 }, { width: "100px", delay: 1.9, duration: 2, ease: "power2.inOut" });

    gsap.to(".digit", {
      top: "-150px",
      stagger: { amount: 0.25 },
      delay: 6,
      duration: 1,
      ease: "power4.inOut",
    });

    gsap.to(".loader", { background: "none", delay: 6, duration: 0.1 });
    gsap.to(".loader-1", { rotate: 90, y: -50, duration: 0.5, delay: 6 });
    gsap.to(".loader-2", { x: -75, y: -75, duration: 0.5, delay: 6 });

    gsap.to(".loader", {
      scale: 40,
      duration: 1,
      delay: 7,
      ease: "power2.inOut",
    });

    gsap.to(".loader", {
      rotate: 45,
      y: 500,
      x: 2000,
      duration: 1,
      delay: 7,
      ease: "power2.inOut",
    });

    gsap.to(".loading-screen", {
      opacity: 0,
      duration: 0.5,
      delay: 7.5,
      ease: "power1.inOut",
      onComplete: () => {
        gsap.set(".loading-screen", { display: "none" }); // Hide after animation
      },
    });

    gsap.to("h1", {
      delay: 7,
      y: -80,
      duration: 1.5,
      ease: "power4.inOut",
      stagger: { amount: 0.1 },
    });
  }, []);

  return (
    <div>
      <WebsiteContent/>
      <div className="loading-screen" ref={loaderRef}>
        <div className="loader">
          <div className="loader-1 bar"></div>
          <div className="loader-2 bar"></div>
        </div>
        <div className="counter">
          <div className="counter-1 digit" ref={counter1Ref}>
            <div className="num">0</div>
            <div className="num num1offset1">1</div>
          </div>
          <div className="counter-2 digit" ref={counter2Ref}>
            {[...Array(2).keys()].map(() =>
              [...Array(10).keys()].map((num) => (
                <div key={`${num}-${Math.random()}`} className="num">
                  {num}
                </div>
              ))
            )}
            <div className="num">0</div>
          </div>

          <div className="counter-3 digit" ref={counter3Ref}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import LocomotiveScroll from "locomotive-scroll";
import "./Homepage.css";

const Homepage = () => {
  const scrollContainerRef = useRef(null);
  const h1Ref = useRef(null);
  const h2Ref = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Define a handler that wraps your initialization code.
    const handleLoad = () => {
      gsap.registerPlugin(ScrollTrigger);
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainer) return;

      const locoScroll = new LocomotiveScroll({
        el: scrollContainer,
        smooth: true,
      });

      locoScroll.on("scroll", ScrollTrigger.update);

      ScrollTrigger.scrollerProxy(scrollContainer, {
        scrollTop(value) {
          return arguments.length
            ? locoScroll.scrollTo(value, 0, 0)
            : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight,
          };
        },
        pinType: scrollContainer.style.transform ? "transform" : "fixed",
      });

      ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
      ScrollTrigger.refresh();

      const crsr = document.querySelector(".cursor");
      document.addEventListener("mousemove", (dets) => {
        crsr.style.left = dets.x + 20 + "px";
        crsr.style.top = dets.y + 20 + "px";
      });

      gsap.from([h1Ref.current, h2Ref.current], {
        y: 10,
        opacity: 0,
        delay: 0.3,
        duration: 0.7,
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: h1Ref.current,
          scroller: scrollContainer,
          start: "top 27%",
          end: "top 0",
          scrub: 3,
        },
      });
      tl.to(h1Ref.current, { x: -100 }, "anim");
      tl.to(h2Ref.current, { x: 100 }, "anim");
      // Uncomment if you want to animate the video and ensure videoRef is attached.
      if (videoRef.current) {
        tl.to(videoRef.current, { width: "90%" }, "anim");
      }

      const tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: h1Ref.current,
          scroller: scrollContainer,
          start: "top -115%",
          end: "top -120%",
          scrub: 3,
        },
      });
      tl2.to(scrollContainer, { backgroundColor: "#0F0D0D" });

      const tl3 = gsap.timeline({
        scrollTrigger: {
          trigger: h1Ref.current,
          scroller: scrollContainer,
          start: "top -280%",
          end: "top -300%",
          scrub: 3,
        },
      });
      tl3.to(scrollContainer, { backgroundColor: "#0F0D0D" });

      // Hover animations on .box elements
      const boxes = document.querySelectorAll(".box");
      boxes.forEach((elem) => {
        elem.addEventListener("mouseenter", function () {
          const att = elem.getAttribute("data-image");
          crsr.style.width = "470px";
          crsr.style.height = "370px";
          crsr.style.borderRadius = "0";
          crsr.style.backgroundImage = `url(${att})`;
        });
        elem.addEventListener("mouseleave", function () {
          crsr.style.width = "20px";
          crsr.style.height = "20px";
          crsr.style.borderRadius = "50%";
          crsr.style.backgroundImage = "none";
        });
      });

      // Hover animations on nav links for the purple element
      const h4Elements = document.querySelectorAll("#nav h4");
      const purple = document.querySelector("#purple");
      h4Elements.forEach((elem) => {
        elem.addEventListener("mouseenter", function () {
          purple.style.display = "block";
          purple.style.opacity = "1";
        });
        elem.addEventListener("mouseleave", function () {
          purple.style.display = "none";
          purple.style.opacity = "0";
        });
      });
    };

    // Attach the handler to the window load event.
    window.addEventListener("load", handleLoad);

    // Cleanup: remove the event listener on unmount.
    return () => {
      window.removeEventListener("load", handleLoad);
    };
  }, []);

  return (
    <div>
      <div className="cursor"></div>
      <div id="nav">
        <img src="/Assets/images/browwwselogo.png" alt="" />
        <div id="nav-part2">
          <h4>Home</h4>
          <h4>Work</h4>
          <h4>Contact</h4>
        </div>
        <div id="nav-part3">
          <div id="circle"></div>
        </div>
      </div>
      <div id="purple"></div>
      <div className="main" data-scroll-container ref={scrollContainerRef}>
        <div className="page1" data-scroll-section>
          <h1 ref={h1Ref}>Transforming</h1>
          <h2 ref={h2Ref}>digital journeys</h2>
          <video
            ref={videoRef}
            autoPlay
            muted
            loop
            src="https://duo-studio.co/assets/home/Duo%20Reel--Desktop-reduced.mp4"
          ></video>
        </div>
        <div className="page2" data-scroll-section>
          <h1>browwwse,</h1>
          <div className="page2-container">
            <div className="page2-left">
              <h2>
                A DIGITAL AGENCY DEDICATED TO TRANSFORMING DIGITAL JOURNEYS
              </h2>
            </div>
            <div className="page2-right">
              <p>
                We empower businesses, individuals, organisations, and companies
                to thrive in the digital age through a blend of innovative web
                development, design, branding and digital Marketing Services.
                From seamless user experiences to impactful brand identities, we
                deliver practical solutions that drive success, solve real-world
                challenges, and create solutions .
              </p>
              <button>About us</button>
            </div>
          </div>
        </div>
        <div className="page4" data-scroll-section>
          <div className="elem">
            <img
              src="https://d33wubrfki0l68.cloudfront.net/3401770635e95968e300d88f8b9479ecbc008eeb/be2e5/assets/home/home-experience-1.webp"
              alt=""
            />
            <div className="text-div">
              <h1>Branding</h1>
              <h1>Branding</h1>
            </div>
            <img
              src="https://d33wubrfki0l68.cloudfront.net/188bb09da2a445d08ac5b4f706711772e50e8a17/e100a/assets/home/home-experience-2.webp"
              alt=""
            />
          </div>
          <div className="elem">
            <img
              src="https://d33wubrfki0l68.cloudfront.net/3401770635e95968e300d88f8b9479ecbc008eeb/be2e5/assets/home/home-experience-1.webp"
              alt=""
            />
            <div className="text-div">
              <h1>UI/UX Design</h1>
              <h1>UI/UX Design</h1>
            </div>
            <img
              src="https://d33wubrfki0l68.cloudfront.net/188bb09da2a445d08ac5b4f706711772e50e8a17/e100a/assets/home/home-experience-2.webp"
              alt=""
            />
          </div>

          <div className="elem">
            <img
              src="https://d33wubrfki0l68.cloudfront.net/3401770635e95968e300d88f8b9479ecbc008eeb/be2e5/assets/home/home-experience-1.webp"
              alt=""
            />
            <div className="text-div">
              <h1>Web Design</h1>
              <h1>Web Design</h1>
            </div>
            <img
              src="https://d33wubrfki0l68.cloudfront.net/188bb09da2a445d08ac5b4f706711772e50e8a17/e100a/assets/home/home-experience-2.webp"
              alt=""
            />
          </div>
          <div className="elem">
            <img
              src="https://d33wubrfki0l68.cloudfront.net/3401770635e95968e300d88f8b9479ecbc008eeb/be2e5/assets/home/home-experience-1.webp"
              alt=""
            />
            <div className="text-div">
              <h1>Software Development</h1>
              <h1>Software Development</h1>
            </div>
            <img
              src="https://d33wubrfki0l68.cloudfront.net/188bb09da2a445d08ac5b4f706711772e50e8a17/e100a/assets/home/home-experience-2.webp"
              alt=""
            />
          </div>
        </div>
        <div className="page5" data-scroll-section>
          <h2>Mentions Clients</h2>
          <div
            className="box"
            data-image="https://images.unsplash.com/photo-1688362809005-e1d27bf427ac?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDd8Ym84alFLVGFFMFl8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          >
            <h3>Verizon</h3>
            <h4>2021</h4>
          </div>
          <div
            className="box"
            data-image="https://images.unsplash.com/photo-1688232543149-5602b136ba11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDExfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
          >
            <h3>Verizon</h3>
            <h4>2021</h4>
          </div>
          <div
            className="box"
            data-image="https://images.unsplash.com/photo-1688103920333-117afda88518?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDMwfGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
          >
            <h3>Verizon</h3>
            <h4>2021</h4>
          </div>
          <div
            className="box"
            data-image="https://images.unsplash.com/photo-1687913161653-7cddb0ba09b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=736&q=80"
          >
            <h3>Verizon</h3>
            <h4>2021</h4>
          </div>
          <div
            className="box"
            data-image="https://images.unsplash.com/photo-1686904423955-b928225c6488?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDg1fGJvOGpRS1RhRTBZfHxlbnwwfHx8fHw%3D&auto=format&fit=crop&w=500&q=60"
          >
            <h3>Verizon</h3>
            <h4>2021</h4>
          </div>
        </div>
        <footer></footer>
      </div>
    </div>
  );
};

export default Homepage;

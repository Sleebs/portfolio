import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";

export function Presentation(props) {
  const component = useRef();
  const presentationFirstLine = useRef();
  const presentationMiddleLine = useRef();
  const presentationLastLine = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(presentationFirstLine.current, {
        duration: 1.4,
        opacity: 0,
        x: 40,
        ease: "power3.inOut",
        delay: 1.6,
      });
      gsap.from(presentationMiddleLine.current, {
        duration: 1.4,
        opacity: 0,
        x: 80,
        ease: "power3.inOut",
        delay: 1.8,
      });
      gsap.from(presentationLastLine.current, {
        duration: 1.4,
        opacity: 0,
        x: 40,
        ease: "power3.inOut",
        delay: 2,
      });
    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <div className='presentation-section'>
      <div className='presentation-container'>
        <p className='presentation-introduction' ref={presentationFirstLine}>
          👋 Hi, my name is
        </p>
        <h1 ref={presentationMiddleLine}>Samuele Raposo</h1>
        <p className='presentation-description' ref={presentationLastLine}>
          Computer science and D&D entusiast from Milan, Italy
          <i className='material-symbols-outlined'>home_pin</i>
        </p>
      </div>
    </div>
  );
}

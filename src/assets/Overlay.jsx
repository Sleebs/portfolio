import React from "react";
import { Nav } from "./Nav";
import { Presentation } from "./Presentation";
import { PresentationCard } from "./PresentationCard";
import { Footer } from "./Footer";
import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";

export function Overlay(props) {
  const component = useRef();
  const pageNumber = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(pageNumber.current, {
        duration: 1.4,
        opacity: 0,
        x: 40,
        ease: "power3.inOut",
        delay: 2.1,
      });
    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <div className='overlay'>
      <Nav />
      <div className='page-number' id='n00' ref={pageNumber}>
        /00
      </div>
      <Presentation />
      <div className='expand-more'>
        <span className='arrow-down'></span>
        <span id='scroll-title'>Scroll down</span>
      </div>
      <div className='page-number' id='n01'>
        /01
      </div>
      <PresentationCard />
      <Footer />
    </div>
  );
}

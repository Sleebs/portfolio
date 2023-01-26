import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";

export function Nav(props) {
  const component = useRef();
  const navItem = useRef();

  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(navItem.current, {
        duration: 1.4,
        opacity: 0,
        x: 40,
        ease: "power3.inOut",
        delay: 0.2,
      });
    }, component);
    return () => ctx.revert();
  }, []);

  return (
    <div className='nav-bar' ref={navItem}>
      <div className='nav-name'>Samuele.Raposo</div>
      <div className='nav'>
        <a href='mailto: samuele.raposo@gmail.com?subject=Job%20Offer'>
          hire me!
          <i class='material-symbols-outlined'>celebration</i>
        </a>
      </div>
    </div>
  );
}

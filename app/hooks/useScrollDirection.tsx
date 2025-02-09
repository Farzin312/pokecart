"use client";

import { useState, useEffect, useRef } from "react";

export default function useScrollDirection() {
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);
  const scrollDisabled = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollDisabled.current) return; 

      if (window.scrollY < lastScrollY.current) {
        setShow(true);
      } else {
        setShow(false); 
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return { show };
}

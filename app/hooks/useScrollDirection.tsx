// hooks/useScrollDirection.ts
"use client";

import { useState, useEffect, useRef } from "react";

export default function useScrollDirection() {
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < lastScrollY.current) {
        // Scrolling up
        setShow(true);
      } else {
        // Scrolling down
        setShow(false);
      }
      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return show;
}

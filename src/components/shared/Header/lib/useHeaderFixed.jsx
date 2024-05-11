"use client";

import { useEffect, useRef, useState } from "react";

const useHeaderFixed = () => {
  const [isFixed, setIsFixed] = useState(false);
  const lastScrollPosition = useRef(0);

  useEffect(() => {
    const headerFixed = () => {
      const scrollDistance = window.scrollY;
      const isFixed = scrollDistance > lastScrollPosition.current;

      setIsFixed(isFixed);

      lastScrollPosition.current = scrollDistance;
    };

    addEventListener("scroll", headerFixed, { passive: true });

    return () => removeEventListener("scroll", headerFixed);
  }, []);

  return {
    isFixed,
    setIsFixed,
  };
};

export default useHeaderFixed;

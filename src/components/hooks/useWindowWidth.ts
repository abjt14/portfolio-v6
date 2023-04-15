import { useEffect, useState } from "react";

function useWindowWidth(): number {
  const [windowWidth, setWindowWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!windowWidth) return 0;
  return windowWidth;
}

export default useWindowWidth;
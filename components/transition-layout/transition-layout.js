import Link from "next/link";
import { useState, useEffect } from "react";
import styles from "./transition-layout.module.scss";

export default function TransitionLayout({ children }) {
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState("fadeOut");
  useEffect(() => {
    setTransitionStage("fadeIn");
  }, []);

  useEffect(() => {
    if (children !== displayChildren) setTransitionStage("fadeOut");
  }, [children, setDisplayChildren, displayChildren]);

  return (
      <div
          onTransitionEnd={() => {
            if (transitionStage === "fadeOut") {
              setDisplayChildren(children);
              setTransitionStage("fadeIn");
            }
          }}
          className={`${styles.content} ${styles[transitionStage]}`}
      >
        {displayChildren}
      </div>
  );
}

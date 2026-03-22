import * as React from "react";
import decorSvg from "../assets/decorationbutton.svg?raw";

interface CarouselNavButtonProps {
  direction: "prev" | "next";
  onClick: () => void;
  ariaLabel: string;
}

export function CarouselNavButton({ direction, onClick, ariaLabel }: CarouselNavButtonProps) {
  const arrowLeft = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M12 19l-7-7 7-7"/>
    </svg>
  );
  
  const arrowRight = (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );

  const encodedSvg = encodeURIComponent(decorSvg);
  
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: "48px",
        height: "48px",
        background: `transparent url("data:image/svg+xml,${encodedSvg}") center / 100% no-repeat`,
        border: "none",
        color: "#c2b067",
        cursor: "pointer",
        transition: "transform 0.2s",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = "scale(1)";
      }}
    >
      {direction === "prev" ? arrowLeft : arrowRight}
    </button>
  );
}

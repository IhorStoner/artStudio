import React from "react";

export const PrevButton = ({ enabled, onClick }) => (
  <button
    className="embla__button embla__button--prev"
    onClick={onClick}
    disabled={!enabled}
  >
    <svg width="37" height="63" viewBox="0 0 37 63" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M0.639365 31.6423L4.96083 35.9096L32.0392 62.6525L36.6482 58.1006L9.56984 31.3577L36.36 4.89937L31.751 0.346863L0.351227 31.3577L0.639365 31.6423Z" fill="white" stroke="black" strokeWidth="0.8195" strokeMiterlimit="10" />
    </svg>

  </button>
);

export const NextButton = ({ enabled, onClick }) => (
  <button
    className="embla__button embla__button--next"
    onClick={onClick}
    disabled={!enabled}
  >
    <svg width="37" height="63" viewBox="0 0 37 63" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M36.3606 31.3577L32.0391 27.0904L4.9608 0.347493L0.351796 4.8994L27.4301 31.6423L0.639935 58.1006L5.24893 62.6531L36.6487 31.6423L36.3606 31.3577Z" fill="white" stroke="black" strokeWidth="0.8195" strokeMiterlimit="10" />
    </svg>
  </button>
);
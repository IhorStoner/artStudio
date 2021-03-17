import React from "react";

export const Pollex = ({ selected, onClick, imgSrc }) => (
    <div
        className={`embl__slide embl__slide--thumb ${selected ? "is-selected" : ""
            }`}
    >
        <button
            onClick={onClick}
            className="embl__slide__inner embl__slide__inner--thumb"
            type="button"
        >
            <img className="embl__slide__thumbnail" src={imgSrc} alt="A cool cat." />
        </button>
    </div>
);
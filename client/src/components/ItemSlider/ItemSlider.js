import React, { useState, useEffect, useCallback } from "react";
import { PrevButton, NextButton } from "./SliderBtns";
import { useEmblaCarousel } from "embla-carousel/react";
import "./embla.scss";
import config from '../../config/default.json'


export default function ItemSlider({ imgArr }) {
  const [viewportRef, embla] = useEmblaCarousel({ loop: true });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const onSelect = useCallback(() => {
    if (!embla) return;
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);



  return (
    <div className="embla">
      <div className="embla__viewport" ref={viewportRef}>
        <div className="embla__container">
          {imgArr.map((img, index) => (
            <div className="embla__slide" key={index}>
              <div className="embla__slide__inner">
                <img
                  className="embla__slide__img sliderPopup__img"
                  src={`${config.serverUrl}/api/images/${img}`}
                  alt="sliderImg"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
      <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
    </div>
  )
}
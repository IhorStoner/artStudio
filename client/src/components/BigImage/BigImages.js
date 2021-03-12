import React, { useState, useEffect, useCallback } from "react";
import { PrevButton, NextButton } from "../OpenPictureSlider/SliderBtns";
import { useEmblaCarousel } from "embla-carousel/react";
import config from '../../config/default.json'
import { Thumb } from "../OpenPictureSlider/Thumbs";
import './BigImages.scss'
import { useSelector } from "react-redux";
import { getOnePicture } from "../../redux/selector/picturesSelector";

export default function BigImages({ thumbs = true }) {

    const picture = useSelector(getOnePicture)

    const [viewportRef, embla] = useEmblaCarousel({ loop: true });
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
        containScroll: "keepSnaps",
        selectedClass: ""
    });

    const onThumbClick = useCallback(
        (index) => {
            if (!embla || !emblaThumbs) return;
            if (emblaThumbs.clickAllowed()) embla.scrollTo(index);
        },
        [embla, emblaThumbs]
    );


    const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
    const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

    const onSelect = useCallback(() => {
        if (!embla || !emblaThumbs) return;
        setPrevBtnEnabled(embla.canScrollPrev());
        setNextBtnEnabled(embla.canScrollNext());
        setSelectedIndex(embla.selectedScrollSnap());
        emblaThumbs.scrollTo(embla.selectedScrollSnap());
    }, [embla, emblaThumbs, setSelectedIndex]);

    useEffect(() => {
        if (!embla) return;
        embla.on("select", onSelect);
        onSelect();
    }, [embla, onSelect]);

    useEffect(() => {
        console.log(picture)
    }, [picture])

    return (
        <div className='embla__wrapper'>
            <div className="embla embla--width">
                <div className="embla__viewport" ref={viewportRef}>
                    <div className="embla__container">
                        {picture?.images?.map((img, index) => (
                            <div className="embla__slide" key={index}>
                                <div className="embla__slide__inner embla__slide__inner--height">
                                    <img
                                        className="embla__slide__img "
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
            <div>
                {
                    thumbs &&
                    <div className="embla embla--thumb">
                        <div className="embla__viewport" ref={thumbViewportRef}>
                            <div className="embla__container embla__container--thumb">
                                {picture?.images?.map((img, index) => (
                                    <Thumb
                                        onClick={() => onThumbClick(index)}
                                        selected={index === selectedIndex}
                                        imgSrc={`${config.serverUrl}/api/images/${img}`}
                                        key={index}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
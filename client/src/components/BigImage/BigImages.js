import React, { useState, useEffect, useCallback } from "react";
import { PrevButton, NextButton } from "../OpenPictureSlider/SliderBtns";
import { useEmblaCarousel } from "embla-carousel/react";
import config from '../../config/default.json'
import { Thumb } from "../OpenPictureSlider/Thumbs";
import './BigImages.scss'
import { useDispatch, useSelector } from "react-redux";
import { getOnePicture, getPicturePreview } from "../../redux/selector/picturesSelector";
import { ReactComponent as CloseSliderSVG } from '../../assets/svg/closeSlider.svg'
import { setPicturePreview } from "../../redux/action/picturesAction";

export default function BigImages({ imgArr, thumbs = true }) {
    const picturePreview = useSelector(getPicturePreview)
    const picture = useSelector(getOnePicture)
    const [viewportRef, embla] = useEmblaCarousel({ loop: true });
    const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
    const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
    const dispatch = useDispatch()
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
    }, [picture])

    return (
        <div className='embl__wrapper'>
            <div className="embl embl--width">
                <CloseSliderSVG onClick={() => dispatch(setPicturePreview(null))} className="embl embl--svg" />
                <div className="embl__viewport" ref={viewportRef}>
                    <div className="embl__container">
                        {imgArr.map((img, index) => (
                            <div className="embl__slide" key={index}>
                                <div className="embl__slide__inner embl__slide__inner--height">
                                    <img
                                        className="embl__slide__img "
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
                    <div className="embl embl--thumb">
                        <div className="embl__viewport" ref={thumbViewportRef}>
                            <div className="embl__container embl__container--thumb">
                                {imgArr.map((img, index) => (
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
import React, { useState, useEffect, useCallback } from "react";
import { PrevButton, NextButton } from "./SliderBtns";
import { useEmblaCarousel } from "embla-carousel/react";

import config from '../../../config/default.json'
import { setPicturePreview } from "../../../redux/action/picturesAction";
import { useDispatch } from "react-redux";
import "./embla.scss";


export default function ItemsSlider({ imgArr }) {
  const [viewportRef, embla] = useEmblaCarousel({ loop: true });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const dispatch = useDispatch()
  
  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);
  const onSelect = useCallback(() => {
    if (!embla) return;
    console.log(embla)
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla]);

  useEffect(() => {
    if (!embla) return;
    embla.on("select", onSelect);
    onSelect();
  }, [embla, onSelect]);


  return (
    <div className="emblas">
      <div className="emblas__viewport" ref={viewportRef}>
        <div className="emblas__container">
          {imgArr.map((img, index) => (
            <div className="emblas__slide" key={index}>
              <div className="emblas__slide__inner">
                <img
                  onClick={() => dispatch(setPicturePreview(imgArr))}
                  className="emblas__slide__img sliderPopup__img"
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

// import React, { useState, useEffect, useCallback } from "react";
// import { useEmblaCarousel } from "embla-carousel/react";
// import config from '../../../config/default.json'

// const ItemsSlider = ({ imgArr }) => {
//   const [selectedIndex, setSelectedIndex] = useState(0);
//   const [mainViewportRef, embla] = useEmblaCarousel();
//   const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
//     // containScroll: "keepSnaps",
//     selectedClass: "",
//     startIndex: 0,
//   });

//   const onSelect = useCallback(() => {
//     if (!embla || !emblaThumbs) return;
//     setSelectedIndex(embla.selectedScrollSnap());
//     emblaThumbs.scrollTo(embla.selectedScrollSnap());
//   }, [embla, emblaThumbs, setSelectedIndex]);

//   useEffect(() => {
//     if (!embla) return;
//     onSelect();
//     embla.on("select", onSelect);
//   }, [embla, onSelect]);

//   return (
//     <>
//       <div className="embla">
//         <div className="embla__viewport" ref={mainViewportRef}>
//           <div className="embla__container">
//             {imgArr.map((elem,i) => {
//               // console.log(index)
//               return (
//                 <div className="embla__slide" key={i}>
//                   <div className="embla__slide__inner">
//                     <img
//                       className="embla__slide__img"
//                       src={`${config.serverUrl}/api/images/${elem}`}
//                       alt={i}
//                       key={i}
//                     />
//                   </div>
//                 </div>
//               )
//             })}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ItemsSlider;
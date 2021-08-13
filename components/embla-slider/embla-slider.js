import React, { useState, useEffect, useCallback } from 'react'
import cn from "classnames";
import Image from 'next/image'
import { PrevButton, NextButton } from "./buttons/buttons";
import { Thumb } from "./thumb/thumb"
import { useEmblaCarousel } from 'embla-carousel/react'
import styles from './embla-slider.module.scss'


export default function EmblaSlider({data, className}) {
  const [viewportRef, embla] = useEmblaCarousel({
    loop: true,
    skipSnaps: false
  });
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [thumbViewportRef, emblaThumbs] = useEmblaCarousel({
    containScroll: "keepSnaps",
    dragFree: false
  });

  const scrollPrev = useCallback(() => embla && embla.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla && embla.scrollNext(), [embla]);

  const onThumbClick = useCallback(
      (index) => {
        if (!embla || !emblaThumbs) return;
        if (emblaThumbs.clickAllowed()) embla.scrollTo(index);
      },
      [embla, emblaThumbs]
  );

  const onSelect = useCallback(() => {
    if (!embla) return;
    setSelectedIndex(embla.selectedScrollSnap());
    setPrevBtnEnabled(embla.canScrollPrev());
    setNextBtnEnabled(embla.canScrollNext());
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    onSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", onSelect);
  }, [embla, setScrollSnaps, onSelect]);

  return (
    <div className={className}>
      <div ref={viewportRef}>
        <div className={styles.embla__container}>
          {data.map(project => {
            return (
              <div key={project.id} className={styles.embla__slide}>
                <div className={styles.pictureContainer}>
                  <img className={styles.picture} alt={project.imgs[0]} src={'/projects/' + project.imgs[0]} />
                </div>
                <div className={styles.info}>
                  <h3 className={styles.name}>{project.name}</h3>
                  {project.description.map((part, i) => (
                      <p key={i} className={styles.description}>{part}</p>
                  ))}
                  <div className={styles.tagContainer}>
                    {project.tags.map((tag, i) => (
                        <span key={i} className={cn(styles.tag, styles.ripple )} style={{backgroundColor: tag.color}}>{tag.name}</span>
                    ))}
                  </div>
                  <a className={styles.link} target="_blank" href={project.link} rel="noopener noreferrer">{project.linkName}</a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
      <div className={styles.controllButtons}>
        <PrevButton className={styles.left} onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton className={styles.right} onClick={scrollNext} enabled={nextBtnEnabled} />
        {/*<ButtonBack className="controllButtons_left"><FontAwesomeIcon className="controllButtons_icon" size="3x" icon={faAngleLeft} /></ButtonBack>*/}
        {/*<ButtonNext className="controllButtons_right"><FontAwesomeIcon className="controllButtons_icon" size="3x" icon={faAngleRight} /></ButtonNext>*/}
        <div className={styles.numbers} ref={thumbViewportRef}>
          <div className={styles.numbers__inner}>
            {data.map((project, i) => (
                <Thumb
                    onClick={() => onThumbClick(i)}
                    selected={i === selectedIndex}
                    imgSrc={project.buttonImage}
                    key={project.id}
                />
            ))}
          </div>
        </div>
      </div>

    </div>
  )
}
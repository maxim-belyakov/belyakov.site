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

  const shimmer = (w, h) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#333" offset="20%" />
          <stop stop-color="#222" offset="50%" />
          <stop stop-color="#333" offset="70%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#333" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>`

  const toBase64 = (str) =>
      typeof window === 'undefined'
          ? Buffer.from(str).toString('base64')
          : window.btoa(str)

  return (
    <div className={className} ref={viewportRef}>
      <div className={styles.embla__container}>
        {data.map(project => {
          const image = project.imgs;
          return (
              <div key={project.id} className={styles.embla__slide}>
                <div className={styles.pictureContainer}>
                  <Image
                      alt={image.path}
                      width={image.width}
                      height={image.height}
                      layout="responsive"
                      src={'/projects/' + image.path}
                      blurDataURL={'/projects/' + image.path}
                  />
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
      <div className={styles.controllButtons}>
        <PrevButton onClick={scrollPrev} enabled={prevBtnEnabled} />
        <NextButton onClick={scrollNext} enabled={nextBtnEnabled} />
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
import cn from "classnames";
import Image from 'next/image'
import React from "react";
import styles from './thumb.module.scss'

export const Thumb = ({ selected, onClick, imgSrc }) => (
  <div className={styles.thumb}>
    <button
      onClick={onClick}
      className={cn(
          styles.button,
          selected ? styles.iSelected : ''
      )}
      type="button"
    >
      <Image width={100} height={100} className={styles.image} src={imgSrc} />
    </button>
  </div>
);

import cn from "classnames";
import Image from 'next/image'
import React from "react";
import styles from './thumb.module.scss'

export const Thumb = ({ selected, onClick, imgSrc }) => (
  <div
    className={cn(
      styles.thumb,
      selected ? styles.iSelected : ''
    )}
  >
    <button
      onClick={onClick}
      className={cn(styles.inner, styles.inner__thumb)}
      type="button"
    >
      <Image width={100} height={100} className={styles.thumbnail} src={imgSrc} />
    </button>
  </div>
);

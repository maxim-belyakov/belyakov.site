import c from "classnames";
import Link from "next/link"
import { ButtonBack, ButtonNext, CarouselProvider, Slide, Slider, DotGroup, Image } from 'pure-react-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'
import projectsData from "../JSON/projectsData"
import styles from '../styles/Portfolio.module.scss'

export default function Portfolio() {
  const projects = projectsData.message

  return(
      <div className={styles.Portfolio}>
        <div className={styles.Portfolio_back}>
          <Link className={c(styles.Portfolio_backButton, styles.line)} href="/">Maxim Belyakov</Link>
        </div>

        <div className={styles.Portfolio_projects}>
          <CarouselProvider
              className={styles.Portfolio_carousel}
              visibleSlides={1}
              totalSlides={8}
              step={1}
              currentSlide={1}
              // isIntrinsicHeight
              hasMasterSpinner={true}
              infinite={true}
              touchEnabled={true}
              dragEnabled={false}
          >
            <Slider
                className={styles.slider}
                classNameTray="carouselTray"
                moveThreshold={0.2}
            >
              {projects.map((project, i) => (
                  <Slide
                      className="slide"
                      index={i}
                      key={i}
                  >
                    <div className={styles.slideContent}>
                      <div className={styles.slideContent_picturesSlider}>
                        <Image className={styles.slideContent_picture} alt={project.imgs[0]} src={'projects/' + project.imgs[0]} />
                      </div>
                      <div className={styles.slideContent_text}>
                        <h3 className={styles.slideContent_name}>{project.name}</h3>

                        {project.description.map((part, i) => (
                            <p key={i} className={styles.slideContent_description}>{part}</p>
                        ))}

                        <div className={styles.slideContent_tagContainer}>
                          {project.tags.map((tag, i) => (
                              <span key={i} className={c(styles.slideContent_tag, styles.ripple)} style={{backgroundColor: tag.color}}>{tag.name}</span>
                          ))}
                        </div>

                        <a className={styles.slideContent_link} target="_blank" href={project.link} rel="noopener noreferrer">{project.linkName}</a>
                      </div>
                    </div>
                  </Slide>
              ))}
            </Slider>
            <div className={styles.controllButtons}>
              <ButtonBack className={styles.controllButtons_left}><FontAwesomeIcon className={styles.controllButtons_icon} size="3x" icon={faAngleLeft} /></ButtonBack>
              <ButtonNext className={styles.controllButtons_right}><FontAwesomeIcon className={styles.controllButtons_icon} size="3x" icon={faAngleRight} /></ButtonNext>
              <div className={styles.controllButtons_numbers}>
                <DotGroup dotNumbers />
              </div>
            </div>
          </CarouselProvider>
        </div>
      </div>
  )
}
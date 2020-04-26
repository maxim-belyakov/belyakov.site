import React from 'react';
import { Link } from "react-router-dom";
import { ButtonBack, ButtonNext, CarouselProvider, Slide, Slider, DotGroup, Image } from 'pure-react-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

import projectsData from "../JSON/projectsData"

import './../scss/portfolio.scss';

export default function Portfolio() {
    const projects = projectsData.message

    console.log('test')

    return(      
        <div className="Portfolio">
            <div className="Portfolio_back">
                <Link className="Portfolio_backButton line" to="/">Maxim Belyakov</Link>
            </div>

            <div className="Portfolio_projects">
                <CarouselProvider
                    className="Portfolio_carousel"
                    visibleSlides={1}
                    totalSlides={7}
                    step={1}
                    currentSlide={1}
                    // isIntrinsicHeight
                    hasMasterSpinner={true}
                    infinite={true}
                    touchEnabled={true}
                    dragEnabled={true}
                >
                    <Slider 
                        className="slider"
                        classNameTray="carouselTray"
                        moveThreshold={0.2}
                        >
                        {projects.map((project, i) => (                    
                            <Slide 
                                className="slide"
                                index={i} 
                                key={i} 
                                >
                                <div className={"slideContent " + (i === 0 ? 'meText' : '')}>
                                    <div className="slideContent_picturesSlider">
                                        <Image className="slideContent_picture" alt={project.imgs[0]} src={'projects/' + project.imgs[0]} />
                                    </div>
                                    <div className="slideContent_text">
                                        <h3 className="slideContent_name">{project.name}</h3>

                                        {project.description.map((part, i) => (
                                            <p key={i} className="slideContent_description">{part}</p>
                                        ))}

                                        <div className="slideContent_tagContainer"> 
                                            {project.tags.map((tag, i) => (
                                                <span key={i} className="slideContent_tag ripple" style={{backgroundColor: tag.color}}>{tag.name}</span>
                                            ))}
                                        </div>

                                        <a className="slideContent_link" target="_blank" href={project.link} rel="noopener noreferrer">{project.linkName}</a> 
                                    </div> 
                                </div>
                            </Slide>
                        ))}
                    </Slider>
                    <div className="controllButtons">
                        <ButtonBack className="controllButtons_left"><FontAwesomeIcon className="controllButtons_icon" size="3x" icon={faAngleLeft} /></ButtonBack>
                        <ButtonNext className="controllButtons_right"><FontAwesomeIcon className="controllButtons_icon" size="3x" icon={faAngleRight} /></ButtonNext>
                        <div className="controllButtons_numbers">
                            <DotGroup dotNumbers />
                        </div>
                    </div>
                </CarouselProvider>            
            </div>            
        </div>
    )
  }
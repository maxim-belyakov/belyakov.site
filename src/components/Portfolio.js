import React from 'react';
import { Link } from "react-router-dom";
import { ButtonBack, ButtonNext, CarouselProvider, Slide, Slider, DotGroup } from 'pure-react-carousel';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons'

import projectsData from "../JSON/projectsData"

import './../css/portfolio.scss';

export default function Portfolio() {
    const projects = projectsData.message

    return(      
        <div className="PortfolioContiner">
            <main className="PortfolioContiner_Back">
                <h2 className="check">
                    <Link to="/">Back</Link>
                </h2>
            </main>

            <div class="PortfolioContiner_Projects">
                <CarouselProvider
                    visibleSlides={1}
                    totalSlides={7}
                    step={1}
                    isIntrinsicHeight
                    infinite={true}
                >
                    <Slider className="slider">
                        {projects.map((project, i) => (                    
                            <Slide index={i} key={i} className="slide">
                                <>
                                    {i === 0 ? (
                                        <div style={{textAlign: "center"}}>
                                            <div id="intro-text">
                                                <h2>About me</h2>
                                                My name is Maxim Belyakov. I'm a creative professional with more than 5 years of industry experience in <span className="label gamedesign">Frontend Development</span>. What makes me passionate about WEB is the combination of technology and creativity, and how multiple disciplines come together to create an interactive experience. 
                                                <br/>
                                                I always try to tell a story.
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="slideContent">
                                            <div className="slideContent_picturesSlider" style={{display: "block"}}>
                                                {/* {project.imgs.map((imgLink, i) => (
                                                    <img key={i} className="sliderImg" alt={imgLink} src={'projects/' + imgLink}></img>
                                                ))} */}
                                                <img className="slideContent_picture" alt={project.imgs[0]} src={'projects/' + project.imgs[0]}></img>
                                            </div>
                                            <div class="slideContent_text">
                                                <h3 className="slideContent_name">{project.name}</h3>
                                                <p className="slideContent_description">{project.description}</p>

                                                <div className="slideContent_tagContainer"> 
                                                    {project.tags.map((tag, i) => (
                                                        <span className="slideContent_tag" style={{backgroundColor: tag.color}}>{tag.name}</span>
                                                    ))}
                                                </div>

                                                <a className="slideContent_link" target="_blank" href={project.link}>{project.linkName}</a> 
                                            </div> 
                                        </div>
                                    )}      
                                                                       
                                </>                 
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
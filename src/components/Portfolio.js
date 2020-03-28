import React from 'react';
import { Link } from "react-router-dom";
import { ButtonBack, ButtonNext, CarouselProvider, Slide, Slider, DotGroup } from 'pure-react-carousel';

import projectsData from "../projectsData"

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
                                <div className="slideContent">
                                    <div className="slideContent_picturesSlider" style={{display: "block"}}>
                                        {/* {project.imgs.map((imgLink, i) => (
                                            <img key={i} className="sliderImg" alt={imgLink} src={'projects/' + imgLink}></img>
                                        ))} */}
                                        <img className="sliderImg" alt={project.imgs[1]} src={'projects/' + project.imgs[1]}></img>
                                    </div>
                                    <div class="slideContent_text">
                                        <h3 className="slideContent_name">{project.name}</h3>
                                        <p className="slideContent_description">{project.description}</p>

                                        <div className="slideContent_tagContainer"> 
                                            {project.tags.map((tag, i) => (
                                                <span className="slideContent_tag" style={{backgroundColor: tag.color}}>{tag.name}</span>
                                            ))}
                                        </div>

                                        <a className="slideContent_link" href={project.link}>{project.linkName}</a> 
                                    </div>                                    
                                </div>                 
                            </Slide>
                        ))}
                    </Slider>
                    <div className="controllButtons">
                        <ButtonBack className="controllButtons_left">{'<'}</ButtonBack>
                        <ButtonNext className="controllButtons_right">{'>'}</ButtonNext>
                        <DotGroup dotNumbers />
                    </div>
                </CarouselProvider>            
            </div>            
        </div>
    )
  }
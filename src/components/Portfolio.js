import React from 'react';
import { Link } from "react-router-dom";
import { ButtonBack, ButtonNext, CarouselProvider, Slide, Slider, DotGroup } from 'pure-react-carousel';

import projectsData from "../projectsData"

import './../css/slider.scss';

export default function Portfolio() {
    const projects = projectsData.message

    return(      
        <div>
            <main>
                <h2 className="check">
                <Link to="/">Back</Link>
                </h2>
            </main>

            <div>
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
                                    <h3>{project.name}</h3>
                                    <div className="content" style={{display: "block"}}>
                                        <p>{project.description}</p>
                                        {project.imgs.map((imgLink, i) => (
                                            <img key={i} className="sliderImg" alt={imgLink} src={'projects/' + imgLink}></img>
                                        ))}                
                                    </div>
                                    <a href={project.link}>{project.linkName}</a>
                                    <img  className="sliderImg" src={'cats/img0'+ i + '.jpeg'} alt={project.linkName}></img>    
                                </div>                 
                            </Slide>
                        ))}
                    </Slider>
                    <div className="controllButtons">
                        <ButtonBack>Back</ButtonBack>
                        <ButtonNext>Next</ButtonNext>
                        <DotGroup dotNumbers />
                    </div>
                </CarouselProvider>
            
            </div>            
        </div>
    )
  }
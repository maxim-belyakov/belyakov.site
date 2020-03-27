import React from 'react';
import { Link } from "react-router-dom";
import { ButtonBack, ButtonFirst, ButtonLast, ButtonNext, CarouselProvider, Slide, Slider, } from 'pure-react-carousel';

import projectsData from "../projectsData"

import s from './../css/slider.css';

export default function Portfolio() {
    const projects = projectsData.message

    return(
      <main>
        <h2 className="check">
          <Link to="/">Back</Link>
        </h2>

        <div style={{display: "none"}}>
            {projects.map((project, i) => (
                <div key={i}>
                    <h3>{project.name}</h3>
                    <div className="content" style={{display: "block"}}>
                        <p>{project.description}</p>
                        {project.imgs.map((imgLink, i) => (
                            <img key={i} style={{width: "100%"}} alt={imgLink} src={imgLink}></img>
                        ))}                
                    </div>
                    <a href={project.link}>{project.linkName}</a>
                </div>
            ))}
        </div>        

        <div>
            <CarouselProvider
                visibleSlides={1}
                totalSlides={4}
                step={1}
                naturalSlideWidth={400}
                naturalSlideHeight={500}
                isIntrinsicHeight
                infinite={true}
            >
                {/* <h2 className={s.headline}>With intrinsic axis dimension</h2> */}

                <Slider className={s.slider}>

                {projects.map((project, i) => (                    
                    <Slide index={i}>
                        <div key={i}>
                            <h3>{project.name}</h3>
                            <div className="content" style={{display: "block"}}>
                                <p>{project.description}</p>
                                {project.imgs.map((imgLink, i) => (
                                    <img key={i} style={{width: "100%"}} alt={imgLink} src={'projects/' + imgLink}></img>
                                ))}                
                            </div>
                            <a href={project.link}>{project.linkName}</a>
                            <img style={{width: "100%"}} src={'cats/img0'+ i + '.jpeg'}></img>
                        </div>                        
                    </Slide>
                ))}
                </Slider>
                <div className="controllButtons">
                    <ButtonFirst>First</ButtonFirst>
                    <ButtonBack>Back</ButtonBack>
                    <ButtonNext>Next</ButtonNext>
                    <ButtonLast>Last</ButtonLast>
                </div>
            </CarouselProvider>
        
        </div>

        </main>
    )
  }
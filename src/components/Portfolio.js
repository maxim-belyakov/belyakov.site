import React from 'react';
import { Link } from "react-router-dom";
import { ButtonBack, ButtonNext, CarouselProvider, Slide, Slider, DotGroup } from 'pure-react-carousel';

import projectsData from "../projectsData"

import './../css/slider.scss';

function eventLogger(ev) {
  // eslint-disable-next-line no-console
//   console.log(ev.type, ev.target);
}

export default function Portfolio() {
    const projects = projectsData.message

    return(
      <main>
        <h2 className="check">
          <Link to="/">Back</Link>
        </h2>

        {/* <div style={{display: "none"}}>
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
        </div>*/}

        <div>
            <CarouselProvider
                visibleSlides={1}
                totalSlides={7}
                step={1}
                // naturalSlideWidth={400}
                // naturalSlideHeight={700}
                isIntrinsicHeight
                infinite={true}
            >
                {/* <h2 className={s.headline}>With intrinsic axis dimension</h2> */}

                <Slider 
                    className="slider" 
                    trayProps={{
                        // clipboard events? Sure why not.
                        onCopy: eventLogger,
                        onCut: eventLogger,
                        onPaste: eventLogger,
                
                        // composition events
                        onCompositionEnd: eventLogger,
                        onCompositionStart: eventLogger,
                        onCompositionUpdate: eventLogger,
                
                        // keyboard events
                        onKeyDown: eventLogger,
                        onKeyPress: eventLogger,
                        onKeyUp: eventLogger,
                
                        // focus events,
                        onFocus: eventLogger,
                        onBlur: eventLogger,
                
                        // form events,
                        onChange: eventLogger,
                        onInput: eventLogger,
                        onInvalid: eventLogger,
                        onSubmit: eventLogger,
                
                        // mouse events
                        onClick: eventLogger,
                        onContextMenu: eventLogger,
                        onDoubleClick: eventLogger,
                        onDrag: eventLogger,
                        onDragEnd: eventLogger,
                        onDragEnter: eventLogger,
                        onDragExit: eventLogger,
                        onDragLeave: eventLogger,
                        onDragOver: eventLogger,
                        onDragStart: eventLogger,
                        onDrop: eventLogger,
                        onMouseDown: eventLogger,
                        onMouseEnter: eventLogger,
                        onMouseLeave: eventLogger,
                        // onMouseMove: eventLogger,
                        onMouseOut: eventLogger,
                        onMouseOver: eventLogger,
                        onMouseUp: eventLogger,
                
                        // touch events
                        onTouchCancel: eventLogger,
                        onTouchEnd: eventLogger,
                        // onTouchMove: eventLogger,
                        onTouchStart: eventLogger,
                
                        // pointer events
                        onPointerDown: eventLogger,
                        // onPointerMove: eventLogger,
                        onPointerUp: eventLogger,
                        onPointerCancel: eventLogger,
                        onGotPointerCapture: eventLogger,
                        onLostPointerCapture: eventLogger,
                        onPointerEnter: eventLogger,
                        onPointerLeave: eventLogger,
                        onPointerOver: eventLogger,
                        onPointerOut: eventLogger,
                
                        draggable: true,
                      }}
                >

                    {projects.map((project, i) => (                    
                        <Slide index={i} key={i} className="slide">
                            <h3>{project.name}</h3>
                            <div className="content" style={{display: "block"}}>
                                <p>{project.description}</p>
                                {project.imgs.map((imgLink, i) => (
                                    <img key={i} className="sliderImg" alt={imgLink} src={'projects/' + imgLink}></img>
                                ))}                
                            </div>
                            <a href={project.link}>{project.linkName}</a>
                            <img  className="sliderImg" src={'cats/img0'+ i + '.jpeg'} alt={project.linkName}></img>                     
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

        </main>
    )
  }
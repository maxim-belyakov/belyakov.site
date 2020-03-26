import React from 'react';
import { Link } from "react-router-dom";

import projectsData from "../projectsData"

export default function Portfolio() {
    const projects = projectsData.message

    return(
      <main>
        <h2 className="check">
          <Link to="/">Back</Link>
        </h2>

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

        <br /><br /><br /><br /><br /><br /><br /><br /><br />
  
        <h3>Ponominalu 2018</h3>
        <div className="content" style={{display: "block"}}>
          <p>lalala</p>
          <img style={{width: "100%"}} src="puppy.jpg"></img>
        </div>
        <h3>A Collapsible:</h3>
        <button type="button" className="collapsible">Open Collapsible</button>
        <div className="content">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
        <h3>A Collapsible:</h3>
        <button type="button" className="collapsible">Open Collapsible</button>
        <div className="content">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </div>
      </main>
    )
  }
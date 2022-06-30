import React from "react";
import { Link } from "react-router-dom";
import TeamLogo from "../../Assets/Images/undraw_teamwork_hpdk.svg"
import "../../Assets/Styles/component.css"


export default function LPAbout() {
    return (
      
      <section id="section_about" className="section_about">
        <div className="row">
          <div className="col container_image">
            <img className="img-fluid" src={TeamLogo} alt="team logo"/>
          </div>
          <div className="col-md-5 container_details">
            <div className="section_title">ResGM</div>
            <div className="section_subtitle">Researcher Group Manager</div>
            <div className="section_desc">
              A management platform to help the researchers
              to produce websites for research recording and manage research group.
            </div>
            <Link className="btn btn_light" to="/signup">Sign Up!</Link>
          </div>
        </div>
      </section>

    )
};
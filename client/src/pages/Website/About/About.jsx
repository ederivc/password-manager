import React from "react";
import { IMAGES } from "../../../helpers/images";

import "./About.scss";

const About = () => {
  return (
    <>
      <h2 className="about-title">
        About <span>Us</span>
      </h2>
      <div className="about">
        <div className="about__item about__mission about__transparent">
          <div className="about__item__header">
            <strong>Mission</strong>
          </div>
          <div className="about__item__body">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
            eligendi sunt cupiditate aperiam nobis repellat error porro quas
            totam voluptate voluptatem hic
          </div>
        </div>
        <div className="about__item about__vision about__medium">
          <div className="about__item__header">
            <strong>Vision</strong>
          </div>
          <div className="about__item__body">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum
            eligendi sunt cupiditate aperiam nobis
          </div>
        </div>
        <div className="about__item about__target about__medium">
          <div className="about__item__header">
            <strong>Our</strong>
            <br />
            <strong>Clients</strong>
          </div>
          <div className="about__item__body">
            <img src={IMAGES.CLIENTS} alt="our-clients" />
          </div>
        </div>
        <div className="about__item about__values about__medium">
          <div className="about__item__header">
            <strong>Core values</strong>
          </div>
          <div className="about__item__body">
            <img src={IMAGES.FRIENDSHIP} alt="friendship" />
            <img src={IMAGES.RESEARCH} alt="research" />
            <img src={IMAGES.TEAMWORK} alt="teamwork" />
            <img src={IMAGES.TROPHY} alt="trophy" />
          </div>
        </div>
        <div className="about__item about__history about__transparent">
          <div className="about__item__header">
            <strong>Our history</strong>
          </div>
          <div className="about__item__body">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum
            voluptatem nihil, quibusdam accusamus ipsam doloremque recusandae
            blanditiis modi illo natus sapiente veritatis cum at! Temporibus
            nihil expedita maxime quod sapiente.
          </div>
        </div>
      </div>
    </>
  );
};

export { About };

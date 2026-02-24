import React from "react";
import Herosection from "./pagecom/Herosection";
import Aboutsection from "./pagecom/Aboutsection";
import SkillsSection from "./pagecom/SkillsSection";
import Contact from "./pagecom/ContactSection";

const App = () => {
  return (
    <div>
      <div id="hero">
        {" "}
        <Herosection />{" "}
      </div>
      <div id="about">
        {" "}
        <Aboutsection />{" "}
      </div>
      <div id="skills">
        {" "}
        <SkillsSection />{" "}
      </div>

      <div id="contact">
        {" "}
        <Contact />{" "}
      </div>
    </div>
  );
};

export default App;

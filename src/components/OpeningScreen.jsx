/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=================================================
Import
=================================================*/
import { useEffect } from "react";
import OptionsForm from "./OptionsForm"

/*=================================================
OpeningScreen
=================================================*/
const OpeningScreen = (props) => {

  // Scrolls to the top when OpeningScreen mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section className="opening-screen">
      <h1>Quizzical</h1>
      <p className="opening-screen__tagline">A bite-sized trivia app</p>

      <OptionsForm 
        setFormData = {props.setFormData}
        setGameHasEnded={props.setGameHasEnded}
        setGameHasStarted={props.setGameHasStarted}
      />
    </section>
  );
};

export default OpeningScreen;
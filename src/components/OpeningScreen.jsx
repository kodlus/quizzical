/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/*=================================================
Import
=================================================*/
import OptionsForm from "./OptionsForm"

/*=================================================
OpeningScreen
=================================================*/
const OpeningScreen = (props) => {
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
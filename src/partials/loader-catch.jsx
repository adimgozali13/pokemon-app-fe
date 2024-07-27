import React, { useState } from "react";
import PokeTop from "../assets/img/icon/pokeball-top.png";
import PokeBot from "../assets/img/icon/pokeball-bot.png";

const LoaderCatch = ({type}) => {
    const [isHidden, setIsHidden]  = useState(false);

    const handleAnimationEnd = () => {
        if (type == "loaderOut") {
            setIsHidden('d-none');
        }
      };
  return (
    <>
      <div className={`load-top ${type} ${isHidden}`} onAnimationEnd={handleAnimationEnd}>
        <center>
          <img src={PokeTop} className="poke-top" alt="" />
        </center>
      </div>
      <div className={`load-bot ${type} ${isHidden}`} onAnimationEnd={handleAnimationEnd}>
        <center>
          <img src={PokeBot} className="poke-bot" alt="" />
        </center>
      </div>
    </>
  );
};

export default LoaderCatch;

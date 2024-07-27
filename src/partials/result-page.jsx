import React from "react";
import { Link } from "react-router-dom";
import emptyPoke from "../assets/img/icon/lock.png";
import successIcon from "../assets/img/icon/check.png";
import errorIcon from "../assets/img/icon/cancel.png";

const ResultPage = ({ type, urlImg, pokemon }) => {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  return (
    <>
      {type === "congrats" ? (
        <div className="page-result">
          <div className="ctn-res text-center">
            <img className="showImg" src={urlImg} alt="" />
            <h1 className="congrats">Congratulations!</h1>
            <label className="text-muted">
              Congratulations, you have obtained a{" "}
              {capitalizeFirstLetter(pokemon)}!
            </label>
            <br />
            <Link
              to="/my-pokemon"
              className="btn btn-outline-dark rounded-pill mt-4"
            >
              See My Pokemon
            </Link>
          </div>
        </div>
      ) : type === "srelease" ? (
        <div className="page-result">
          <div className="ctn-res text-center">
            <img className="showImg" src={successIcon} alt="" />
            <h1 className="congrats">Success !</h1>
            <label className="text-muted">Successfully released Pokémon.</label>
            <br />
            <button
              type="button"
              onClick={() => {
                window.location.reload();
              }}
              className="btn btn-outline-dark rounded-pill mt-4"
            >
              Back
            </button>
          </div>
        </div>
      ) : type === "erelease" ? (
        <div className="page-result">
          <div className="ctn-res text-center">
            <img className="showImg" src={errorIcon} alt="" />
            <h1 className="congrats">Oops !</h1>
            <label className="text-muted">Failed to release Pokémon !</label>
            <br />
            <button
              type="button"
              onClick={() => {
                window.location.reload();
              }}
              className="btn btn-outline-dark rounded-pill mt-4"
            >
              Retry
            </button>
          </div>
        </div>
      ) : (
        <div className="page-result">
          <div className="ctn-res text-center">
            <img className="showImg" src={emptyPoke} alt="" />
            <h1 className="congrats">Oops!</h1>
            <label className="text-muted">
              Sorry, you did not obtain a {pokemon}!
            </label>
            <br />
            <button
              type="button"
              onClick={() => {
                window.location.reload();
              }}
              className="btn btn-outline-dark rounded-pill mt-4"
            >
              Back
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ResultPage;

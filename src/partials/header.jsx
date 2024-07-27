import React from "react";
import pokeIcon from "../assets/img/icon/icons8-pokemon-48.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="header w-100">
              <div className="row">
                <div className="col-6">
                  <ul>
                    <li>
                      <a className="logo-name" href="">
                        <img src={pokeIcon} alt="" /> <span>PokeDex</span>
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="col-6">
                  <ul className="float-end menu-list">
                    <li>
                      <Link to="/">Pokemon List</Link>
                    </li>
                    <li>
                      <Link to="/my-pokemon">My Pokemon</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;

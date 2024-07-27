import {
  faArrowLeft,
  faBackward,
  faLeftLong,
  faPencilAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import LoaderCatch from "../partials/loader-catch";
import ResultPage from "../partials/result-page";

const DetailPage = () => {
  const { pokemon } = useParams();
  const [isError, setIsError] = useState(true);
  const [isLoadCatch, setIsLoadCatch] = useState(false);
  const [data, setData] = useState([]);
  const [typeLoader, setTypeLoader] = useState("loaderIn");
  const [typeRes, setTypeRes] = useState(null);
  const [isLoadRes, setIsLoadRes] = useState(false);
  const [renameModal, setRenameModal] = useState(false);
  const [newNickname, setNewNickname] = useState(null);

  useEffect(() => {
    getPokemonDetail();
  }, []);

  async function getPokemonDetail() {
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/get-pokemon-detail",
        {
          pokemon: pokemon,
        }
      );
      setIsError(false);
      setData(response.data.data);
    } catch (error) {
      setIsError(true);
    }
  }

  function handleBack() {
    window.history.back();
  }

  async function handleCatch() {
    setIsLoadCatch(true);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/catch-pokemon",
        {
          pokemon: pokemon,
        }
      );

      setTimeout(() => {
        setTypeLoader("loaderOut");
        setIsLoadRes(true);
        setTypeRes("congrats");
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        setTypeLoader("loaderOut");
        setIsLoadRes(true);
        setTypeRes("oops");
      }, 2000);
    }
  }

  async function handleRelease() {
    setIsLoadCatch(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/release", {
        pokemon: pokemon,
      });
      setTimeout(() => {
        setTypeLoader("loaderOut");
        setIsLoadRes(true);
        setTypeRes("srelease");
      }, 2000);
    } catch (error) {
      setTimeout(() => {
        setTypeLoader("loaderOut");
        setIsLoadRes(true);
        setTypeRes("erelease");
      }, 2000);
    }
  }

  function handleModalOpen() {
    setRenameModal(true);
  }
  function handleModalClose() {
    setRenameModal(false);
  }

  function handleChange(e) {
    setNewNickname(e.target.value);
  }

  async function handleRename() {
    try {
        const response = await axios.post("http://127.0.0.1:8000/api/rename", {
          nickname: newNickname,
          pokemon: pokemon,
        });
        setRenameModal(false);
        getPokemonDetail();
      } catch (error) {
        setRenameModal(false);
        getPokemonDetail();
      }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  return (
    <>
      {renameModal ? (
        <div className="nickname-page">
          <div className="card-rename">
            <div className="row">
              <div className="col-6">
                <h5>Rename</h5>
              </div>
              <div className="col-6 text-end">
                <button
                  type="button"
                  onClick={handleModalClose}
                  className="btn btn-outline-danger"
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              </div>
              <div className="col-12">
                <hr />
                <input
                  type="text"
                  className="form-control"
                  placeholder="Input nickname"
                  onChange={handleChange}
                  defaultValue={data.nickname}
                />
                <hr />
                <button type="button" onClick={handleRename} className="btn btn-primary w-50">Save</button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
      {isLoadCatch ? <LoaderCatch type={typeLoader} /> : ""}
      {isLoadRes ? (
        <ResultPage
          type={typeRes}
          urlImg={data.sprites?.other.home.front_default}
          pokemon={data?.name}
        />
      ) : (
        ""
      )}
      {!isError ? (
        <div className="container mb-5">
          <div className="row">
            <div className="col-sm-12 float-end text-end">
              <button
                type="button"
                onClick={handleBack}
                className="btn btn-sm btn-outline-dark rounded-pill mt-4"
              >
                <FontAwesomeIcon icon={faArrowLeft} /> Back
              </button>
            </div>
            <div className="col-sm-4">
              <div className="ctn-left">
                <img src={data.sprites.other.home.front_default} alt="" />
                <div className="pokemon-detail-ctn-l">
                  <h3>{capitalizeFirstLetter(data.name)}</h3>
                  {data.is_owned ? (
                    data.nickname !== null ? (
                      <>
                        <h5 className="text-muted">({data.nickname})</h5>
                        <button
                          type="button"
                          onClick={handleModalOpen}
                          className="btn btn-warning btn-sm rounded-pill"
                        >
                          {" "}
                          <FontAwesomeIcon icon={faPencilAlt} /> Rename
                        </button>
                      </>
                    ) : (
                      <>
                        <h5 className="text-muted">(nickname not set)</h5>
                        <button
                          type="button"
                          onClick={handleModalOpen}
                          className="btn btn-warning btn-sm rounded-pill"
                        >
                          {" "}
                          <FontAwesomeIcon icon={faPencilAlt} /> Rename
                        </button>
                      </>
                    )
                  ) : (
                    ""
                  )}
                  <div className="type-ctn mt-4">
                    {data.types.map((value, key) => {
                      let badgeClass = "";
                      switch (value.type.name) {
                        case "grass":
                          badgeClass = "bg-success";
                          break;
                        case "fire":
                          badgeClass = "bg-danger text-light";
                          break;
                        case "water":
                          badgeClass = "bg-primary text-light";
                          break;
                        case "electric":
                          badgeClass = "bg-warning text-light";
                          break;
                        case "psychic":
                          badgeClass = "bg-info text-light";
                          break;
                        case "ice":
                          badgeClass = "bg-light";
                          break;
                        case "dragon":
                          badgeClass = "bg-dark text-light";
                          break;
                        case "poison":
                          badgeClass = "bg-poison";
                          break;
                        case "flying":
                          badgeClass = "bg-fly";
                          break;
                        default:
                          badgeClass = "bg-secondary text-light";
                      }
                      return (
                        <div
                          key={key}
                          className={`btn m-1 rounded-pill ${badgeClass}`}
                        >
                          {capitalizeFirstLetter(value.type.name)}
                        </div>
                      );
                    })}
                    <div className="row ctn-l mt-3">
                      <div className="col-2"></div>
                      <div className="col-4 ctn-h">
                        <span className="title-h">Height</span>
                        <div className="badge-h">{data.height} m</div>
                      </div>
                      <div className="col-4 ctn-h">
                        <span className="title-h">Weight</span>
                        <div className="badge-h">{data.weight} kg</div>
                      </div>
                      <div className="col-2"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-8">
              <div className="ctn-right">
                <div className="row">
                  <div className="col-sm-8">
                    <h5 className="a-title">Base Stats</h5>

                    {data.stats.map((v, i) => {
                      let color = [
                        "bg-primary",
                        "bg-secondary",
                        "bg-dark",
                        "bg-warning",
                        "bg-poison",
                        "bg-info",
                      ];
                      return (
                        <div className="row mt-2">
                          <div className="col-3">
                            <span className="stat-title">
                              {capitalizeFirstLetter(v.stat.name)}
                            </span>
                          </div>
                          <div className="col-3">
                            <span className="stat-number">{v.base_stat}</span>
                          </div>
                          <div className="col-6">
                            <div class="hp-bar-container">
                              <div class="hp-bar">
                                <div
                                  class={`hp-fill ${color[i]}`}
                                  style={{ width: `${v.base_stat}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="col-sm-6 mt-5">
                    <h5 className="a-title">Abilities</h5>
                    <div className="row ctn-l mt-2">
                      {data.abilities.map((v, i) => {
                        let color = ["bg-poison", "bg-dark"];
                        return (
                          <div className="col-6 ctn-h">
                            <div
                              className={`badge rounded-pill ${color[i]} w-100 badge-sm`}
                            >
                              {v.ability.name}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="col-sm-12 mt-5">
                    {data.is_owned ? (
                      <button
                        type="button"
                        onClick={handleRelease}
                        className="btn btn-outline-dark rounded-pill"
                      >
                        Release
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleCatch}
                        className="btn btn-outline-danger rounded-pill"
                      >
                        Catch Pokemon
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default DetailPage;

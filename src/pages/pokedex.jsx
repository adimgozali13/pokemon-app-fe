import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import iconType from "../assets/img/icon/icons8-pokeball-50.png";
import iconAbility from "../assets/img/icon/icons8-crown-pokemon-50.png";
import iconLoading from "../assets/img/icon/loading.png";
import iconWeight from "../assets/img/icon/icons8-pokemon-50.png";
import banner1 from "../assets/img/banner/wp12045009-pokemon-banner-wallpapers.jpg";
import banner2 from "../assets/img/banner/wp12044988-pokemon-banner-wallpapers.jpg";
import banner3 from "../assets/img/banner/wp2573400-krokorok-wallpapers.jpg";
import poke1 from "../assets/img/pokemon/bulbasaur.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBackward,
  faCoffee,
  faForward,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const PokeDex = () => {
  const [data, setData] = useState([]);
  const [types, setTypes] = useState([]);
  const [abilitys, setAbilitys] = useState([]);
  const [typeSelect, setTypeSelect] = useState(null);
  const [abilitySelect, setAbilitySelect] = useState(null);
  const [urlApi, setUrlApi] = useState(
    "http://127.0.0.1:8000/api/pokemon-list"
  );
  const [urlNext, setUrlNext] = useState(null);
  const [urlPrev, setUrlPrev] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    getPokemon();
  }, [typeSelect, abilitySelect, urlApi]);

  useEffect(() => {
    getType();
  }, []);

  useEffect(() => {
    getAbility();
  }, []);

  async function getPokemon() {
    try {
      const queryParams = {
        type: typeSelect?.value,
        ability: abilitySelect?.value,
      };

      const response = await axios.get(urlApi, {
        params: queryParams,
      });
      console.log("kek gini : ",response.data)
      setLoading(false);
      setData(response.data.data);
      setUrlNext(response.data.pagination.next);
      setUrlPrev(response.data.pagination.prev);
      setTotal(response.data.pagination.total);
      setOffset(response.data.pagination.offset);
    } catch (error) {
      setError(error);
    }
  }

  function handleNext() {
    setLoading(true);
    setUrlApi(urlNext);
  }

  function handlePrev() {
    setLoading(true);
    setUrlApi(urlPrev);
  }

  async function getType() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/get-type");
      const formattedTypes = response.data.map((type) => ({
        value: type.name,
        label: capitalizeFirstLetter(type.name),
      }));
      setTypes(formattedTypes);
    } catch (error) {
      setError(error);
    }
  }

  async function getAbility() {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/get-ability");
      const formattedAbilities = response.data.map((ability) => ({
        value: ability.name,
        label: capitalizeFirstLetter(ability.name),
      }));
      setAbilitys(formattedAbilities);
    } catch (error) {
      setError(error);
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  function handleType(selectedOption) {
    setLoading(true);
    setTypeSelect(selectedOption);
    setAbilitySelect(null);
    setUrlApi("http://127.0.0.1:8000/api/pokemon-list");
  }

  function handleAbility(selectedOption) {
    setLoading(true);
    setAbilitySelect(selectedOption);
    setTypeSelect(null);
    setUrlApi("http://127.0.0.1:8000/api/pokemon-list");
  }

  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-sm-12">
            <div className="banner mt-2">
              <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={10}
                slidesPerView={1}
                scrollbar={{ draggable: true }}
                onSlideChange={() => console.log("slide change")}
                onSwiper={(swiper) => console.log(swiper)}
              >
                <SwiperSlide>
                  <div className="banner-item">
                    <img src={banner1} alt="" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="banner-item">
                    <img src={banner2} alt="" />
                  </div>
                </SwiperSlide>
                <SwiperSlide>
                  <div className="banner-item">
                    <img src={banner3} alt="" />
                  </div>
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-4">
        <div className="row">
          <div className="col-6 col-sm-4 mt-2">
            <div className="select-card d-flex">
              <img src={iconType} className="icon-filter" alt="" />
              <Select
                options={types}
                value={typeSelect}
                placeholder="Type"
                className="w-100 select-ctn"
                onChange={handleType}
              />
            </div>
          </div>
          <div className="col-6 col-sm-4 mt-2">
            <div className="select-card d-flex">
              <img src={iconAbility} className="icon-filter" alt="" />
              <Select
                options={abilitys}
                value={abilitySelect}
                placeholder="Ability"
                className="w-100 select-ctn"
                onChange={handleAbility}
              />
            </div>
          </div>
          <div className="col-6 col-sm-2 mt-2">
            <div className="select-card d-flex">
              <button
                onClick={handlePrev}
                className={`btn btn-outline-dark w-100 btn-pagination ${
                  urlPrev == null ? "disabled" : ""
                }`}
                disabled={urlPrev == null}
              >
                <FontAwesomeIcon icon={faBackward} />
                <span className="ms-2">Previous</span>
              </button>
            </div>
          </div>
          <div className="col-6 col-sm-2 mt-2">
            <div className="select-card d-flex">
              <button
                type="button"
                onClick={handleNext}
                className={`btn btn-outline-dark w-100 btn-pagination ${
                  urlNext == null ? "disabled" : ""
                }`}
                disabled={urlNext == null}
              >
                <FontAwesomeIcon icon={faForward} />
                <span className="ms-2">Next</span>
              </button>
            </div>
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-12 text-end">
            <h5>
              {offset} of {total}
            </h5>
          </div>
        </div>
      </div>
      <div className="container pokemon-list mb-5">
        <div className="row">
          {data.length > 0 ? (
            loading === false ? (
              data.map((item, index) => (
                <div className="col-6 col-sm-3">
                  <Link to={`detail/${item.name}`} style={{ textDecoration: 'none' }}>
                    <div className="card-item-pokemon">
                      <img src={item.image} alt="" />
                      {/* <img src={iconLoading} alt="" /> */}
                      <div className="card-item-pokemon-ctn">
                        <h3>{capitalizeFirstLetter(item.name)}</h3>
                        {item.types.map((value, key) => {
                          let badgeClass = "";
                          switch (value.name) {
                            case "grass":
                              badgeClass = "bg-success";
                              break;
                            case "fire":
                              badgeClass = "bg-danger";
                              break;
                            case "water":
                              badgeClass = "bg-primary";
                              break;
                            case "electric":
                              badgeClass = "bg-warning";
                              break;
                            case "psychic":
                              badgeClass = "bg-info";
                              break;
                            case "ice":
                              badgeClass = "bg-light text-dark";
                              break;
                            case "dragon":
                              badgeClass = "bg-dark";
                              break;
                            case "poison":
                              badgeClass = "bg-poison";
                              break;
                            case "flying":
                              badgeClass = "bg-fly";
                              break;
                            default:
                              badgeClass = "bg-secondary";
                          }
                          return (
                            <div
                              key={key}
                              className={`badge m-1 ${badgeClass}`}
                            >
                              {capitalizeFirstLetter(value.name)}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Link>
                </div>
              ))
            ) : (
              <>
                {[...Array(8)].map((_, index) => (
                  <div className="col-3" key={index}>
                    <SkeletonTheme baseColor="#8b8b8b" highlightColor="#cccccc">
                      <p>
                        <Skeleton height={250} />
                      </p>
                    </SkeletonTheme>
                  </div>
                ))}
              </>
            )
          ) : (
            <>
              {[...Array(8)].map((_, index) => (
                <div className="col-3" key={index}>
                  <SkeletonTheme baseColor="#8b8b8b" highlightColor="#cccccc">
                    <p>
                      <Skeleton height={250} />
                    </p>
                  </SkeletonTheme>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PokeDex;

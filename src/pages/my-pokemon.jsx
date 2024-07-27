import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import { Link } from "react-router-dom";

const PokeDex = () => {
  const [data, setData] = useState([]);
  const [urlApi, setUrlApi] = useState("http://127.0.0.1:8000/api/my-pokemon");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    getPokemon();
  }, []);

  async function getPokemon() {
    try {
      const response = await axios.get(urlApi);
      setLoading(false);
      setData(response.data.data);
    } catch (error) {
      setError(error);
    }
  }

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <>
      <div className="container pokemon-list mb-5">
        <div className="row">
          <div className="col-sm-12">
            <h4 className="title-page">My Pokemon</h4>
          </div>
          {data.length > 0 ? (
            loading === false ? (
              data.map((item, index) => (
                <div className="col-3">
                  <Link
                    to={`/detail/${item.name}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="card-item-pokemon">
                      <img src={item.image} alt="" />
                      {/* <img src={iconLoading} alt="" /> */}
                      <div className="card-item-pokemon-ctn">
                        <h3>{capitalizeFirstLetter(item.name)}</h3>
                        {item.type.map((value, key) => {
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

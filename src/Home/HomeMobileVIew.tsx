import React, { MouseEvent } from "react";
import "./Home.css";
import { Hola } from "../interfaces";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineStarOutline, MdOutlineStar } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";

interface Info {
  hola: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
  data: Hola[];
  suchen: (e: React.FormEvent<HTMLFormElement>) => void;
  setsucht: React.Dispatch<React.SetStateAction<string>>;
  sucht: string;
  startFilter: (e: MouseEvent<HTMLButtonElement>) => void;
  zweiteKategorie?: string;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  level: string | null;
  getFavorite: (e: React.MouseEvent<HTMLButtonElement>) => void;
  favoriten: number[];
  getVerzeichnis: (e: React.MouseEvent<HTMLButtonElement>) => void;
  thematisch: string[];
  liturgisch: string[];
  ersteKategorie: string | undefined;
  verzeichnise: string[];
  setMullModal: React.Dispatch<
    React.SetStateAction<{
      mullModalKonditional: boolean;
      id: string;
    }>
  >;
}

const HomeMobileView: React.FC<Info> = ({
  data,
  hola,
  suchen,
  setsucht,
  sucht,
  startFilter,
  zweiteKategorie,
  setOpenModal,
  level,
  getFavorite,
  favoriten,
  thematisch,
  liturgisch,
  ersteKategorie,
  verzeichnise,
  getVerzeichnis,
  setMullModal,
}) => {
  return (
    <div className=" containter">
      <div className="text-center">
        <div className="row">
          <div className="col d-flex justify-content-center align-items-center">
            <div className="input-group col-9 mb-4 rounded-pill">
            <span className="input-group-text rounded-start-pill" id="basic-addon1"><IoSearchSharp size={20} color="#F16262"/></span>
              <input
              placeholder="Suche..."
                type="text"
                value={sucht}
                style={{ backgroundColor: "#F1F2F3" }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setsucht(e.target.value)
                }
                className="form-control rounded-end-pill"
              /> 
            </div>
          </div>
        </div>
        <div className="scrollable-buttons">
          <div className="d-flex justify-content-center mb-3 ms-5">
            <button
              className="btn  col-auto me-2 ms-5 rounded-pill"
              value={"Alle"}
              onClick={(e) => getVerzeichnis(e)}
              style={{
                backgroundColor:
                  ersteKategorie === "Alle" ? "#F16262" : "white",
                border: ersteKategorie === "Alle" ? "white" : "#F16262",
                color: ersteKategorie === "Alle" ? "white" : "#F16262",
              }}
            >
              {" "}
              Alle
            </button>
            {verzeichnise.map((data) => (
              <button
                onClick={getVerzeichnis}
                value={data}
                style={{
                  backgroundColor:
                    ersteKategorie === `${data}` ? "#F16262" : "white",
                  border: ersteKategorie === `${data}` ? "white" : "#F16262",
                  color: ersteKategorie === `${data}` ? "white" : "#F16262",
                }}
                className="me-2 btn rounded-pill"
              >
                {" "}
                {data}{" "}
              </button>
            ))}
            <button
              className="btn col-auto  btn rounded-pill"
              value={"Favoriten"}
              onClick={(e) => getVerzeichnis(e)}
              style={{
                backgroundColor:
                  zweiteKategorie === "Favoriten" ? "#E8C917" : "#EEDB73",
                color: "white",
              }}
            >
              Favoriten
            </button>{" "}
          </div>
        </div>
        <div className="scrollable-buttons">
          {ersteKategorie === "Etappen" ? (
            <div>
              {" "}
              <button
                className="btn  col-auto ms-2  rounded-pill"
                value={"Vorkatechumenat"}
                onClick={(e) => startFilter(e)}
                style={{
                  backgroundColor:
                    zweiteKategorie === "Vorkatechumenat"
                      ? "#D9D7D7"
                      : "#F2F2F2",
                  color: "#535353",
                }}
              >
                Vorkatechumenat
              </button>
              <button
                className="btn  col-auto ms-2  rounded-pill"
                value={"liturgisch"}
                onClick={(e) => startFilter(e)}
                style={{
                  backgroundColor:
                    zweiteKategorie === "liturgisch" ? "#F4E06F" : "#FFF6C5",
                  color: "#535353",
                }}
              >
                Liturgisch
              </button>
              <button
                className="btn col-auto ms-2  rounded-pill"
                value={"Katechumenat"}
                onClick={(e) => startFilter(e)}
                style={{
                  backgroundColor:
                    zweiteKategorie === "Katechumenat" ? "#A0D5D8" : "#D3ECED",
                  color: "#535353",
                }}
              >
                Katechumenat
              </button>
              <button
                className="btn col-auto ms-3 btn rounded-pill"
                value={"Auserwählung"}
                onClick={(e) => startFilter(e)}
                style={{
                  backgroundColor:
                    zweiteKategorie === "Auserwählung" ? "#C2EDAD" : "#E3F4DB",
                  color: "666666",
                }}
              >
                Auserwählung
              </button>
            </div>
          ) : ersteKategorie === "Liturgisch" ? (
            <div className="d-flex justify-content-start">
              {liturgisch.map((data) => (
                <button
                  value={data}
                  onClick={(e) => startFilter(e)}
                  style={{
                    backgroundColor: "#F16262",
                    color: "white",
                  }}
                  className="btn ms-3 rounded-pill"
                >
                  {data}
                </button>
              ))}
            </div>
          ) : ersteKategorie === "Thematisch" ? (
            <div className=" d-flex justify-content-start">
              {thematisch.map((data) => (
                <div>
                  <button
                    value={data}
                    onClick={(e) => startFilter(e)}
                    style={{
                      backgroundColor: "#F16262",
                      color: "white",
                    }}
                    className="btn ms-3 rounded-pill"
                  >
                    {data}
                  </button>
                </div>
              ))}
            </div>
          ) : zweiteKategorie === "" || zweiteKategorie === "Favoriten" ? (
            <div />
          ) : (
            <div />
          )}
        </div>
      </div>
      <div>
        <div className="mt-5">
          {data.map((props, index, array) => (
            <div className="" key={index}>
              <ul className="list-group col ms-2 me-2">
                <li
                  value={index}
                  style={{
                    backgroundColor:
                      props.etappe === "liturgisch"
                        ? "#f4f1db"
                        : props.etappe === "Katechumenat"
                        ? "#dbdcf4"
                        : props.etappe === "Auserwählung"
                        ? "#E3F4DB"
                        : "white",
                  }}
                  className=" list-group-item mt-2 shadow-sm rounded-4"
                >
                  <div className="d-flex justify-content-between">
                    <div>
                      <button
                        value={props.id}
                        onClick={hola}
                        style={{ all: "unset" }}
                      >
                        <div className="text">
                          {props?.name?.length && props?.name?.length > 30 ? (
                            <div>
                          
                               {props.name} 
                          
                            </div>
                          ) : (
                            <div>
                              {" "}
                              <p style={{ marginBottom: "0" }}>
                                {" "}
                                {props.name}{" "}
                              </p>{" "}
                            </div>
                          )}
                        </div>
                      </button>
                    </div>

                    <div className="d-flex justify-conter-end">
                      <button
                        value={props.id}
                        style={{ all: "unset" }}
                        onClick={getFavorite}
                      >
                        {props.id !== undefined &&
                        favoriten.includes(props.id) ? (
                          <MdOutlineStar size={23} color="#D94141" />
                        ) : (
                          <MdOutlineStarOutline size={23} color="#D94141" />
                        )}
                      </button>
                      {level === "admin" ? (
                        <button
                          className="ms-2"
                          style={{ all: "unset" }}
                          value={props?.id}
                          onClick={(e) => {
                            setMullModal({
                              mullModalKonditional: true,
                              id: e.currentTarget.value,
                            });
                          }}
                        >
                          <FaTrash color="#D94141" />
                        </button>
                      ) : (
                        <div />
                      )}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          ))}
        </div>
        <div className="mb-5" />
      </div>
      {level === "admin" ? (
        <div className="position">
          <button className="create-mobile d-flex justify-content-center">
            <FaPlus
              size={30}
              color="white"
              onClick={() => setOpenModal(true)}
            />
          </button>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default HomeMobileView;

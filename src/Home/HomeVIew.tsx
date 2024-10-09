import React, { MouseEvent } from "react";
import "./Home.css";
import { Hola } from "../interfaces";
import { FaPlus } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { MdOutlineStarOutline, MdOutlineStar } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";

interface Info {
  hola: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;

  data: Hola[];
  verzeichnise: string[];
  suchen: (e: React.FormEvent<HTMLFormElement>) => void;
  setsucht: React.Dispatch<React.SetStateAction<string>>;
  sucht: string;
  startFilter: (e: MouseEvent<HTMLButtonElement>) => void;
  ersteKategorie: string | undefined;
  zweiteKategorie?: string;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  level: string | null;
  getFavorite: (e: React.MouseEvent<HTMLButtonElement>) => void;
  favoriten: number[];
  getVerzeichnis: (e: React.MouseEvent<HTMLButtonElement>) => void;
  thematisch: string[];
  liturgisch: string[];
  setMullModal: React.Dispatch<
    React.SetStateAction<{
      mullModalKonditional: boolean;
      id: string;
    }>
  >;
}

const HomeView: React.FC<Info> = ({
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
  verzeichnise,
  getVerzeichnis,
  ersteKategorie,
  liturgisch,
  thematisch,
  setMullModal,
}) => {
  return (
    <div className=" containter">
      <div className="text-center">
        <div className="row">
          <div className=" d-flex justify-content-center align-items-center">
            <div className="input-group col-2">
              <span className="input-group-text rounded-start-pill"><IoSearchSharp size={20} color="#F16262"/></span>
              <input
                type="text"
                placeholder="Suche..."
                value={sucht}
                style={{ backgroundColor: "#F1F2F3" }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setsucht(e.target.value)
                }
                className="form-control form-control-lg mb   rounded-end-pill"
              />
            </div>
          </div>
          <div
            className="your-required-wrapper"
            style={{ width: 100, height: 30 }}
          ></div>
        </div>
        <div className="d-flex justify-content-center mb-3">
          <button
            className="btn  col-auto me-2  rounded-pill"
            value={"Alle"}
            onClick={(e) => getVerzeichnis(e)}
            style={{
              backgroundColor: ersteKategorie === "Alle" ? "#F16262" : "white",
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
        {ersteKategorie === "Etappen" ? (
          <div>
            {" "}
            <button
              className="btn  col-auto ms-2  rounded-pill"
              value={"Vorkatechumenat"}
              onClick={(e) => startFilter(e)}
              style={{
                backgroundColor:
                  zweiteKategorie === "Vorkatechumenat" ? "#D9D7D7" : "#F2F2F2",
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
          <div className="d-flex justify-content-center">
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
          <div className="d-flex justify-content-center">
            {thematisch.map((data) => (
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
        ) : zweiteKategorie === "" || zweiteKategorie === "Favoriten" ? (
          <div />
        ) : (
          <div />
        )}
      </div>
      <div>
        <div className="mt-5">
          {data.map((props, index, array) => (
            <div className="" key={index}>
              <ul className="list-group col ms-5 me-5">
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
                  className=" list-group-item mt-2 shadow-sm rounded-pill"
                >
                  <div className="d-flex justify-content-between">
                    <button
                      onClick={hola}
                      value={props.id}
                      style={{ all: "unset" }}
                    >
                      <div className="text">{props.name}</div>
                    </button>
                    <div>
                      <button
                        value={props.id}
                        style={{ all: "unset" }}
                        onClick={(e) => getFavorite(e)}
                      >
                        {props?.id !== undefined &&
                        favoriten.includes(props.id) ? (
                          <MdOutlineStar size={30} color="#D94141" />
                        ) : (
                          <MdOutlineStarOutline size={30} color="#D94141" />
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
          <button className="create" onClick={() => setOpenModal(true)}>
            <div className="d-flex align-items-center justify-content-center">
              <FaPlus />
            </div>
          </button>
        </div>
      ) : (
        <div />
      )}
    </div>
  );
};

export default HomeView;

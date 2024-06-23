import React, { MouseEvent } from "react";
import "./Home.css";
import Modal from "react-bootstrap/Modal";
import { ModalHeader } from "react-bootstrap";
import { Hola } from "../interfaces";
import { setSelectionRange } from "@testing-library/user-event/dist/utils";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { MdOutlineStarOutline, MdOutlineStar } from "react-icons/md";
import { start } from "repl";

interface Info {
  hola: (e: MouseEvent<HTMLButtonElement>) => Promise<void>;
  data: Hola[];
  suchen: (e: React.FormEvent<HTMLFormElement>) => void;
  setsucht: React.Dispatch<React.SetStateAction<string>>;
  sucht: string;
  startFilter: (e: MouseEvent<HTMLButtonElement>) => void;
  filterLied?: string;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  level: string | null;
  getFavorite: (e: React.MouseEvent<HTMLButtonElement>) => void;
  favoriten: number[];
}

const HomeMobileView: React.FC<Info> = ({
  data,
  hola,
  suchen,
  setsucht,
  sucht,
  startFilter,
  filterLied,
  setOpenModal,
  level,
  getFavorite,
  favoriten
}) => {
  return (
    <div className=" containter">
      <div className="text-center">
        <div className="row">
          <div className="col d-flex justify-content-center align-items-center">
            <div className="col-9">
              <input
                type="text"
                value={sucht}
                style={{ backgroundColor: "#F1F2F3" }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setsucht(e.target.value)
                }
                className="form-control form-control-lg mb-5 mt-3 rounded-pill"
              />
            </div>
          </div>
        </div>
        <div className="scrollable-buttons">
          <button
            className="btn col-auto ms-2  rounded-pill"
            value={""}
            onClick={(e) => startFilter(e)}
            style={{
              backgroundColor: filterLied === "" ? "#D94141" : "#E5A3A3",
              color: "white",
            }}
          >
            {" "}
            Alle
          </button>
          <button
            className="btn  col-auto ms-2  rounded-pill"
            value={"vorkathechumenal"}
            onClick={(e) => startFilter(e)}
            style={{
              backgroundColor:
                filterLied === "vorkathechumenal" ? "#D9D7D7" : "#F2F2F2",
              color: "#535353",
            }}
          >
            Vorkathechumenal
          </button>
          <button
            className="btn  col-auto ms-2  rounded-pill"
            value={"liturgisch"}
            onClick={(e) => startFilter(e)}
            style={{
              backgroundColor:
                filterLied === "liturgisch" ? "#F4E06F" : "#FFF6C5",
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
                filterLied === "Katechumenat" ? "#A0D5D8" : "#D3ECED",
              color: "#535353",
            }}
          >
            Katechumenat
          </button>
          <button
            className="btn col-auto ms-2  rounded-pill"
            value={"Wahl"}
            onClick={(e) => startFilter(e)}
            style={{
              backgroundColor: filterLied === "Wahl" ? "#C2EDAD" : "#E3F4DB",
              color: "#535353",
            }}
          >
            Wahl
          </button>
          <button
            className="btn col-auto ms-2  rounded-pill"
            value={"Favoriten"}
            onClick={(e) => startFilter(e)}
            style={{
              backgroundColor: filterLied === "Favoriten" ? "#E8C917" : "#EEDB73",
              color: "#535353",
            }}
          >
            Favoriten
          </button>
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
                          ? "#fefff2"
                          : props.etappe === "Katechumenat"
                          ? "#f8f7ff"
                          : "white",
                    }}
                    className=" list-group-item mt-2 shadow-sm rounded-pill"
                  >
                    <div className="d-flex justify-content-between">
                      <div>
                      <button value={props.id} onClick={hola} style={{all: "unset"}}>
                      <div className="text">{props.name}</div>
                      </button>
                      </div>
                   
                    <div>
                      <button value={props.id} style={{all: "unset"}} onClick={getFavorite}>
                        {
                          props.id !== undefined &&
                          favoriten.includes(props.id) ?  <MdOutlineStar size={23} color="#D94141"/> : <MdOutlineStarOutline size={23} color="#D94141"/>
                        }
                       
                      </button>
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

export default HomeMobileView;

import React, { MouseEvent } from "react";
import "./Home.css";
import { Hola } from "../interfaces";
import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";

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
}

const HomeView: React.FC<Info> = ({
  data,
  hola,
  suchen,
  setsucht,
  sucht,
  startFilter,
  filterLied,
  setOpenModal,
  level
}) => {
  return (
    <div className=" containter">
      <div className="text-center">
        <div className="row">
          <div className="col d-flex justify-content-center align-items-center">
            <div className="col-5">
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

        <button
          className="btn  col-auto ms-2  rounded-pill"
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
          className="btn col-auto ms-3 btn rounded-pill"
          value={"Wahl"}
          onClick={(e) => startFilter(e)}
          style={{backgroundColor: filterLied === "Wahl" ? "#C2EDAD" : "#E3F4DB", color: "666666"}}
        >
          Wahl
        </button>
      </div>
      <div>
        <div className="mt-5">
          {data.map((props, index, array) => (
            <div className="" key={index}>
              <ul className="list-group col ms-5 me-5">
                <button onClick={hola} value={props.id} style={{all: "unset"}}>
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
                
                    <div className="text">{props.name}</div>
                
                </li>
                </button>
              </ul>
            </div>
          ))}
        </div>
      </div>
      {
        level === "admin" ?  <div className="position">
        <button className="create" onClick={() => setOpenModal(true)}>
          <div className="d-flex align-items-center justify-content-center">
          <FaPlus />
          </div>
        </button>
      </div>  : <div/>
    
     
        }
    </div>
  );
};

export default HomeView;

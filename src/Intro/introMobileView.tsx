import React, { useState } from "react";
import Logo from "./Logo.jpeg";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import './intro.css';


interface introView {
  getSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  firstSearch: string;
  setFirstSearch: React.Dispatch<React.SetStateAction<string>>;
  level: string | undefined;
}

const IntroMobileView: React.FC<introView> = ({
  getSearch,
  firstSearch,
  setFirstSearch,
  level,
}) => {
  const navigate = useNavigate();
  const param1 = firstSearch;


  const handleCLick = async () => {
    await navigate("/home?param1=" + param1, {state: { level }} );
  //  await navigate("/home", { state: { level }});
  };

  const auswahl = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await navigate("/home?param2=" + e.currentTarget.value, {state: { level }});
  };

  return (
   
    <div className="">
    
           <img src={Logo} style={{ width: "100%" }} />
  

        <form className="">
          
          <div className="container row d-flex justify-content-center">
            <div className="col-11">
              <input
                style={{ backgroundColor: "#F1F2F3" }}
                type="text"
                className="form-control form-control-lg mb-3 mt-3 rounded-pill"
                value={firstSearch}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setFirstSearch(e.target.value)
                }
              />
            </div>
            <div className="col-1 mt-4">
              <button style={{ all: "unset" }} onClick={handleCLick}>
                {" "}
                <FaSearch size={25} color="#535353" />{" "}
              </button>
            </div>
          </div>
        </form>
    

      <div className="scrollable-buttons mt-4">
        <button
          className="btn  col-auto ms-3 btn rounded-pill"
          style={{ backgroundColor: "#BE5B5B", color: "white" }}
          value={""}
          onClick={(e) => auswahl(e)}
        >
          {" "}
          Alles
        </button>
        <button
          className="btn  col-auto ms-3 btn rounded-pill"
          value={"vorkathechumenal"}
          onClick={(e) => auswahl(e)}
          style={{ backgroundColor: "D94141", color: "666666" }}
        >
          Vorkathechumenal
        </button>
        <button
          className="btn col-auto ms-3 btn rounded-pill"
          value={"liturgisch"}
          onClick={(e) => auswahl(e)}
          style={{ backgroundColor: "#F4E06F", color: "666666" }}
        >
          Liturgisch
        </button>
        <button
          className="btn  col-auto ms-3 btn rounded-pill"
          value={"Katechumenat"}
          onClick={(e) => auswahl(e)}
          style={{ backgroundColor: "#A0D5D8", color: "666666" }}
        >
          Katechumenat
        </button>

        <button
          className="btn col-auto ms-3 btn rounded-pill"
          value={"Wahl"}
          onClick={(e) => auswahl(e)}
          style={{ backgroundColor: "#C2EDAD", color: "666666" }}
        >
          Wahl
        </button>

       
      </div>
      </div>

  );
};

export default IntroMobileView;

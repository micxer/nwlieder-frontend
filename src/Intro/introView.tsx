import React, { useState } from "react";
import Logo from "./Logo.jpeg";
import { FaSearch } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import './intro.css';

interface introView {
  getSearch: (e: React.FormEvent<HTMLFormElement>) => void;
  firstSearch: string;
  setFirstSearch: React.Dispatch<React.SetStateAction<string>>;
  level: string | undefined
}

const IntroView: React.FC<introView> = ({
  getSearch,
  firstSearch,
  setFirstSearch,
  level,
}) => {
  const navigate = useNavigate();
  const param1 = firstSearch;

console.log(level);

  const handleCLick = async () => {
    await navigate("/home?param1=" + param1, {state: { level }} );
  //  await navigate("/home", { state: { level }});
  };

  const [param2, setParam2] = useState("");

  const auswahl = async (e: React.MouseEvent<HTMLButtonElement>) => {
    await navigate("/home?param2=" + e.currentTarget.value, {state: { level }});
  };

  return (
    <div className="col container d-flex justify-content-center align-items-center ">
      <div>
      <div className="text-center">
        <img src={Logo} style={{ width: "80vh" }} />
      </div>
      <div className="text-center">
        <form>
          <div className="col row ">
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
                <FaSearch size="30px" color="#535353" />{" "}
              </button>
            </div>
          </div>
        </form>
      </div>

      <div className="row justify-content-center mt-5 mb-5">
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

        <button
          className="btn col-auto ms-3 btn rounded-pill"
          value={"liturgisch"}
          onClick={(e) => auswahl(e)}
          style={{ backgroundColor: "#F4E06F", color: "666666" }}
        >
          Liturgisch
        </button>
      </div>
    </div>
    </div>
  );
};

export default IntroView;

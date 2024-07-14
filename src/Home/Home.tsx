import React, { useEffect, useState, MouseEvent } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import HomeView from "./HomeVIew";
import Erschaffen from "../erschaffen/erschaffen";
import HomeMobileView from "./HomeMobileVIew copy";
import "./Home.css";
import { Hola } from "../interfaces";
import { useLocalStorage } from "react-use";
import MediaQuery from "react-responsive";

const Home: React.FC<Hola> = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const param1 = searchParams.get("param1");
  const param2 = searchParams.get("param2");
  const level2 = location.state?.level;

  const [data, setData] = useState<Hola[]>([]);
  const [specificLied, setSpecificLied] = useState("");
  const [wechselLied, setWechselLied] = useState(false);
  const [aktuelLied, setAktuelLied] = useState<number>(0);
  const [openModal, setOpenModal] = useState(false);
  const [gespeicherteFavoriten, setGespeicherteFavoriten] = useLocalStorage<
    number[]
  >("favoriten");
  const [favoriten, setFavoriten] = useState<number[]>(
    gespeicherteFavoriten === undefined ? [] : gespeicherteFavoriten
  );

  const [hello, setHello] = useState();
  const [gespeicherteSucht, setGespeicherteSucht] = useLocalStorage(
    "sucht",
    ""
  );

  const [sucht, setSucht] = useState(
    param1 === null ? `${gespeicherteSucht}` : `${param1}`
  );
  const [gespeicherteLevel, setGespeicherteLevel] = useLocalStorage(
    "level",
    ""
  );

  const level = level2 === undefined ? `${gespeicherteLevel}` : level2;

  const [gespeicherteFilterLied, setGespeicherteFilterLied] = useLocalStorage(
    "filterLied",
    ""
  );
  const [filterLied, setFilterLied] = useState(
    param2 === null ? gespeicherteFilterLied : param2
  );

  const fetchData = async () => {
    try {
      console.log(process.env);
      const url = `${process.env.REACT_APP_API_URL}/lied/`;
      const response = await fetch(url);
      const data = await response.json();

      return setData(data);
    } catch (error) {
      console.error(error);
    }
  };


  const suchen = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const deleteNumber = (id: number) => {
    setFavoriten((prevNumbers) => prevNumbers.filter((num) => num !== id));
  };

  const getFavorite = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFavoriten((prevFavoriten) => [...prevFavoriten, anders]);

    const anders = parseInt(e.currentTarget.value);

    for (var i = 0; i < favoriten.length; i++)
      if (anders === favoriten[i]) {
        deleteNumber(anders);
      }
  };

  const gefilterteElemente = data?.filter((data) =>
    data?.liedtext?.toLowerCase().includes(sucht?.toLowerCase())
  );

  const startFilter = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setFilterLied(e?.currentTarget?.value);
    if (filterLied === "" && sucht !== "") {
      setSucht("");
    }
  };

  const filter =
    filterLied === ""
      ? gefilterteElemente
      : filterLied === "Favoriten"
      ? gefilterteElemente.filter((data) =>
          favoriten.includes(data?.id === undefined ? 0 : data.id)
        )
      : gefilterteElemente.filter((data) => data?.etappe === filterLied);

  const infoToLied = {
    level: level,
    ids: filter,
  };

  const bringSpecificLied = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      await navigate(`/lied/${e.currentTarget.value}`, {
        state: { infoToLied },
      });
      await setSpecificLied(e.currentTarget.value.toString());
      await searchParams.delete("param1");
      await setSearchParams(searchParams);
    } catch (error) {
      console.log(`problem bringSpecificLied ${error}`);
    }

    //  setTimeout(() => {
    //   setWechselLied(false);
    //  }, 2000)
  };

  useEffect(() => {
    setGespeicherteSucht(sucht);
    if (location.search) {
      // Eliminar los parámetros de la URL
      const searchParams = new URLSearchParams(location.search);
      searchParams.delete("param1");
      const newUrl =
        window.location.origin +
        window.location.pathname +
        "?" +
        searchParams.toString();
      window.history.replaceState({}, "", newUrl);
    }
    fetchData();
  }, [sucht]);

  useEffect(() => {
    setGespeicherteLevel(level);
  }, [level]);

  useEffect(() => {
    setGespeicherteFilterLied(filterLied);

    if (location.search) {
      // Eliminar los parámetros de la URL
      const searchParams = new URLSearchParams(location.search);
      searchParams.delete("param2");
      const newUrl =
        window.location.origin +
        window.location.pathname +
        "?" +
        searchParams.toString();
      window.history.replaceState({}, "", newUrl);
    }
    fetchData();
  }, [filterLied]);

  useEffect(() => {
    setGespeicherteFavoriten(favoriten);
  }, [favoriten]);

  return (
    <div className="container">
      {
        level === "" ? <div/> :
     
      <div className="col">
        {" "}
        <MediaQuery minWidth={1224}>
          <HomeView
            data={filter}
            hola={bringSpecificLied}
            suchen={suchen}
            filterLied={filterLied}
            setsucht={setSucht}
            sucht={sucht}
            startFilter={startFilter}
            setOpenModal={setOpenModal}
            level={level}
            getFavorite={getFavorite}
            favoriten={favoriten}
          />{" "}
        </MediaQuery>
        <MediaQuery maxWidth={1224}>
          <HomeMobileView
            data={filter}
            hola={bringSpecificLied}
            suchen={suchen}
            filterLied={filterLied}
            setsucht={setSucht}
            sucht={sucht}
            startFilter={startFilter}
            setOpenModal={setOpenModal}
            level={level}
            getFavorite={getFavorite}
            favoriten={favoriten}
          />
        </MediaQuery>
        <Erschaffen openModal={openModal} setOpenModal={setOpenModal} />
      </div>

    }
    </div>
  );
};

export default Home;

import React, { useEffect, useState, MouseEvent } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import HomeView from "./HomeVIew";
import Erschaffen from "../erschaffen/erschaffen";
import HomeMobileView from "./HomeMobileVIew";
import "./Home.css";
import { Hola } from "../interfaces";
import { useLocalStorage, useScratch } from "react-use";
import MediaQuery from "react-responsive";
import Spinner from "../spinner/reload";

const Home: React.FC<Hola> = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const navigate = useNavigate();
  const param1 = searchParams.get("param1");
  const param2 = searchParams.get("param2");
  const level2 = location.state?.level;

  const [data, setData] = useState<Hola[]>([]);
  const [specificLied, setSpecificLied] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [reload, setReload] = useState(false);
  const [gespeicherteFavoriten, setGespeicherteFavoriten] = useLocalStorage<
    number[]
  >("favoriten");
  const [favoriten, setFavoriten] = useState<number[]>(
    gespeicherteFavoriten === undefined ? [] : gespeicherteFavoriten
  );
  const [verzeichnise, setVerzeichnise] = useState<string[]>([
    "Etappen",
    "Thematisch",
    "Liturgisch",
  ]);
  const liturgisch: string[] = [
    "Advent-Weinachten",
    "Fastenzeit",
    "Ostern-Pfingsten",
    "Jahrenkreis",
  ];

  const thematisch: string[] = [
    "Marienlieder",
    "Lieder für die Kinder",
    "Einzugslieder",
    "Frieden-Gabenbereitung",
    "Brotbrechen",
    "Kelchkommunion",
    "Auszugslieder",
  ];

  const [gespeicherteLevel, setGespeicherteLevel] = useLocalStorage(
    "level",
    ""
  );

  const [gespeicherteFilterLied, setGespeicherteFilterLied] = useLocalStorage(
    "zweiteKategorie",
    ""
  );

  const [ersteKategorie, setErsteKategorie] = useState<string>(
    param2 === "" ? "Alle" : param2 === null ? "Alle" : "Etappen"
  );
  const [zweiteKategorie, setZweiteKategorie] = useState(
    param2 === null ? gespeicherteFilterLied : param2
  );

  const [gespeicherteSucht, setGespeicherteSucht] = useLocalStorage(
    "sucht",
    ""
  );

  const [sucht, setSucht] = useState(
    param1 === null ? `${gespeicherteSucht}` : `${param1}`
  );

  const level = level2 === undefined ? `${gespeicherteLevel}` : level2;

  const fetchData = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/lied/`;
      const response = await fetch(url);
      const data = await response.json();

      return setData(data);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteLiedFunction = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const fetchOptions = {
      method: "DELETE",
    };
    const fetchOptionsKommentare = {
      method: "DELETE",
    };
    const urlDeleteKommentareByLied = `${process.env.REACT_APP_API_URL}/kommentarebylied/${e.currentTarget.value}`
    const urlDelete = `${process.env.REACT_APP_API_URL}/lied/${e.currentTarget.value}`;
    setReload(true);

    try {
      await fetch(urlDeleteKommentareByLied, fetchOptionsKommentare).then((response) => response.json()).then((data) => {
        return (console.log("die kommentaren sing geloescht worden"))
      })
    } 
    catch(error) {
      console.log({Message: "die Kommentare koeonnen nicht geloescht werden"})
    }
    try {
      await fetch(urlDelete, fetchOptions)
        .then((response) => response.json())
        .then((data) => {
          return alert("dieses Lied wurde erfolgreich entfernt");
        });
    } catch (error) {
      console.log({ message: "delete Lied error", error });
    }
    setReload(false);
  };

  const getVerzeichnis = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErsteKategorie(e.currentTarget.value);
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
    setZweiteKategorie(e?.currentTarget?.value);
    if (zweiteKategorie === "" && sucht !== "") {
      setSucht("");
    }
  };

  const filter =
    ersteKategorie === "Alle"
      ? gefilterteElemente
      : ersteKategorie === "Favoriten"
      ? gefilterteElemente.filter((data) =>
          favoriten.includes(data?.id === undefined ? 0 : data.id)
        )
      : gefilterteElemente.filter(
          (data) =>
            data?.etappe === zweiteKategorie ||
            data?.thematisch === zweiteKategorie ||
            data?.liturgisch === zweiteKategorie
        );

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
    setGespeicherteFilterLied(zweiteKategorie);

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
  }, [zweiteKategorie]);

  useEffect(() => {
    setGespeicherteFavoriten(favoriten);
  }, [favoriten]);

  useEffect(()  => {

    setReload(true)
    try {
    fetchData();
    }
    catch(error) {
      console.log("fetch data updatet nicht")
    }

    setReload(false)
  }, [data !== data])

  return (
    <div className="container">
      {level === "" ? (
        <div />
      ) : (
        <div >
          {" "}
          {
            reload === true ? <Spinner/> :
         
          <div className="col">
          <MediaQuery minWidth={1224}>
            <HomeView
              data={filter}
              hola={bringSpecificLied}
              suchen={suchen}
              zweiteKategorie={zweiteKategorie}
              setsucht={setSucht}
              sucht={sucht}
              startFilter={startFilter}
              setOpenModal={setOpenModal}
              level={level}
              getFavorite={getFavorite}
              favoriten={favoriten}
              verzeichnise={verzeichnise}
              getVerzeichnis={getVerzeichnis}
              ersteKategorie={ersteKategorie}
              liturgisch={liturgisch}
              thematisch={thematisch}
              deleteLiedFunction={deleteLiedFunction}
            />{" "}
          </MediaQuery>
          <MediaQuery maxWidth={1224}>
            <HomeMobileView
              data={filter}
              hola={bringSpecificLied}
              suchen={suchen}
              zweiteKategorie={zweiteKategorie}
              setsucht={setSucht}
              sucht={sucht}
              startFilter={startFilter}
              setOpenModal={setOpenModal}
              level={level}
              getFavorite={getFavorite}
              favoriten={favoriten}
              verzeichnise={verzeichnise}
              getVerzeichnis={getVerzeichnis}
              ersteKategorie={ersteKategorie}
              liturgisch={liturgisch}
              thematisch={thematisch}
              deleteLiedFunction={deleteLiedFunction}
            />
          </MediaQuery>
          </div> }
          <Erschaffen openModal={openModal} setOpenModal={setOpenModal} />
        </div>

   
          
      )}
    </div>
  );
};

export default Home;

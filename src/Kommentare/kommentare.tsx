import React, { useState, useEffect } from "react";
import ReactView from "./kommentareView";
import { Hola, KommentareInfo } from "../interfaces";

interface KommentareInterface {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: Hola[];
  aktuelLied: number;
  level: string;
  specificAudio: string;
}

const Kommentare: React.FC<KommentareInterface> = ({
  openModal,
  setOpenModal,
  data,
  aktuelLied,
  level,
  specificAudio,
}) => {


  const [kommentare, setKommentare] = useState({
    id_lied: data[aktuelLied]?.id,
    name: "",
    description: "",
    audio_id: specificAudio,
  });
  const [kommentareData, setKommentareData] = useState<KommentareInfo[]>([]);


  const sendKommentar = (e: React.ChangeEvent< HTMLTextAreaElement | HTMLInputElement >) => {
    const { name, value } = e.target;
    e.preventDefault();
 
    setKommentare((prevKommentare) => ({
      ...prevKommentare,
      [name]: value,
      id_lied: data[aktuelLied]?.id,
      audio_id: specificAudio,
    })); 
  };



  const url = `http://localhost:5000/kommentare`;
  const fetchOptions = {
    method: "POST", // Método HTTP
    headers: {
      "Content-Type": "application/json", // Especifica el tipo de contenido esperado
    },
    body: JSON.stringify(kommentare), // Convierte los datos a una cadena JSON
  };

  console.log(data[aktuelLied]?.id)

  const urlGet = `http://localhost:5000/kommentare/${data[aktuelLied]?.id}`;

  const updateDataFuntion = async () => {
    await fetch(url, fetchOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("doesnt work");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        console.log(data.rows);
      })
      .catch((error) => {
        console.error("ha habido un gran problema");
      });
  };

  const getKommentare = async () => {
    try {
    await fetch(urlGet)
      .then((response) => response.json())
      .then((information) => {
      if(level ===  "normal" ) {
          return setKommentareData(information);

      }

      });
  } catch (error) {
    console.log(error)
  } };


 
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    await event.preventDefault();
    await updateDataFuntion();
    await getKommentare();
  };

  useEffect(() => {
    getKommentare();
  }, [data[aktuelLied]?.id !== undefined]);

  return (
    <ReactView
      openModal={openModal}
      setOpenModal={setOpenModal}
      sendKommentar={sendKommentar}
      handleSubmit={handleSubmit}
      kommentare={kommentare}
      level={level}
      kommentareData={kommentareData}
      specificAudio={specificAudio}
      setKommentare={setKommentare}
    />
  );
};

export default Kommentare;

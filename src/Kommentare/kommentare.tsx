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
  setReload?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Kommentare: React.FC<KommentareInterface> = ({
  openModal,
  setOpenModal,
  data,
  aktuelLied,
  level,
  specificAudio,
  setReload,
}) => {
  const [kommentare, setKommentare] = useState({
    id_lied: aktuelLied || undefined,
    name: "",
    description: "",
    audio_id: specificAudio,
  });
  const [kommentareData, setKommentareData] = useState<KommentareInfo[]>([]);

  const sendKommentar = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    e.preventDefault();

    setKommentare((prevKommentare) => ({
      ...prevKommentare,
      [name]: value,
      id_lied: aktuelLied,
      audio_id: specificAudio,
    }));
  };

  const url = `${process.env.REACT_APP_API_URL}/kommentare`;
  const fetchOptions = {
    method: "POST", // Método HTTP
    headers: {
      "Content-Type": "application/json", // Especifica el tipo de contenido esperado
    },
    body: JSON.stringify(kommentare), // Convierte los datos a una cadena JSON
  };

  const urlGet = `${process.env.REACT_APP_API_URL}/kommentare/${aktuelLied}`;

  const updateDataFuntion = async () => {

    if (setReload) {
    setReload(true)
    }
    try {
    await fetch(url, fetchOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("doesnt work");
        } else {
          return response.json();
        }
      })
      .then((data) => {})
    } catch(error) {
      console.log({message: "error al crear un comentario"})
    }
    if(setReload) {

    setReload(false)
    }

   
  };

  const getKommentare = async () => {
    if(setReload) {

    
      }
    try {
      await fetch(urlGet)
        .then((response) => response.json())
        .then((information) => {
          if (level === "normal") {
            return setKommentareData(information);
          }
        });
    } catch (error) {
      console.log(error);
    }

    if(setReload) {

      
      }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    await event.preventDefault();
    await updateDataFuntion();
    await getKommentare();
  };

  useEffect(() => {
    getKommentare();
  }, [aktuelLied]);

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

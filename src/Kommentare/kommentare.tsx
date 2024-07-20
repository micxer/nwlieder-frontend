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
  kommentarrolle: string;
  kommentarId?: string;
}

const Kommentare: React.FC<KommentareInterface> = ({
  openModal,
  setOpenModal,
  data,
  aktuelLied,
  level,
  specificAudio,
  setReload,
  kommentarrolle,
  kommentarId,
}) => {
  const [kommentareData, setKommentareData] = useState<KommentareInfo[]>([]);
  const [kommentareById, setKommentareById] = useState<KommentareInfo[]>([]);

  const firstProtection =
    kommentareById[0] === undefined ? "" : kommentareById[0].name;
  const nameById = firstProtection !== undefined ? firstProtection : "";
  const firstProtectionDescription =
    kommentareById[0] === undefined ? "" : kommentareById[0].description;
  const descriptionById =
    firstProtectionDescription !== undefined ? firstProtectionDescription : "";
  const [kommentare, setKommentare] = useState({
    id_lied: aktuelLied || undefined,
    name: nameById,
    description: descriptionById,
    audio_id: specificAudio,
  });

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

  const urlKommentareById = `${process.env.REACT_APP_API_URL}/kommentarebyid/${
    kommentarId ? kommentarId : ""
  }`;

  const getKommentarById = async () => {
    try {
      await fetch(urlKommentareById)
        .then((response) => response.json())
        .then((data) =>
          setKommentare((information) => ({
            ...information,
            name: data[0] === undefined ? "" : data[0].name ,
            description: data[0] === undefined ? "" : data[0].description,
          }))
        );
    } catch (error) {
      return console.log({
        message: "der einzige Kommentar ist nicht erreicht worden",
        error,
      });
    }
  };

  const fetchOptions = {
    method: "POST", // Método HTTP
    headers: {
      "Content-Type": "application/json", // Especifica el tipo de contenido esperado
    },
    body: JSON.stringify(kommentare), // Convierte los datos a una cadena JSON
  };
  const fetchOptionsUpdate = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(kommentare),
  };

  const urlGet = `${process.env.REACT_APP_API_URL}/kommentare/${aktuelLied}`;
  const url = `${process.env.REACT_APP_API_URL}/kommentare`;
  const UrlUpdate = `${process.env.REACT_APP_API_URL}/kommentare/${
    kommentarId ? kommentarId : ""
  }`;

  const updateDataFuntion = async () => {
    if (setReload) {
      setReload(true);
    }
    if (kommentarrolle === "erschaffen") {
      try {
        await fetch(url, fetchOptions).then((response) => {
          if (!response.ok) {
            throw new Error("doesnt work");
          } else {
            return response.json();
          }
        });
      } catch (error) {
        console.log({ message: "error al crear un comentario" });
      }
    } else if (kommentarrolle === "bearbeiten") {
      try {
        await fetch(UrlUpdate, fetchOptionsUpdate)
          .then((response) => {
            if (!response.ok) {
              throw new Error("doesnt work");
            } else {
              return response.json();
            }
          })
          .then((data) => {});
      } catch (error) {
        console.log({ message: "error al crear un comentario" });
      }
    }

    if (setReload) {
      setReload(false);
    }
  };

  const getKommentare = async () => {
    if (setReload) {
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

    if (setReload) {
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

  useEffect(() => {
    if (kommentarrolle === "bearbeiten") {
      getKommentarById();
    }
  }, [kommentarId]);

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
      kommentarrolle={kommentarrolle}
      kommentareById={kommentareById}
    />
  );
};

export default Kommentare;

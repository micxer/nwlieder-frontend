import React, { useEffect, useState } from "react";
import EditierenView from "./editierenView";
import { Hola, KommentareInfo } from "../interfaces";
import Kommentare from "../Kommentare/kommentare";

interface editieren {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: Hola[];
  aktuelLied: number;
  id?: string;
  setAktuelLied: React.Dispatch<React.SetStateAction<number>>;
}

const Editieren: React.FC<editieren> = ({
  openModal,
  setOpenModal,
  data,
  aktuelLied,
  id,
  setAktuelLied,
}) => {
  const [updateData, setUpdateData] = useState({
    name: "",
    description: "",
    img: "",
    audios: [""],
    etappe: "",
    liedtext: "",
  });

  const [specificAudio, setEspecificAudio] = useState("");
  const [openModalKommentare, setOpenModalKommentare] = useState(false);
  const [ModalAlert, setModalAlert] = useState(false);
  const [sended, setSended] = useState("");
  const [disable, setDisable] = useState(true);
  const [kommentare, setKommentare] = useState<KommentareInfo>();

  const getSpecificAudio = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenModalKommentare(true);
    setEspecificAudio(e.currentTarget.value);
  };

  const urlKommentare = `http://localhost:5000/kommentare/${id}`;

  const getKommentar = async () => {
    await fetch(urlKommentare)
      .then((response) => response.json())
      .then((data) => {
        setKommentare(data);
      });
  };

  const getLied = async () => {
    try {
      const url = `http://localhost:5000/lied/${id}`;
      const response = await fetch(url);
      const dataResponse = await response.json();

      setUpdateData((updateData) => ({
        ...updateData,
        name: dataResponse[0].name,
        description: dataResponse[0].description,
        img: dataResponse[0].img,
        audios: dataResponse[0].audios,
        etappe: dataResponse[0].etappe,
        liedtext: dataResponse[0].liedtext,
      }));
      return dataResponse;
    } catch (error) {
      console.log(error);
    }
  };

  const disableFunction = async () => {
    if (
      updateData.name === "" ||
      updateData.img === "" ||
      updateData.liedtext === null ||
      updateData.etappe === "" ||
      updateData.liedtext === ""
    ) {
      await setDisable(true);
    } else {
      await setDisable(false);
    }
  };

 

  const deleteKommentar = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const urlKommentareDelete = `http://localhost:5000/kommentare/${e}`;
    const fetchOptionsKommentare = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch(urlKommentareDelete, fetchOptionsKommentare)
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const url = `http://localhost:5000/lied/${id}`;
  const fetchOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updateData),
  };

  const updateLied = async () => {
    await fetch(url, fetchOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("doenst work");
        } else {
          return response.json();
        }
      })
      .then(async (data) => {
        setSended(data);
      })
      .catch(() => {
        console.error("update dont had worked");
      });
  };

  const sendInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateLied();
    await setOpenModal(false);
  };

  const level = "admin";

  useEffect(() => {
    disableFunction();
  }, [updateData]);

  useEffect(() => {
    if (sended === "erfolgreich") {
      setModalAlert(true);
    } else {
      setModalAlert(false);
    }
    setTimeout(() => {
      setSended("");
    }, 10000);
  }, [sended]);

  useEffect(() => {
    getLied();
    getKommentar();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <Kommentare
        openModal={openModalKommentare}
        setOpenModal={setOpenModalKommentare}
        data={data}
        aktuelLied={aktuelLied}
        level={level}
        specificAudio={specificAudio}
      />
      <EditierenView
        openModal={openModal}
        setOpenModal={setOpenModal}
        data={data}
        aktuelLied={aktuelLied}
        id={id}
        setOpenModalKommentare={setOpenModalKommentare}
        updateData={updateData}
        setUpdateData={setUpdateData}
        sendInfo={sendInfo}
        getSpecificAudio={getSpecificAudio}
        modalAlert={ModalAlert}
        disable={disable}
        kommentare={kommentare}
        deleteKommentar={deleteKommentar}
      />
    </div>
  );
};

export default Editieren;

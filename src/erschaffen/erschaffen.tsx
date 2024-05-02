import React, { useEffect, useState } from "react";
import ErschaffenVIew from "./erschaffenVIew";
import { Hola } from "../interfaces";
import Kommentare from "../Kommentare/kommentare";
import { create } from "domain";

interface erschaffen {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Erschaffen: React.FC<erschaffen> = ({ openModal, setOpenModal }) => {
  const [createData, setCreateData] = useState({
    name: "",
    description: "",
    img: "",
    audios: [""],
    etappe: "",
    liedtext: "",
  });

  const [specificAudio, setEspecificAudio] = useState("");
  const [openModalKommentare, setOpenModalKommentare] = useState(false);
  const [disable, setDisable] = useState(false);

  const getSpecificAudio = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenModalKommentare(true);
    setEspecificAudio(e.currentTarget.value);
  };

  const url = `http://localhost:5000/lied/`;
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(createData),
  };

  const disableFunction = async () => {
    if (
      createData.name === "" ||
      createData.liedtext === "" ||
      createData.etappe === "" ||
      createData.liedtext === ""
    ) {
      await setDisable(true);
    } else {
      await setDisable(false);
    }
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
      .then((data) => {
        console.log(data.rows);
      })
      .catch(() => {
        console.error("update dont had worked");
      });
  };

  const sendInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateLied();
    setOpenModal(false);
  };

  const level = "admin";

  useEffect(() => {
    disableFunction();
  }, [createData]);
  return (
    <div>
      {/* <Kommentare
        openModal={openModalKommentare}
        setOpenModal={setOpenModalKommentare}
        data={data}
        aktuelLied={aktuelLied}
        level={level}
        specificAudio={specificAudio}
        
      /> */}
      <ErschaffenVIew
        openModal={openModal}
        setOpenModal={setOpenModal}
        setOpenModalKommentare={setOpenModalKommentare}
        createData={createData}
        setCreateData={setCreateData}
        sendInfo={sendInfo}
        getSpecificAudio={getSpecificAudio}
        disable={disable}
      />
    </div>
  );
};

export default Erschaffen;

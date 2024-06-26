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
    audios: [""],
    etappe: "",
    liedtext: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<FileList | null>(null);

  const [specificAudio, setEspecificAudio] = useState("");
  const [openModalKommentare, setOpenModalKommentare] = useState(false);
  const [disable, setDisable] = useState(false);
  const [sended, setSended] = useState("");
  const [modalAlert, setModalAlert] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (e.target.name === "image") {
        setImage(e.target.files[0]);
      } else if (e.target.name === "audio") {
        setAudio(e.target.files);
      }
    }
  };

  const getSpecificAudio = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenModalKommentare(true);
    setEspecificAudio(e.currentTarget.value);
  };

  const url = `http://localhost:5000/lied/`;

  const disableFunction = async () => {
    if (
      createData.name === "" ||
      createData.liedtext === "" ||
      createData.etappe === "" ||
      createData.liedtext === "" ||
      audio === null ||
      image === null
    ) {
      await setDisable(true);
    } else {
      await setDisable(false);
    }
  };

  const updateLied = async () => {
    if (!image) {
      alert("Please upload an image");
      return;
    }

    if (!audio) {
      alert("Please upload an audio");
      return;
    }

    const newLied = new FormData();
    newLied.append("image", image);
    for (let i = 0; i < audio.length; i++) {
      newLied.append("audios", audio[i]);
    }

    newLied.append('audios', createData.audios.join(","))
    Object.entries(createData).forEach(([key, value]) => {
      newLied.append(key, value.toString());
    });

    const fetchOptions = {
      method: "POST",
      body: newLied,
    };

    await fetch(url, fetchOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("doenst work");
        } else {
          return response.json();
        }
      })
      .then((data) => {
        setSended(data);
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
    if (sended === "User erfolgreich erschafft") {
      setModalAlert(true);
    }

    setTimeout(() => {
      setSended("");
    }, 10000);
  }, [sended]);

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
        handleImageChange={handleImageChange}
        getSpecificAudio={getSpecificAudio}
        disable={disable}
        modalAlert={modalAlert}
      />
    </div>
  );
};

export default Erschaffen;

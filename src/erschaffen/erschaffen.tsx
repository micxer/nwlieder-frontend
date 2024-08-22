import React, { useEffect, useState } from "react";
import ErschaffenVIew from "./erschaffenVIew";


interface erschaffen {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Erschaffen: React.FC<erschaffen> = ({ openModal, setOpenModal }) => {
  const [createData, setCreateData] = useState({
    name: "",
    description: "",
    etappe: "",
    liedtext: "",
    liturgisch: "",
    thematisch: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);

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
        setAudio(e.target.files[0]);
      }
    }
  };

  const getSpecificAudio = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenModalKommentare(true);
    setEspecificAudio(e.currentTarget.value);
  };

  const url = `${process.env.REACT_APP_API_URL}/lied/`;

  
  const disableFunction = async () => {
    if (
      createData.name === "" ||
      createData.liedtext === "" ||
      createData.etappe === "" ||
      createData.liedtext === "" ||
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

  

    const newLied = new FormData();
    newLied.append("image", image);
    if(!audio) {
      newLied.append("audio", "");
    } else {
    
      newLied.append("audio", audio);
    

    }

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
        liturgischverzeichnis={liturgisch}
        thematischverzeichnis={thematisch}
      />
    </div>
  );
};

export default Erschaffen;

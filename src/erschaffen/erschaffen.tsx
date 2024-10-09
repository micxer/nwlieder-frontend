import React, { useEffect, useState } from "react";
import ErschaffenVIew from "./erschaffenVIew";
import { MultiValue } from "react-select";

interface erschaffen {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  fetchData: () => Promise<void>;
  setReload: React.Dispatch<React.SetStateAction<boolean>>;
}

const Erschaffen: React.FC<erschaffen> = ({
  openModal,
  setOpenModal,
  fetchData,
  setReload,
}) => {
  const [createData, setCreateData] = useState({
    name: "",
    description: "",
    etappe: "",
    liedtext: "",
    liturgisch: [""],
    thematisch: [""],
  });

  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);

  const [selectedLiturgisch, setSelectedLiturgisch] = useState<MultiValue<{
    value: string;
    label: string;
  }> | null>(null);
  const [selectedThematisch, setSelectedThematisch] = useState<MultiValue<{
    value: string;
    label: string;
  }> | null>(null);
  const liturgisch = [
    { value: "Advent-Weinachten", label: "Advent-Weinachten" },
    { value: "Fastenzeit", label: "Fastenzeit" },
    { value: "Ostern-Pfingsten", label: "Ostern-Pfingsten" },
    { value: "Jahreskreis", label: "Jahreskreis" },
  ];

  const thematisch = [
    { value: "Marienlieder", label: "Marienlieder" },
    { value: "Lieder-für-die-Kinder", label: "Lieder für die Kinder" },
    { value: "Einzugslieder", label: "Einzugslieder" },
    { value: "Frieden-Gabenbereitung", label: "Frieden-Gabenbereitung" },
    { value: "Brotbrechen", label: "Brotbrechen" },
    { value: "Kelchkommunion", label: "Kelchkommunion" },
    { value: "Auszugslieder", label: "Auszugslieder" },
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [specificAudio, setEspecificAudio] = useState("");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const disableFunction = async () => {
    if (createData.name === "" || createData.etappe === "" || image === null) {
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
    setReload(true);

    try {
      const newLied = new FormData();
      newLied.append("image", image);
      if (!audio) {
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
    } catch (error) {
      console.log({ message: "error", error });
    }
    fetchData();

    setReload(false);
  };

  const sendInfo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateLied();
    setOpenModal(false);
  };

  let dataLiturgisch: any[] = [];

  selectedLiturgisch?.map((data) => {
    return dataLiturgisch.push(data.value);
  });

  useEffect(() => {
    setCreateData(() => ({
      ...createData,
      liturgisch: dataLiturgisch,
    }));
  }, [selectedLiturgisch]);

  let dataThematisch: any[] = [];

  selectedThematisch?.map((data) => {
    return dataThematisch.push(data.value);
  });

  useEffect(() => {
    setCreateData(() => ({
      ...createData,
      thematisch: dataThematisch,
    }));
  }, [selectedThematisch]);

  useEffect(() => {
    if (sended === "User erfolgreich erschafft") {
      setModalAlert(true);
      setSelectedLiturgisch(null);
      setSelectedThematisch(null);
      setCreateData(() => ({
        name: "",
        description: "",
        etappe: "",
        liedtext: "",
        liturgisch: [""],
        thematisch: [""],
      }));
    }

    setTimeout(() => {
      setSended("");
      setModalAlert(false);
    }, 10000);
  }, [sended, setCreateData, setModalAlert]);

  useEffect(() => {
    disableFunction();
  }, [createData, disableFunction]);
  return (
    <div>
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
        setSelectedLiturgisch={setSelectedLiturgisch}
        selectedLiturgisch={selectedLiturgisch}
        selectedThematisch={selectedThematisch}
        setSelectedThematisch={setSelectedThematisch}
      />
    </div>
  );
};

export default Erschaffen;

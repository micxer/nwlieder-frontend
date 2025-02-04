import React, { useEffect, useState } from "react";
import EditierenView from "./editierenView";
import { Hola, KommentareInfo } from "../interfaces";
import Kommentare from "../Kommentare/kommentare";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Spinner from "../spinner/reload";
import { MultiValue } from "react-select";
import { create } from "domain";

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
    liturgisch: [""],
    thematisch: [""],
    secondary_images: [""]
  });


  const [specificAudio, setEspecificAudio] = useState("");
  const [openModalKommentare, setOpenModalKommentare] = useState(false);
  const [ModalAlert, setModalAlert] = useState(false);
  const [sended, setSended] = useState("");
  const [disable, setDisable] = useState(true);
  const [kommentare, setKommentare] = useState<KommentareInfo>();
  const [modalDelete, setModalDelete] = useState(false);
  const [reload, setReload] = useState(false);
  const [image, setImage] = useState<File | null>();
  const [audio, setAudio] = useState<File | null>();
  const [kommentarrolle, setKommentarrolle] = useState("");
  const [kommentarId, setKommentarId] = useState("");
  const [createSecondImage, setCreateSecondImage] = useState<File | null>();

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

  const [selectedLiturgisch, setSelectedLiturgisch] = useState<MultiValue<{
    value: string;
    label: string;
  }> | null>(null);

  const [selectedThematisch, setSelectedThematisch] = useState<MultiValue<{
    value: string;
    label: string;
  }> | null>(null);


  const getSpecificAudio = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenModalKommentare(true);
    setKommentarrolle(e.currentTarget.name);
    setEspecificAudio(e.currentTarget.value);
  };

  const getIdKommentar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setOpenModalKommentare(true);
    setKommentarrolle(e.currentTarget.name);
    setKommentarId(e.currentTarget.value);
  };

  const getAudio = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      await setAudio(e.target.files[0]);
    }
  };

 const getSecondImage = async (e: React.ChangeEvent<HTMLInputElement>) => {

    e.preventDefault();
    if (e.target.files && e.target.files.length > 0) {
      await setCreateSecondImage(e.target.files[0]);
    }

  }

  const createSpecificSecondImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setReload(true)

    const createNewimage = new FormData();

    if(!createSecondImage) {

      alert("Please, upload an Image");
      return;
    }

    await createNewimage.append('image', createSecondImage)

    const fetchOptions = {
      method: "PUT",
      body: createNewimage
    }

    try {
   await fetch(`${process.env.REACT_APP_API_URL}/imageCreate/${id}`, fetchOptions).then(res => res.json()).then(
      data => console.log(`secondImage ${data}`)
    )
  }
  catch (error) {
    console.log({Message: "error by createSecondImage", error})
  }

  setReload(false)
  }

  const deleteSpecificSecondImage = async (e: React.MouseEvent<HTMLButtonElement>) => {

    setReload(true)
    e.preventDefault();

    console.log(e.currentTarget.value.toString())
   

   

   try {

    const newImage = await {
      image: e.currentTarget.value.toString()
    }

    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Especifica el tipo de contenido esperado
      },
      body: JSON.stringify(newImage)
    }

    await fetch(`${process.env.REACT_APP_API_URL}/imageDelete/${id}`, fetchOptions).then((res) => res.json()).then((data) => console.log("sucessfully deleted"))

  }
  catch(error)  {
    console.log({message: "das Bild ist nicht entfernt worden"})
  }
  setReload(false)

  }
  

  const createSpecificAudio = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();

    const createNewAudio = new FormData();

    if (!audio) {
      alert("Please upload an audio");
      return;
    }

    await createNewAudio.append("audio", audio);

    const fetchOptions = {
      method: "PUT",
      body: createNewAudio,
    };
    setReload(true);
    try {
      await fetch(
        `${process.env.REACT_APP_API_URL}/audioCreate/${id}`,
        fetchOptions
      )
        .then((response) => response.json())
        .then((data) => {});
    } catch (error) {
      console.log("cual es el error", error);
    }

    setReload(false);
  };

  const deleteSpecificAudio = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    await setEspecificAudio(e.currentTarget.value);

    const updateLied = {
      audio: specificAudio, // Hier sicherstellen, dass der spezifische Audio-Wert gesendet wird
    };

    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json", // Especifica el tipo de contenido esperado
      },
      body: JSON.stringify(updateLied),
    };
    setReload(true);

    try {
      await fetch(`${process.env.REACT_APP_API_URL}/audio/${id}`, fetchOptions)
        .then((response) => response.json())
        .then((data) => {});
    } catch (error) {
      console.log("cual es el error", error);
    }

    setReload(false);
  };

  const updateImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const urlKommentare = `${process.env.REACT_APP_API_URL}/kommentare/${id}`;

  const getKommentar = async () => {
    await fetch(urlKommentare)
      .then((response) => response.json())
      .then((data) => {
        setKommentare(data);
      });
  };

  const openModalDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setModalDelete(!modalDelete);
  };

  const getLied = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/lied/${id}`;
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
        liturgisch: dataResponse[0].liturgisch || "",
        thematisch: dataResponse[0].thematisch || "",
        secondary_images: dataResponse[0].secondary_images || "",
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
      updateData.etappe === ""
    ) {
      await setDisable(true);
    } else {
      await setDisable(false);
    }
  };

  const [extractIdDeleteKommentar, setExtractIdDeleteKommentar] = useState<
    string
  >();

  const onClickFunction = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setExtractIdDeleteKommentar(e.currentTarget.value);
    openModalDelete(e);
  };

  const deleteKommentar = async (e: React.MouseEvent<HTMLButtonElement>) => {
    const urlKommentareDelete = `${process.env.REACT_APP_API_URL}/kommentare/${extractIdDeleteKommentar}`;
    const fetchOptionsKommentare = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    setReload(true);
    try {
      await fetch(urlKommentareDelete, fetchOptionsKommentare)
        .then((response) => response.json())
        .then((data) => data);

      setModalAlert(true);
      openModalDelete(e);
    } catch (error) {
      console.log({ message: "the Commentar was not deleted" });
    }

    setReload(false);
  };

  const url = `${process.env.REACT_APP_API_URL}/lied/${id}`;

  const updateLied = async () => {
    const updateLied = new FormData();
    if (image) {
      updateLied.append("image", image);
    }

    Object.entries(updateData).forEach(([key, value]) => {
      updateLied.append(key, value.toString());
    });

    const fetchOptions = {
      method: "PUT",
      body: updateLied,
    };
    setReload(true);
    try {
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
    } catch (error) {
      console.log({ message: "etwas ist schiff gelaufen", error });
    }

    setReload(false);
  };

  const sendInfo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await updateLied();
    await setOpenModal(false);
  };

  const level = "admin";

  let liturgischData: any[] = [];

  selectedLiturgisch?.map((data) => liturgischData.push(data.value));

  useEffect(() => {
    setUpdateData(() => ({
      ...updateData,
      liturgisch: liturgischData,
    }));
  }, [selectedLiturgisch]);

  useEffect(() => {
    disableFunction();
  }, [updateData]);

  let thematischData: any[] = [];

  selectedThematisch?.map((data) => thematischData.push(data.value));

  useEffect(() => {
    setUpdateData(() => ({
      ...updateData,
      thematisch: thematischData,
    }));
  }, [selectedThematisch]);

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

  useEffect(() => {
    getKommentar();
    getLied();
  }, [reload]);

  const amam = id === undefined ? 0 : parseInt(id);

  return (
    <div>
      {reload === true ? (
        <Spinner />
      ) : (
        <div>
          <Kommentare
            openModal={openModalKommentare}
            setOpenModal={setOpenModalKommentare}
            data={data}
            aktuelLied={amam}
            level={level}
            specificAudio={specificAudio}
            setReload={setReload}
            kommentarrolle={kommentarrolle}
            kommentarId={kommentarId}
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
            openModalDelete={openModalDelete}
            modalDelete={modalDelete}
            onClickFunction={onClickFunction}
            updateImage={updateImage}
            deleteSpecificAudio={deleteSpecificAudio}
            createSpecificAudio={createSpecificAudio}
            getAudio={getAudio}
            getIdKommentar={getIdKommentar}
            liturgischverzeichnis={liturgisch}
            thematischverzeichnis={thematisch}
            selectedLiturgisch={selectedLiturgisch}
            setSelectedLiturgisch={setSelectedLiturgisch}
            selectedThematisch={selectedThematisch}
            setSelectedThematisch={setSelectedThematisch}
            createSpecificSecondImage={createSpecificSecondImage}
            getSecondImage={getSecondImage}
            deleteSpecificSecondImage={deleteSpecificSecondImage}
          />
          <Modal
            show={modalDelete}
            onHide={() => setModalDelete(!modalDelete)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Kommentar löschen</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Bist du sicher, dass du diesen Kommentar löschen möchtest!
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={openModalDelete}>
                Nein
              </Button>
              <Button variant="primary" onClick={deleteKommentar}>
                Ja
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Editieren;

import React from "react";
import Modal from "react-bootstrap/Modal";
import { Hola, KommentareInfo } from "../interfaces";
import "./editieren.css";
import ModalAlert from "../modal/modal";
import { MdDelete } from "react-icons/md";
import Marquee from "react-fast-marquee";
import { BiSolidCommentDetail } from "react-icons/bi";
import { MdEdit } from "react-icons/md";
import Select, { MultiValue } from "react-select";
import hey from "../Images/Abba-Vater.png";
interface editierenView {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteSpecificSecondImage: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  data: Hola[];
  aktuelLied: number;
  id?: string;
  modalAlert: boolean;
  liturgischverzeichnis: {
    value: string;
    label: string;
  }[];
  thematischverzeichnis: {
    value: string;
    label: string;
  }[];
  selectedLiturgisch: MultiValue<{
    value: string;
    label: string;
  }> | null;
  setSelectedLiturgisch: React.Dispatch<
    React.SetStateAction<MultiValue<{
      value: string;
      label: string;
    }> | null>
  >;
  createSpecificSecondImage: (e: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  getSecondImage: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>
  openModalDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  kommentare: KommentareInfo | undefined;
  getSpecificAudio: (e: React.MouseEvent<HTMLButtonElement>) => void;
  sendInfo: (e: React.FormEvent<HTMLFormElement>) => void;
  setOpenModalKommentare: React.Dispatch<React.SetStateAction<boolean>>;
  modalDelete: boolean;
  disable: boolean;
  selectedThematisch: MultiValue<{
    value: string;
    label: string;
  }> | null;
  setSelectedThematisch: React.Dispatch<
    React.SetStateAction<MultiValue<{
      value: string;
      label: string;
    }> | null>
  >;
  updateImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClickFunction: (e: React.MouseEvent<HTMLButtonElement>) => void;
  deleteSpecificAudio: (
    e: React.MouseEvent<HTMLButtonElement>
  ) => Promise<void>;
  createSpecificAudio: (
    e: React.MouseEvent<HTMLButtonElement>
  ) => Promise<void>;
  getAudio: (e: React.ChangeEvent<HTMLInputElement>) => Promise<void>;
  updateData: {
    name: string | undefined;
    description: string;
    img: string;
    audios: string[];
    etappe: string;
    liedtext: string;
    liturgisch: string[];
    thematisch: string[];
    secondary_images: string[];
  };
  getIdKommentar: (e: React.MouseEvent<HTMLButtonElement>) => void;

  setUpdateData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      description: string;
      img: string;
      audios: string[];
      etappe: string;
      liedtext: string;
      liturgisch: string[];
      thematisch: string[];
      secondary_images: string[];
    }>
  >;
}

const EditierenView: React.FC<editierenView> = ({
  openModal,
  setOpenModal,
  data,
  aktuelLied,
  id,
  setOpenModalKommentare,
  updateData,
  setUpdateData,
  sendInfo,
  getSpecificAudio,
  modalAlert,
  disable,
  kommentare,
  openModalDelete,
  modalDelete,
  onClickFunction,
  updateImage,
  deleteSpecificAudio,
  createSpecificAudio,
  getAudio,
  getIdKommentar,
  liturgischverzeichnis,
  thematischverzeichnis,
  selectedLiturgisch,
  setSelectedLiturgisch,
  selectedThematisch,
  setSelectedThematisch,
  getSecondImage,
  createSpecificSecondImage,
  deleteSpecificSecondImage
}) => {
  return (
    <div>
      <Modal show={openModal} onHide={() => setOpenModal(!openModal)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Bearbeiten</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col container">
            <div>
              <form onSubmit={sendInfo}>
              <label className="form-label mt-3 subtitle">Hauptbild</label>
                <div className="text-center">
                  
                  <img
                    className="rounded ms-2 col shadow"
                    src={updateData?.img}
                    style={{
                      width: "40vw",
                      maxWidth: "40vh",
                      alignItems: "center",
                    }}
                  />
                  <input
                    onChange={updateImage}
                    name="image"
                    type="file"
                    accept="image/*"
                    className="form-control mt-2"
                  />
                </div>
                <div>
                <label className="form-label mt-3 subtitle">Sekundaere Bilder</label>
                  <input 
                  className="form-control" 
                  type="file"
                  onChange={(e) => getSecondImage(e)}
                  />
                  <div className="text-center mt-3">
                  <button className="btn btn-danger" onClick={createSpecificSecondImage} 
                  disabled={updateData.secondary_images.length > 2}
                  >Add</button>
                  </div>
                  <div className="d-flex justify-content-center mt-2">
                    {
                 updateData?.secondary_images ?   updateData?.secondary_images?.map((data) => 
                  <div>
                    <div>
                        <img
                        className="rounded  col shadow ms-4"
                        src={data}
                        style={{
                          width: "20vw",
                          maxWidth: "20vh",
                          alignItems: "center",
                        }}
                      /> 
                      </div>
                      <div className="text-center ms-4">
                      <button style={{all: "unset", color: 'red', fontWeight: "bold", fontSize: 20}} value={data} onClick={(e) => deleteSpecificSecondImage(e)}>
                        X
                      </button>
                      </div>
                      </div>
                       ) : <div/>
                    }
               
                  </div>
                </div>
                <div>
                  <label className="form-label mt-3 subtitle">Name</label>
                  <input
                    className="col-2 form-control"
                    value={updateData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUpdateData((hola) => ({
                        ...hola,
                        name: e.target.value,
                      }))
                    }
                  />
                  <label className="form-label mt-3 subtitle">
                    Beschreibung
                  </label>
                  <input
                    value={updateData.description}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUpdateData((hola) => ({
                        ...hola,
                        description: e.target.value,
                      }))
                    }
                    className="col-2 form-control"
                  />

                  <label className="form-label mt-3 subtitle">
                    Text des Liedes
                  </label>
                  <div className="form-floating">
                    <textarea
                      value={updateData.liedtext}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setUpdateData((hola) => ({
                          ...hola,
                          liedtext: e.target.value,
                        }))
                      }
                      className="form-control"
                      placeholder="Leave a comment here"
                      id="floatingTextarea2"
                      style={{ height: "100px" }}
                      spellCheck="false"
                    ></textarea>
                    <label htmlFor="floatingTextarea2">Text</label>
                  </div>

                  <div>
                    <label className="form-label mt-3 subtitle">
                      Liturgisches Verzeichnis
                    </label>
                  </div>
                  <div>
                    <div>
                      <Select
                        isMulti
                        defaultValue={liturgischverzeichnis.filter((hola) =>
                          updateData.liturgisch.includes(hola.value)
                        )}
                        options={liturgischverzeichnis}
                        onChange={setSelectedLiturgisch}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label mt-3 subtitle">
                      Thematisches Verzeichnis
                    </label>
                  </div>
                  <div>
                    <div>
                      <Select
                        isMulti
                        defaultValue={thematischverzeichnis.filter((hola) =>
                          updateData.thematisch.includes(hola.value)
                        )}
                        options={thematischverzeichnis}
                        onChange={setSelectedThematisch}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label mt-3 subtitle">Etappe</label>
                    <select
                      className="form-select"
                      aria-label={updateData.etappe}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setUpdateData((hola) => ({
                          ...hola,
                          etappe: e.target.value,
                        }))
                      }
                    >
                      <option
                        selected={updateData.etappe === "Vorkatechumenat"}
                        value="Vorkatechumenat"
                      >
                        Vorkatechumenat
                      </option>
                      <option
                        selected={updateData.etappe === "liturgisch"}
                        value="liturgisch"
                      >
                        Liturgisch
                      </option>
                      <option
                        selected={updateData.etappe === "Katechumenat"}
                        value="Katechumenat"
                      >
                        Katechumenat
                      </option>
                      <option
                        selected={updateData.etappe === "Auserwählung"}
                        value="Auserwählung"
                      >
                        Auserwählung
                      </option>
                    </select>
                  </div>
                  <div className="mb-5 ">
                    <label className="form-label mt-3 subtitle">mp3 file</label>
                    <div className="text-center">
                      <input
                        type="file"
                        accept="audio/*"
                        name="audio"
                        className="form-control"
                        onChange={getAudio}
                      />
                      <button
                        onClick={createSpecificAudio}
                        className="btn mt-2 mb-3"
                      >
                        {" "}
                        hinzufügen{" "}
                      </button>
                    </div>
                    {updateData.audios?.map((data) => (
                      <div>
                        <ul className="list-group">
                          {data === "" ? (
                            <div />
                          ) : (
                            <li
                              style={{ all: "unset" }}
                              className="list-group-item shadow-sm p-1 mt-2"
                            >
                              <div className="col row d-flex justify-content-around">
                                <div className="col-9 ">
                                  <Marquee speed={30}>
                                    {data}&nbsp;&nbsp;
                                  </Marquee>
                                </div>
                                <div className="col-auto">
                                  <button
                                    className="ms-4"
                                    style={{ all: "unset" }}
                                    value={data}
                                    name="erschaffen"
                                    onClick={getSpecificAudio}
                                  >
                                    <BiSolidCommentDetail
                                      size={25}
                                      color="#ed1e24"
                                    />
                                  </button>
                                  <button
                                    className="ms-4"
                                    style={{ all: "unset" }}
                                    value={data}
                                    onClick={deleteSpecificAudio}
                                  >
                                    X
                                  </button>
                                </div>
                              </div>
                            </li>
                          )}
                          {kommentare?.map((kdata) => {
                            return (
                              <div>
                                {kdata.audio_id === data ? (
                                  <div>
                                    {" "}
                                    <ul>
                                      <li
                                        style={{}}
                                        className="list-group-item shadow rounded mt-1"
                                      >
                                        <div className="d-flex justify-content-between">
                                          <p
                                            style={{
                                              fontSize: 17,
                                              fontWeight: "bold",
                                            }}
                                          >
                                            {kdata.name}
                                          </p>
                                          <div className="d-flex justify-content-around ">
                                            {/* <p style={{ color: "black" }}>
                                              {" "}
                                              {new Date(
                                                kdata.created_at
                                              ).toLocaleDateString()}
                                            </p> */}
                                            <div className="d-flex ms-1">
                                              <button
                                                value={kdata.id}
                                                name="bearbeiten"
                                                onClick={getIdKommentar}
                                                className="me-2"
                                                style={{ all: "unset" }}
                                              >
                                                <MdEdit size={25} color="red" />
                                              </button>
                                              <button
                                                value={kdata.id}
                                                style={{ all: "unset" }}
                                                onClick={(e) => {
                                                  onClickFunction(e);
                                                }}
                                              >
                                                <MdDelete
                                                  size={25}
                                                  color="red"
                                                />
                                              </button>
                                            </div>
                                          </div>
                                        </div>
                                        <div>
                                          <p style={{ color: "black" }}>
                                            {kdata.description}
                                          </p>
                                        </div>
                                      </li>
                                    </ul>{" "}
                                  </div>
                                ) : (
                                  <div />
                                )}
                              </div>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      style={{
                        backgroundColor: "#ed1e24",
                        color: "white",
                        fontWeight: "700",
                        border: "none",
                      }}
                      className="btn btn-primary btn-lg "
                      disabled={disable}
                    >
                      {" "}
                      bearbeiten
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </Modal.Body>
        =
      </Modal>

      <ModalAlert
        text={`Das lied ${updateData.name} wurde erfolgreich bearbeitet`}
        show={modalAlert}
        heading={"Succesfully"}
      />
    </div>
  );
};

export default EditierenView;

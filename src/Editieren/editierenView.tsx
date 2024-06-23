import React from "react";
import Modal from "react-bootstrap/Modal";
import { Hola, KommentareInfo } from "../interfaces";
import "./editieren.css";
import { BiSolidCommentDetail } from "react-icons/bi";
import ModalAlert from "../modal/modal";
import { MdDelete } from "react-icons/md";
import Marquee from "react-fast-marquee";
import Button from "react-bootstrap/Button";

interface editierenView {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  data: Hola[];
  aktuelLied: number;
  id?: string;
  modalAlert: boolean;
  openModalDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  kommentare: KommentareInfo | undefined;
  getSpecificAudio: (e: React.MouseEvent<HTMLButtonElement>) => void;
  sendInfo: (e: React.FormEvent<HTMLFormElement>) => void;
  setOpenModalKommentare: React.Dispatch<React.SetStateAction<boolean>>;
  modalDelete: boolean;
  disable: boolean;
  onClickFunction: (e: React.MouseEvent<HTMLButtonElement>) => void;
  updateData: {
    name: string | undefined;
    description: string;
    img: string;
    audios: string[];
    etappe: string;
    liedtext: string;
  };

  setUpdateData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      description: string;
      img: string;
      audios: string[];
      etappe: string;
      liedtext: string;
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
                <div className="text-center">
                  <img
                    className="rounded ms-2 col "
                    src={data[aktuelLied]?.img}
                    style={{
                      width: "40vw",
                      maxWidth: "40vh",
                      alignItems: "center",
                    }}
                  />
                  <input
                    type="file"
                    accept="image/*"
                    className="form-control"
                  />
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
                        selected={updateData.etappe === "vorkathechumenal"}
                        value="vorkathechumenal"
                      >
                        Vorkathechumenal
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
                        selected={updateData.etappe === "Wahl"}
                        value="Wahl"
                      >
                        Wahl
                      </option>
                    </select>
                  </div>
                  <div className="mb-5 ">
                    <label className="form-label mt-3 subtitle">mp3 file</label>
                    {updateData.audios?.map((data) => (
                      <div>
                        <ul className="list-group">
                          <li
                            style={{ all: "unset" }}
                            className="list-group-item shadow-sm p-1 mt-2"
                          >
                            <div className="col row d-flex justify-content-around">
                              <div className="col-9 ">
                                <Marquee speed={30}>{data}&nbsp;&nbsp;</Marquee>
                              </div>
                              <div className="col-auto">
                                <button
                                  className="ms-4"
                                  style={{ all: "unset" }}
                                  value={data}
                                  onClick={getSpecificAudio}
                                >
                                  <BiSolidCommentDetail
                                    size={25}
                                    color="#ed1e24"
                                  />
                                </button>
                              </div>
                            </div>
                          </li>
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
                                            <p style={{ color: "black" }}>
                                              {" "}
                                              {new Date(
                                                kdata.created_at
                                              ).toLocaleDateString()}
                                            </p>
                                            <div className="d-flex ms-1">
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

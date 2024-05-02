import React from "react";
import Modal from "react-bootstrap/Modal";
import { Hola } from "../interfaces";
import "./erschaffen.css";
import { BiSolidCommentDetail } from "react-icons/bi";
import { create } from "domain";
import { FaPlus } from "react-icons/fa6";

interface editierenView {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  getSpecificAudio: (e: React.MouseEvent<HTMLButtonElement>) => void;
  sendInfo: (e: React.FormEvent<HTMLFormElement>) => void;
  setOpenModalKommentare: React.Dispatch<React.SetStateAction<boolean>>;
  disable: boolean;
  createData: {
    name: string | undefined;
    description: string;
    img: string;
    audios: string[];
    etappe: string;
    liedtext: string;
  };

  setCreateData: React.Dispatch<
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
  setOpenModalKommentare,
  createData,
  setCreateData,
  sendInfo,
  getSpecificAudio,
  disable,
}) => {
  return (
    <Modal show={openModal} onHide={() => setOpenModal(!openModal)} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Erschaffen</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="col container">
          <div>
            <form onSubmit={sendInfo}>
              <div className="text-center">
                <input type="file" accept="image/*" className="form-control" />
              </div>
              <div>
                <label className="form-label mt-3 subtitle">Name</label>
                <input
                  className="col-2 form-control"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCreateData((hola) => ({
                      ...hola,
                      name: e.target.value,
                    }))
                  }
                />
                <label className="form-label mt-3 subtitle">Beschreibung</label>
                <input
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setCreateData((hola) => ({
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
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      setCreateData((hola) => ({
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
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      setCreateData((hola) => ({
                        ...hola,
                        etappe: e.target.value,
                      }))
                    }
                  >
                    <option
                      selected={createData.etappe === "vorkathechumenal"}
                      value="vorkathechumenal"
                    >
                      Vorkathechumenal
                    </option>
                    <option
                      selected={createData.etappe === "liturgisch"}
                      value="liturgisch"
                    >
                      Liturgisch
                    </option>
                    <option
                      selected={createData.etappe === "Katechumenat"}
                      value="Katechumenat"
                    >
                      Katechumenat
                    </option>
                    <option
                      selected={createData.etappe === "Katechumenat"}
                      value="Wahl"
                    >
                      Wahl
                    </option>
                  </select>
                </div>
                <div className="mb-5">
                <label className="form-label mt-3 subtitle">mp3 file</label>&nbsp;&nbsp;
                <button className="add-audio" >
                <div className="d-flex align-items-center justify-content-center">
          <FaPlus />
          </div>
        </button>
                <form className="mt-2" encType="multipart/form-data">
      <input className="form-control" type="file" accept="audio/*" multiple/>
      
    </form>
                 
               
                  {/* {createData?.audios?.map((data) => (
                    <div>
                      <ul className="list-group">
                        <li
                          style={{ all: "unset" }}
                          className="list-group-item shadow-sm p-1 mt-2"
                        > */}
                          {/* <div className="col row d-flex justify-content-around">
                            <div className="col ">{data}</div>
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
                          </div> */}
                        {/* </li>
                      </ul>
                    </div>
                  ))} */}
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary btn-lg btn-danger" disabled={disable}>
                    {" "}
                    Erschaffen
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default EditierenView;

import React from "react";
import Modal from "react-bootstrap/Modal";
import "./erschaffen.css";
import ModalAlert from "../modal/modal";
import Select, { MultiValue } from 'react-select';

interface editierenView {
  openModal: boolean;
  modalAlert: boolean;
  liturgischverzeichnis: {
    value: string;
    label: string;
}[];
  thematischverzeichnis: {
    value: string;
    label: string;
}[];
  setSelectedLiturgisch: React.Dispatch<React.SetStateAction<MultiValue<{
    value: string;
    label: string;
}> | null>>
  selectedLiturgisch: MultiValue<{
    value: string;
    label: string;
}> | null;
selectedThematisch: MultiValue<{
  value: string;
  label: string;
}> | null;
setSelectedThematisch: React.Dispatch<React.SetStateAction<MultiValue<{
  value: string;
  label: string;
}> | null>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  getSpecificAudio: (e: React.MouseEvent<HTMLButtonElement>) => void;
  sendInfo: (e: React.FormEvent<HTMLFormElement>) => void;
  setOpenModalKommentare: React.Dispatch<React.SetStateAction<boolean>>;
  handleImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disable: boolean;
  createData: {
    name: string | undefined;
    description: string;
    etappe: string;
    liedtext: string;
    liturgisch: string[];
    thematisch: string[];
  };

  setCreateData: React.Dispatch<
    React.SetStateAction<{
      name: string;
      description: string;
      etappe: string;
      liedtext: string;
      liturgisch: string[];
      thematisch: string[];
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
  handleImageChange,
  modalAlert,
  liturgischverzeichnis,
  thematischverzeichnis,
  setSelectedLiturgisch,
  selectedLiturgisch, 
  selectedThematisch,
  setSelectedThematisch

}) => {


  function value(prevState: null): null {
    throw new Error("Function not implemented.");
  }

  return (
    <div>
      <Modal show={openModal} onHide={() => setOpenModal(!openModal)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Erschaffen</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col container">
            <div>
              <form onSubmit={sendInfo}>
                <div className="text-center">
                  <input
                    type="file"
                    accept="image/*"
                    name="image"
                    className="form-control"
                    onChange={handleImageChange}
                  />
                </div>
                <div>
                  <label className="form-label mt-3 subtitle">Name</label>
                  <input
                    className="col-2 form-control"
                    value={createData.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setCreateData((hola) => ({
                        ...hola,
                        name: e.target.value,
                      }))
                    }
                  />
                  <label className="form-label mt-3 subtitle">
                    Beschreibung
                  </label>
                  <input
                  value={createData.description}
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
                    value={createData.liedtext}
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
                    <label className="form-label mt-3 subtitle">
                      Liturgisches Verzeichnis
                    </label>
             
                  </div>
                  <div>
                  <div>
                  <Select
      isMulti
      options={liturgischverzeichnis}
      value={selectedLiturgisch}
      onChange={(e: MultiValue<{ value: string; label: string; }> | null ) => {
        setSelectedLiturgisch(e);
      }}
    />
                  </div>
                
                  
                  </div>

                  <div>
                    <label className="form-label subtitle mt-3">
                      Thematisches Verzeichnis
                    </label>
                    <div>
                    <Select isMulti options={thematischverzeichnis} value={selectedThematisch} 
                    onChange={(e: MultiValue<{value: string; label: string}> | null) => {
                      setSelectedThematisch(e);
                    }}></Select>
                  </div>
                  </div>
                  <div>
                    <label className="form-label mt-3 subtitle">Etappe</label>
                    <select
                      className="form-select"
                      value={createData.etappe}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        setCreateData((hola) => ({
                          ...hola,
                          etappe: e.target.value,
                        }))
                      }
                    >
                      <option defaultValue="" value="">Wählen Sie eine Option aus</option>
                      <option
                        selected={createData.etappe === "Vorkatechumenat"}
                        value="Vorkatechumenat"
                      >
                        Vorkatechumenat
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
                        selected={createData.etappe === "Auserwählung"}
                        value="Auserwählung"
                      >
                        Auserwählung
                      </option>
                    </select>
                  </div>
                  <div className="mb-5">
                    <label className="form-label mt-3 subtitle">mp3 file</label>
                    &nbsp;&nbsp;
                    <form className="mt-2" encType="multipart/form-data">
                      <input
                        className="form-control"
                        multiple
                        name="audio"
                        type="file"
                        accept="audio/*"
                        onChange={handleImageChange}
                      />
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
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg btn-danger"
                      disabled={disable}
                    >
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
      <ModalAlert
        text={`Das lied wurde erfolgreich erschaffen`}
        show={modalAlert}
        heading={"Succesfully"}
      />
    </div>
  );
};

export default EditierenView;

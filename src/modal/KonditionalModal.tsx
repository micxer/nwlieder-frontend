import React from 'react';
import Modal from "react-bootstrap/Modal"
import Button from "react-bootstrap/Button";

interface KonditionalModalInterface  {

    show: {
        mullModalKonditional: boolean;
        id: string;};
    konditional: React.Dispatch<React.SetStateAction<boolean>>;
    setShow: React.Dispatch<React.SetStateAction<{
        mullModalKonditional: boolean;
        id: string;}>>

}


const KonditionalModal: React.FC<KonditionalModalInterface> = ({show, konditional, setShow}) => {
    

    const handleClose = () =>  setShow(() => ({
        ...show,
        mullModalKonditional: false
    }));;

    return (
        <Modal show={show.mullModalKonditional} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Sind Sie sicher dass Sie das Lied Entfernen wollen?</Modal.Title>
        </Modal.Header>
     
        <Modal.Footer>
          <Button variant="danger" style={{color: "ffffff"}} onClick={handleClose}>
            Nein
          </Button>
          <Button variant="danger" onClick={() => { konditional(true)

            setTimeout(() => {
                konditional(false)
            }, 500)
           }}>
            Entfernen
          </Button>
          
        </Modal.Footer>
      </Modal>
    )

}

 export default KonditionalModal;
import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import { Hola } from '../interfaces';
import '../Lied/lied.css';

interface information {

    informationsModal: boolean;
    setInformationsModal: React.Dispatch<React.SetStateAction<boolean>>;
    data: Hola[];

}


const informationsmodal: React.FC<information> = ({informationsModal, setInformationsModal, data}) => {

    const inhalt = data[0];

    return (

            <Modal  show={informationsModal}>
                <Modal.Header>
                    <Modal.Title><p>Liedsinformation</p></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div>
                    <p className='subtitle'>Etappe</p>
                    {inhalt?.etappe}
                    
                  </div>
                  <div className='mt-4'>
                    <p className='subtitle'>Liturgisches Verzeichnis</p>
                    {
                        inhalt?.liturgisch?.map((litu) => (
                            <div>
                                <p style={{color: "#000000"}}>{litu}</p>
                                 </div>
                        ) )
                    }
                  </div>

                  <div className='mt-4'>
                    <p className='subtitle'>Thematisches Verzeichnis</p>
                    {
                        inhalt?.thematisch?.map((litu) => (
                            <div>
                                <p style={{color: "#000000"}}>{litu}</p>
                                 </div>
                        ) )
                    }
                  </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='danger' onClick={() => setInformationsModal(false)}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
       
    )
}



export default informationsmodal;
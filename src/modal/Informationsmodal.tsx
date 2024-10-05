import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'
import { Hola } from '../interfaces';
import '../Lied/lied.css';
import { useNavigate } from 'react-router-dom';

interface information {

    informationsModal: boolean;
    setInformationsModal: React.Dispatch<React.SetStateAction<boolean>>;
    data: Hola[];

}


const informationsmodal: React.FC<information> = ({informationsModal, setInformationsModal, data}) => {

    const inhalt = data[0];
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const navigate = useNavigate();

    return (

            <Modal  show={informationsModal}>
                <Modal.Header>
                    <Modal.Title><p>Liedsinformation</p></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div>
                    <p className='subtitle'>Etappe</p>
                    <button className='mt-2' style={{all: "unset", color: 'gray'}} onClick={() => {
                        navigate('/home', {state: {
                            filterEtappe: inhalt.etappe
                        }})
                    }}>
                    {inhalt?.etappe}
                    </button>
                   
                    
                  </div>
                  <div className='mt-4'>
                    <p className='subtitle'>Liturgisches Verzeichnis</p>
                    {
                        inhalt?.liturgisch?.map((litu) => (
                            <div>
                                <button className='mt-2' style={{all: "unset", color: "gray"}} onClick={() => {
                                    navigate('/home', {
                                        state: {
                                            filterLiturgisch: litu
                                        }
                                    })
                                }}>{litu}</button>
                                 </div>
                        ) )
                    }
                  </div>

                  <div className='mt-4'>
                    <p className='subtitle'>Thematisches Verzeichnis</p>
                    {
                        inhalt?.thematisch?.map((litu) => (
                            <div>
                                <button className="mt-2" style={{all: "unset", color: "gray"}} onClick={() => {
                                    navigate('/home', {
                                        state: {
                                            filterThematisch: litu
                                        }
                                    })
                                }}>{litu}</button>
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
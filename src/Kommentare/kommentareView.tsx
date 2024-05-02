import React from 'react';
import Modal from 'react-bootstrap/Modal'
import { KommentareInfo } from '../interfaces'; 
import './kommentare.css'


interface kommentareViewInterface {

    openModal: boolean;
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>,
    sendKommentar:(e: React.ChangeEvent<HTMLInputElement>) => void,
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void,
    specificAudio: string
    kommentare: {
      name: string;
      description: string;
      id_lied: number | undefined;
  }
  level: string,
  kommentareData: KommentareInfo[],
  setKommentare: React.Dispatch<React.SetStateAction<{
    id_lied: number | undefined;
    name: string;
    description: string;
    audio_id: string;
}>>
}

const kommentareView:React.FC<kommentareViewInterface> = ({openModal, setOpenModal,
   sendKommentar, handleSubmit, kommentare, level, kommentareData, specificAudio, setKommentare}) => {


     if(level === "normal") return (
      <Modal show={openModal} onHide={() => setOpenModal(!openModal)} size='lg'scrollable centered >
        <Modal.Header closeButton>
          <Modal.Title>Kommentare</Modal.Title>
        </Modal.Header>
        <Modal.Body>
         
        <div>
          {
          !Array.isArray(kommentareData) || kommentareData.length === 0 ?
             <div>es gibt keinen Kommentar</div> :  kommentareData.map(data => {
   
                 return  (
                 <div key={data?.id}>

                  {  data.audio_id === specificAudio ?
                   <div>
                   <div className='col row'>
                     <div className='col-auto'>
                   <time className='time'>{data?.created_at !== undefined ? new Date(data?.created_at).toLocaleDateString() : "no time"}</time>
                   </div>
                   <div className='col-auto'>
                   <p style={{fontWeight: "bold", color: "#000000"}}>{data?.name}</p>
                   </div>
                   </div>
                   
                   
                   <p style={{ fontSize: "17px", color: "rgb(160, 160, 160)"}}>{data?.description}</p>
                 </div> : <div></div>  } </div>
               )
            
             })
        }
         
         </div>
   


        </Modal.Body>
        <Modal.Footer>

          
        </Modal.Footer>
      </Modal>
     )
    else return (

     
        <Modal show={openModal} onHide={() => setOpenModal(!openModal)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Kommentare</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleSubmit}>
          <label className='labe-form subtitle'>title</label>
                <input
                type='text'
                name="name"
                value={kommentare.name}
                onChange={(e) => sendKommentar(e)}
                className="form-control mb-3 mt-2"/>
                 <label className='labe-form subtitle mt-4'>Inhalt</label>
                <textarea
                
                aria-label='description'
                name="description"
                value={kommentare.description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setKommentare((kommentare) => ({
                  ...kommentare,
                  description: e.target.value,
                }))}
                className="form-control form-control-lg  mb-3 mt-2"
                ></textarea>
                <div className='d-flex align-items-end justify-content-center'>
                <button type='submit' className='btn 'style={{backgroundColor: "#ed1e24", color: "white", fontWeight: "700"}} onClick={() => setOpenModal(!openModal)} >
                  
            Senden
          </button>
          </div>
                </form>
        </Modal.Body>
        <Modal.Footer>

          
        </Modal.Footer>
      </Modal>
    )
}


export default kommentareView;
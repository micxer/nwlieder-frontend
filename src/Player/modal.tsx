import React from "react";
import Modal from "react-bootstrap/Modal";
import Logo from './img.png'
import {Hola, Modalinterface} from '../interfaces';
import "./Player.css"
import { AiFillStepForward, AiFillStepBackward, AiOutlineExpand } from "react-icons/ai";
import { FaStop, FaSpinner } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import AudioProgressBar from "./progressBar";
import { GrClose } from "react-icons/gr";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const Modals:React.FC<Modalinterface> = ({data, boolean,  hideFunction,  modalFunction, setDuration, audioRef, setIsReady, setIsPlaying, isReady, togglePlayPause, isPlaying, setCurrrentProgress, handleBufferProgress,
    duration, currrentProgress, buffered, wechselLied, onPrev, onNext, aktuelLied, durationDisplay, elapsedDisplay, isZoomed, setIsZoomed}) => {

        const toggleZoom = () => setIsZoomed(!isZoomed);
    

    return (
<div>
        <Modal
        dialogClassName="modal-90w"
        show={boolean}
        fullscreen={true}
        onHide={hideFunction}
      
        >
<Modal.Body>
    <div >
    <div className="dvbutton">
    <GrClose onClick={modalFunction} className="close" size={30} color="#a0a0a0"/>
    </div>
<div style={{textAlign: 'center'}}>
    <div className="col-12 d-flex justify-content-center">
{ data[aktuelLied]?.img === "" ?  
      <img className="rounded ms-2 text-center" src={Logo} 
      style={{ width: "50vw",  maxWidth: "80vh", alignItems:"center"}} 
      />
      :
      <TransformWrapper>
      <TransformComponent>
      <img className="rounded ms-2 text-center" src={ data[aktuelLied]?.img}
      
      style={{ maxWidth: "80vh",
      marginLeft: '200px',
       width: '100%',
      maxHeight: '100%',
      cursor: 'zoom-in',
      transition: 'transform 0.25s ease',}} 
    
      />
    </TransformComponent>
    </TransformWrapper>
    }
  
  </div>
<div>
<div className="">
      
<AudioProgressBar
className="hola"
duration={duration}
currentProgress={currrentProgress}
buffered={buffered}
onChange={(e) => {
if (!audioRef.current) return;
audioRef.current.currentTime = e.currentTarget.valueAsNumber;
setCurrrentProgress(e.currentTarget.valueAsNumber);
}}
/>
<div className="timer mb-2">
<span>{elapsedDisplay}</span>
<span>{durationDisplay}</span>
</div>
<div className="controls ">
<button
style={{all: "unset"}}
onClick={onPrev}
disabled={aktuelLied === 0}
>
<AiFillStepBackward className="icon me-5" 

/>
</button>
<button
style={{all: "unset"}}
disabled={!isReady}
onClick={togglePlayPause}
>
{
!isReady && data[aktuelLied] ? (
<FaSpinner size={50}/>

) : !isPlaying   ?  (

<FaPlay size={50}/>
) : (

<FaStop size={50}/>
)}

</button>

<button 
style={{all: "unset"}}
onClick={onNext}
disabled={aktuelLied === - 1}
>
<AiFillStepForward className="icon ms-5"/>
</button>
</div>

</div>

</div>

</div>


<div>
</div>

</div>
</Modal.Body>


</Modal>
</div>
    )
}


export default Modals;
import React from "react";
import "./Player.css"
import Logo from './img.png'
import { FaPause, FaPlaystation } from "react-icons/fa";
import { AiFillStepForward, AiFillStepBackward, AiOutlineExpand, AiOutlineInfoCircle } from "react-icons/ai";
import {Hola, Playerinterface} from '../interfaces'
import { FaStop, FaSpinner } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import AudioProgressBar from "./progressBar";
import { BsChatRightText } from "react-icons/bs";



const PlayerView:React.FC<Playerinterface> = ({data,
   modalFunction, setDuration, audioRef, setIsReady, setIsPlaying, isReady, togglePlayPause, isPlaying, setCurrrentProgress, handleBufferProgress,
   duration, currrentProgress, buffered, wechselLied, onPrev, onNext, songIndex,
    songCount, aktuelLied, durationDisplay, elapsedDisplay, openModal2, setOpenModal2
  }) => {
  
    return (

      <div className="shadow box rounded p-3 mt-2" >
    <div className="d-flex justify-content-center">
      { data[aktuelLied]?.img === undefined ?  
      <img className="rounded ms-2" src={Logo} 
      style={{ width: "30vw",  maxWidth: "50vh", alignItems:"center"}} 
      />
      :  <img className="rounded ms-2" src={ data[aktuelLied]?.img}
      style={{ width: "30vw",  maxWidth: "60vh", alignItems:"center"}} 
      />
    
    }
   
    </div>
    <div className="d-flex justify-content-start">
 
        <AiOutlineExpand onClick={modalFunction} className="expand me-4" size={30} color="#a0a0a0"/>
        <AiOutlineInfoCircle onClick={() => setOpenModal2(!openModal2)} className="expand" size={35} color="#a0a0a0" />

    
    </div>
      

        <div>
        <p className="title mt-4">{data[aktuelLied]?.name}</p>
        </div>

        <div>

      
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
<div className="timer mb-4">
  <span>{elapsedDisplay}</span>
  <span>{durationDisplay}</span>
</div>
  <div className="controls ps-5 pe-5 mb-4">
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
disabled={songIndex === songCount - 1}
>
  <AiFillStepForward className="icon ms-5"/>
  </button>
  </div>



</div>


       
      </div>

    )
}


export default PlayerView
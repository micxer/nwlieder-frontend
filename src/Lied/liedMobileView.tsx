/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import "./lied.css";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import AudioProgressBar from "./progressBar";
import { MdEdit } from "react-icons/md";
import { TbReload, TbRotate360 } from "react-icons/tb";
import { BiSolidCommentDetail } from "react-icons/bi";
import Marquee from "react-fast-marquee";
import { MdForward10, MdReplay10  } from "react-icons/md";
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";
import { HashLoader } from "react-spinners";
import { IoIosInformationCircle } from "react-icons/io";
import { LiedViewInterface } from "../interfaces";
import ReactCardFlip from "react-card-flip";


const LiedMobileView: React.FC<LiedViewInterface> = ({
  data,
  setDuration,
  audioRef,
  setIsReady,
  setIsPlaying,
  isReady,
  togglePlayPause,
  isPlaying,
  setCurrrentProgress,
  handleBufferProgress,
  duration,
  currrentProgress,
  buffered,
  songIndex,
  songCount,
  durationDisplay,
  elapsedDisplay,
  audio,
  setAudio,
  setOpenModal,
  setOpenModalKommentare,
  functionTenMinus,
  functionTenMore,
  onPrev,
  onNext,
  vorgehen,
  informationsModal,
  setInformationsModal,
  level,
  all_images
}) => {
  const datei = data[0];

  const reload = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAudio("");
    setIsPlaying(false);
  };

  const hola = datei?.audios?.length === undefined ? 0 : datei.audios.length;


  useEffect(() => {
    if (datei?.audios?.length === 1) {
      setAudio(datei?.audios[0]);

    }
    else if (hola > 1 ) {
      audioRef?.current?.pause()
      setAudio("");
      
    }
  }, [datei?.id, audioRef, datei?.audios, hola, setAudio ]);

  const [flipped1, setFlipped1] = useState<boolean | undefined>(undefined);
  const [flipped2, setFlipped2] = useState<boolean | undefined>(undefined);
  const [imageNumber, setImageNumber] = useState(all_images.length )


  const changeFlipp  = async (e: number) => {
    
     setImageNumber(imageNumber - e)
  
  }

  let more_than_number = all_images.length > 1;


  useEffect( ()  =>  {
        

    if (imageNumber === 4 ) {
      setFlipped1(undefined)
           setFlipped2(true)
   }
      else if(imageNumber === 3 ) {
       setFlipped1(undefined)
      setFlipped2(false)
      
      }
      else if(imageNumber === 2 ) {
        setFlipped1(false)
       setFlipped2(undefined)
       
       }
       else if(imageNumber === 1 ) {
        setFlipped1(true)
       setFlipped2(undefined)
       
       }
      else if(imageNumber === 0) {

        setImageNumber(all_images.length)
        
      }

  }, [ imageNumber])

  return (
    <div>
      <div className="container">
        <div className="d-flex justify-content-center align-items-center">
        { 
          imageNumber === 1 || imageNumber === 2?         
          <ReactCardFlip isFlipped={flipped1} flipDirection="horizontal" >
          <div>
            
          <TransformWrapper>
            <TransformComponent>
              <img
                className="rounded "
                src={all_images[0]}
                style={{
                  maxWidth: "80vh",
                  width: "100%",
                  maxHeight: "100%",
                  cursor: "zoom-in",
                  transition: "transform 0.25s ease",
                }}
              />
            </TransformComponent>
          </TransformWrapper>
        </div>
        <div>
        <TransformWrapper>
            <TransformComponent>
              <img
                className="rounded "
                src={all_images[1]}
                style={{
                  maxWidth: "80vh",
                  width: "100%",
                  maxHeight: "100%",
                  cursor: "zoom-in",
                  transition: "transform 0.25s ease",
                }}
              />
            </TransformComponent>
          </TransformWrapper>
        </div>
      
        </ReactCardFlip> :  imageNumber === 3 || imageNumber === 4 ? 
         <ReactCardFlip isFlipped={flipped2} flipDirection="horizontal" >
         <div>
           
      
         <TransformWrapper>
            <TransformComponent>
              <img
                className="rounded "
                src={all_images[2]}
                style={{
                  maxWidth: "80vh",
                  width: "100%",
                  maxHeight: "100%",
                  cursor: "zoom-in",
                  transition: "transform 0.25s ease",
                }}
              />
            </TransformComponent>
          </TransformWrapper>
          
          
         
       </div>
       <div>
       <TransformWrapper>
            <TransformComponent>
              <img
                className="rounded "
                src={all_images[3]}
                style={{
                  maxWidth: "80vh",
                  width: "100%",
                  maxHeight: "100%",
                  cursor: "zoom-in",
                  transition: "transform 0.25s ease",
                }}
              />
            </TransformComponent>
          </TransformWrapper>
       </div>
     
       </ReactCardFlip> 
      : <div/>
        }
    
        </div>
      </div> 

<div className="bar">
  <div className="mb-2 d-flex justify-content-start">
  <IoIosInformationCircle  className="selection-anders ms-3"
          onClick={() => setInformationsModal(!informationsModal)} size={35} />
                 {
        !more_than_number || all_images[1] === "" ? <div/> :
        <button  className="rotate shadow-sm ms-3">
        <TbRotate360 className=""  size={30}  onClick={ () => changeFlipp(1)} />
        </button>
   
}
  </div>
     

      <div className=" fuerte p-3">
        <div className=" ">
         
        
        
         
          

          <div className="row titles">
            <div className=" mt-1 ">
              <div className="row d-flex justify-content-around">
                <div className="col-7">
                  <div className="row ">
                    <div className=" d-flex justify-content-start">
                      <div>
                        <p
                          className="portMobile  "
                          style={{ alignItems: "center" }}
                        >
                          {datei?.name?.length && datei?.name?.length > 23 ? (
                            <div>
                          
                           <p style={{fontSize: "17px", marginBottom: "0"}}> {datei?.name}</p>  
                      
                           
                            </div>
                          ) : (
                            datei?.name
                          )}
                        </p>
                        {/* <p style={{color: "gray"}}>{datei?.etappe}</p> */}
                      </div>
                      {datei?.audios?.length === 1 ||
                      datei?.audios?.length === undefined ? (
                        <div />
                      ) : (
                        <div className="ms-2">
                          <button onClick={reload} style={{ all: "unset" }}>
                            {" "}
                            <TbReload size={25} color="#ed1e24" />{" "}
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="bearbeitung col-auto ">
                <div className="d-flex justify-content-center align-items-center">
                  {
                    level === "admin" ?   <button
                    className="positionb selectionMobile "
                    onClick={() => setOpenModal(true)}
                  >
                   
                      <MdEdit size={23} />
                   
                  </button> : <div/>
                  }
                

                  <button
                    className=" selectionMobile ms-3"
                    onClick={() => setOpenModalKommentare(true)}
                  >
                  
                      <BiSolidCommentDetail size={20} />
                    
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="col-auto">
              {audio === "" ? (
                <div className="row justify-content-center mt-3">
                 
                  <div className="d-flex justify-content-center col-auto text-center">
                  {datei?.audios === undefined || null ? (
                    <HashLoader color="red" size={40}/>
                  ) : datei?.audios?.length > 1 ? (
                    datei?.audios?.map((data, index) => (
                      <div className="">
                        {data === "" ? <div/> : 
                        
                      <button
                      
                        className="ms-3 selectionMobile  "
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                          setAudio(data)
                        }
                      >
                        V{index + 1}
                      </button>
                     
}
                      </div>
                    ))
                  ) : (
                    <div className="d-flex justify-content-center text-center">
                       <button style={{ all: "unset" }}>
                     <TbPlayerTrackPrevFilled onClick={onPrev} className="icon me-3"  color="#ed1e24" size={30} />
                   </button>
                   <p className="pt-3">Kein Audio</p>
                   <button
                    style={{ all: "unset" }}
                    disabled={songIndex === songCount - 1}
                  >
                    <TbPlayerTrackNextFilled onClick={onNext} className="icon ms-3"  color="#ed1e24" size={30} />
                  </button>
                   
                      </div>
                  )}{" "}
                  </div>{" "}
                </div>
              ) : (
                <div className="col">
                  <div className="d-flex justify-content-center">
              
                    <div className="col-auto mt-2">
                      <AudioProgressBar
                        className="input-range-mobile"
                        duration={duration}
                        currentProgress={currrentProgress}
                        buffered={buffered}
                        onChange={(e) => {
                          if (!audioRef.current) return;
                          audioRef.current.currentTime =
                            e.currentTarget.valueAsNumber;
                          setCurrrentProgress(e.currentTarget.valueAsNumber);
                        }}
                      />
                    </div>
                  </div>
                  <div className="d-flex justify-content-around text-center">
                    <div className="col timer me-5">
                      <span>{elapsedDisplay}</span>
                    </div>
                    <div className="timer col ms-5">
                      <span>{durationDisplay}</span>
                    </div>
                  </div>
                  <div className="text-center "> 
                     <button style={{ all: "unset" }}>
                     <TbPlayerTrackPrevFilled onClick={onPrev} className="icon me-3"  color="#ed1e24" size={30} />
                   </button>
                  
                 
                  <button style={{all: "unset"}}>
                    <MdReplay10 onClick={functionTenMinus} className="icon me-3"  color="#ed1e24" size={30}/>
                  </button>
                 
                    <button
                      style={{ all: "unset" }}
                      disabled={!isReady}
                      onClick={togglePlayPause}
                    >
                      {!isReady  ? (
                        <HashLoader color="red" size={35} className="ms-3 me-3 " />
                      ) : !isPlaying ? (
                        <FaCirclePlay color="#ed1e24" size={50} />
                      ) : (
                        <FaCirclePause color="#ed1e24" size={50} />
                      )}
                    </button>
                    <button style={{all: "unset"}}>
                    <MdForward10 onClick={functionTenMore} className="icon ms-3"  color="#ed1e24" size={30}/>
                  </button>
                  <button
                    style={{ all: "unset" }}
                    disabled={songIndex === songCount - 1}
                  >
                    <TbPlayerTrackNextFilled onClick={onNext} className="icon ms-3"  color="#ed1e24" size={30} />
                  </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <audio
            onTimeUpdate={(e) => {
              setCurrrentProgress(e.currentTarget.currentTime);
              handleBufferProgress(e);
            }}
            onProgress={handleBufferProgress}
            ref={audioRef}
            onDurationChange={(e) => setDuration(e.currentTarget.duration)}
            onCanPlay={() => setIsReady(true)}
            onPlaying={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            src={audio}
            autoPlay

          ></audio>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LiedMobileView;

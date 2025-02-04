/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { LiedViewInterface } from "../interfaces";
import "./lied.css";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import AudioProgressBar from "./progressBar";
import { MdEdit } from "react-icons/md";
import { BiSolidCommentDetail } from "react-icons/bi";
import {
  TbPlayerTrackNextFilled,
  TbPlayerTrackPrevFilled,
} from "react-icons/tb";
import Marquee from "react-fast-marquee";
import { MdForward10, MdReplay10 } from "react-icons/md";
import { TbReload } from "react-icons/tb";
import { HashLoader } from "react-spinners";
import { IoIosInformationCircle } from "react-icons/io";
import ReactCardFlip from 'react-card-flip';
import { TbRotate360 } from "react-icons/tb";

const LiedView: React.FC<LiedViewInterface> = ({
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
  level,
  onNext,
  onPrev,
  functionTenMinus,
  functionTenMore,
  informationsModal,
  setInformationsModal,
  all_images,
}) => {
  const datei = data[0];
  const hola = datei?.audios?.length === undefined ? 0 : datei.audios.length;
  const navigate = useNavigate();

  useEffect(() => {
    if (datei?.audios?.length === 1) {
      setAudio(datei?.audios[0]);
    } else if (hola > 1) {
      audioRef?.current?.pause();
      setAudio("");
    }
  }, [datei?.id]);

  const reload = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAudio("");
    setIsPlaying(false);
  };

  const [flipped1, setFlipped1] = useState<boolean | undefined>(undefined);
  const [flipped2, setFlipped2] = useState<boolean | undefined>(undefined);
  const [imageNumber, setImageNumber] = useState(all_images.length)


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
    
      <div className="container"></div>

    

{/* <div className="fuerte2 ms-2">
  <p style={{fontWeight: "bold", fontSize: "120%"}} >
    { datei?.liturgisch === null ? <div/> :
  <button style={{all: "unset"}} onClick={() => navigate(`/home`, {
    state: {
      filterLiturgisch: datei?.liturgisch
    }
  })}> {datei?.liturgisch}  </button>
}

{
  datei?.thematisch === null ? <div/> :
  <button style={{all: "unset"}} onClick={() => navigate(`/home`, {
    state: {
      filterThematisch: datei?.liturgisch
  }})} >{`- ${datei?.thematisch}`}</button> 
}
    </p>

</div> */}
      <div className="bar">
        <div className="col-2 buttons mb-3 d-flex justify-content-start">
        <IoIosInformationCircle  className="selection-anders ms-3"
          onClick={() => setInformationsModal(!informationsModal)} size={45} />
             {
        !more_than_number || all_images[1] === "" ? <div/> :
        <button  className="rotate shadow-sm ms-3">
        <TbRotate360 className=""  size={30}  onClick={ () => changeFlipp(1)} />
        </button>
   
}
          </div>
      <div className="border rounded fuerte  p-2 pt-3 pb-3">
        <div>
         
        </div>
        <div className="col row d-flex justify-content-between">
          <div className="row titles col-3 ms-1">
            <div className=" d-flex align-items-center ">
              <p>
                <p className="port mb-0">
                  {datei?.name?.length && datei?.name?.length > 30 ? (
                    
               <p style={{marginBottom: "0"}}>       {datei?.name} </p>
       
                  ) : (
                    datei?.name
                  )}
                </p>

              </p>
            </div>
            {/* <div className="col-auto">
                  <button onClick={reload} style={{ all: "unset" }}>
                    {" "}
                    <TbReload size={25} color="#ed1e24" />{" "}
                  </button>
                </div> */}
          </div>

          <div className="player col-auto">
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
                        className="ms-3 selection"
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
                    <div className="d-flex justify-content-center">
                        <button style={{ all: "unset" }}>
                    <TbPlayerTrackPrevFilled
                      onClick={onPrev}
                      className="icon me-3"
                      color="#ed1e24"
                      size={30}
                    />
                  </button>
                      <p className="mt-3">Kein Audio</p>
                      <button
                    style={{ all: "unset" }}
                    disabled={songIndex === songCount - 1}
                  >
                    <TbPlayerTrackNextFilled
                      onClick={onNext}
                      className="icon ms-3"
                      color="#ed1e24"
                      size={30}
                    />
                  </button>
                       </div>
                  )}{" "}
                </div>{" "}
              </div>
            ) : (
              <div className="col ">
                <div className="text-center mb-1">
                  <button style={{ all: "unset" }}>
                    <TbPlayerTrackPrevFilled
                      onClick={onPrev}
                      className="icon me-3"
                      color="#ed1e24"
                      size={30}
                    />
                  </button>
                  <button style={{ all: "unset" }}>
                    <MdReplay10
                      onClick={functionTenMinus}
                      className="icon me-3"
                      color="#ed1e24"
                      size={30}
                    />
                  </button>
                  <button
                    style={{ all: "unset" }}
                    disabled={!isReady}
                    onClick={togglePlayPause}
                  >
                    {!isReady && data ? (
                      <HashLoader color="red" size={35} className="ms-3 me-3 " />
                    ) : isPlaying === false ? (
                      <FaCirclePlay color="#ed1e24" size={40} />
                    ) : (
                      <FaCirclePause color="#ed1e24" size={40} />
                    )}
                  </button>
                  <button style={{ all: "unset" }}>
                    <MdForward10
                      onClick={functionTenMore}
                      className="icon ms-3"
                      color="#ed1e24"
                      size={30}
                    />
                  </button>
                  <button
                    style={{ all: "unset" }}
                    disabled={songIndex === songCount - 1}
                  >
                    <TbPlayerTrackNextFilled
                      onClick={onNext}
                      className="icon ms-3"
                      color="#ed1e24"
                      size={30}
                    />
                  </button>
                 
                    {datei?.audios?.length === 1 ||
                    datei?.audios?.length === undefined ? (
                      <div />
                    ) : (
                      <button className="ms-3" onClick={reload} style={{ all: "unset" }}>
                        {" "}
                        <TbReload size={25} color="#ed1e24" />{" "}
                      </button>
                    )}
                  </div>
              

                <div className="col-auto row d-flex justify-content-center">
                  <div className="col-auto timer d-flex ">
                    <span>{elapsedDisplay}</span>
                  </div>

                  <div className="col-auto">
                    <AudioProgressBar
                      className="input-range"
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
                  <div className="timer col-auto">
                    <span>{durationDisplay}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className=" col-auto d-flex justify-content-center align-items-center me-1">
          
            {level === "admin" ? (
              <button className=" selection" onClick={() => setOpenModal(true)}>
                <div className="d-flex justify-content-center align-items-center">
                  <MdEdit />
                </div>
              </button>
            ) : (
              <div />
            )}
          
            <button
              className=" selection ms-3"
              onClick={() => setOpenModalKommentare(true)}
            >
              <div className="d-flex justify-content-center align-items-center">
                <BiSolidCommentDetail />
              </div>
            </button>
       
       
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

export default LiedView;

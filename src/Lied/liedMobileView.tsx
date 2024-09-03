import React, { useEffect } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Hola } from "../interfaces";
import "./lied.css";
import { FaSpinner } from "react-icons/fa";
import { FaCirclePause, FaCirclePlay } from "react-icons/fa6";
import AudioProgressBar from "./progressBar";
import { MdEdit } from "react-icons/md";
import { TbReload } from "react-icons/tb";
import { BiSolidCommentDetail } from "react-icons/bi";
import Marquee from "react-fast-marquee";
import { MdForward10, MdReplay10  } from "react-icons/md";
import { TbPlayerTrackNextFilled, TbPlayerTrackPrevFilled } from "react-icons/tb";

interface liedView {
  data: Hola[];
  setDuration: React.Dispatch<React.SetStateAction<number>>;
  audioRef: React.RefObject<HTMLAudioElement>;
  setIsReady: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  isReady: boolean;
  togglePlayPause: () => void;
  isPlaying: boolean;
  setCurrrentProgress: React.Dispatch<React.SetStateAction<number>>;
  handleBufferProgress: React.ReactEventHandler<HTMLAudioElement>;
  duration: number;
  currrentProgress: number;
  buffered: number;
  songIndex: number;
  songCount: number;
  durationDisplay: string;
  elapsedDisplay: string;
  vorgehen: number;
  functionTenMinus: () => void;
  functionTenMore: () => void;
  onPrev: () => (() => void) | undefined;
  onNext: () => Promise<(() => void) | undefined>;
  audio: string;
  setAudio: React.Dispatch<React.SetStateAction<string>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModalKommentare: React.Dispatch<React.SetStateAction<boolean>>;
}

const LiedMobileView: React.FC<liedView> = ({
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
  vorgehen
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
  }, [datei?.id]);

  return (
    <div>
      <div className="container">
        <div className="d-flex justify-content-center align-items-center">
          <TransformWrapper>
            <TransformComponent>
              <img
                className="rounded "
                src={datei?.img}
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
      </div>

      <div className="fuerte2Mobile ms-2">
      <p style={{fontWeight: "bold", fontSize: "100%"}} >
    {datei?.liturgisch} {`- ${datei?.thematisch}`}
    
    </p>
      </div>

      <div className="  fuerte p-3">
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
                            <Marquee speed={30}>
                              {datei?.name}&nbsp;&nbsp;&nbsp;
                            </Marquee>
                          ) : (
                            datei?.name
                          )}
                        </p>
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
                  <button
                    className="positionb selectionMobile"
                    onClick={() => setOpenModal(true)}
                  >
                    <div className="d-flex justify-content-center align-items-center">
                      <MdEdit size={23} />
                    </div>
                  </button>

                  <button
                    className=" selectionMobile ms-3"
                    onClick={() => setOpenModalKommentare(true)}
                  >
                    <div className="d-flex justify-content-center align-items-center">
                      <BiSolidCommentDetail size={20} />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="container">
            <div className="col-auto">
              {audio === "" ? (
                <div className="d-flex justify-content-center mt-3">
                 
                  <div className="col-auto text-center">
                    {datei?.audios === null ? (
                      <div>no hay cantos </div>
                    ) : (
                      datei?.audios?.map((data, index) => (
                        <button
                          className="ms-3 selection"
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                            setAudio(data)
                          }
                        >
                          V{index + 1}
                        </button>
                      ))
                    )}{" "}
                  </div>{" "}
                </div>
              ) : (
                <div className="col">
                  <div className="d-flex justify-content-center">
              
                    <div className="col-auto">
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
                      {!isReady && data ? (
                        <FaSpinner size={40} />
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

          ></audio>
        </div>
      </div>
    </div>
  );
};

export default LiedMobileView;

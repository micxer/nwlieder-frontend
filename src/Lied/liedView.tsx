import React, { useEffect } from "react";
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

  return (
    <div>
      <div className="d-flex justify-content-center align-items-center">
        <TransformWrapper>
          <TransformComponent>
            <img
              className="text-align-center"
              src={datei?.img}
              style={{
                maxWidth: "85vh",
                width: "100%",
                maxHeight: "100%",
                cursor: "zoom-in",
                transition: "transform 0.25s ease",
              }}
            />
          </TransformComponent>
        </TransformWrapper>
      </div>
      <div className="container"></div>

<div className="fuerte2 ms-2">
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

</div>
      <div className="border rounded fuerte p-2 pt-3 pb-3">
        <div>
         
        </div>
        <div className="col row d-flex justify-content-between">
          <div className="row titles col-3 ms-1">
            <div className=" d-flex align-items-center ">
              <p>
                <p className="port mb-0">
                  {datei?.name?.length && datei?.name?.length > 30 ? (
                    <Marquee speed={30}>
                      {datei?.name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Marquee>
                  ) : (
                    datei?.name
                  )}
                </p>

                <button onClick={() => {navigate(`/home`, {
                  state: { filterEtappe: datei?.etappe }
                })}} className="mb-0" color="gray" style={{ all: "unset" }}>
                  {datei?.etappe}
                </button>
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
                    <div />
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

          <div className="bearbeitung col-auto d-flex justify-content-center align-items-center me-1">
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
              className=" selection ms-4"
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
          ></audio>
        </div>
      </div>
    </div>
  );
};

export default LiedView;

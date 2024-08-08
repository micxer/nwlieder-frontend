import React, { useEffect, useState } from "react";
import LiedView from "./liedView";
import { useParams, useLocation } from "react-router-dom";
import { Hola, audioPlayerProps } from "../interfaces";
import Editieren from "../Editieren/editieren";
import Kommentare from "../Kommentare/kommentare";
import MediaQuery from "react-responsive";
import LiedMobileView from "./liedMobileView";

const Lied: React.FC = ({}, props: audioPlayerProps) => {
  const { id } = useParams();

  const location = useLocation();

  const status = location.state?.infoToLied?.level.toString();
  const ids = location.state?.infoToLied?.ids;

  const hola = ids.map((dateien: Hola) => dateien.id);

  const newId = Number(id);
  const kommentarrolle: string = "schauen";

  const take = hola.indexOf(newId);

  const [data, setData] = useState<Hola[]>([]);
  const { songIndex, songCount } = props;



  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currrentProgress, setCurrrentProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [audio, setAudio] = useState("");
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const [openModalKommentare, setOpenModalKommentare] = useState(false);
  const [aktuelLied, setAktuelLied] = useState<number>(take);
  const [level, setLevel] = useState<string>(status);
  const [levelKommentare, setLevelKommentare] = useState("normal");

  const [vorgehen, setVorgehen] = useState(0);

  const UsehandleButtonClick = () => {
    setVorgehen(1);
  };

  const functionTenMinus = async () => {
    await setVorgehen(-1);
  };

  const tosearch = hola[aktuelLied];


  const getLied = async () => {
    try {
      const url = `${process.env.REACT_APP_API_URL}/lied/${tosearch}`;
      const response = await fetch(url);
      const dataResponse = await response.json();

      setData(dataResponse);
      return dataResponse;
    } catch (error) {
      console.log(error);
    }
  };
 

  const formatDurationDisplay = (duration: number) => {
    const min = Math.floor(duration / 60);
    const sec = Math.floor(duration - min * 60);

    const formatted = [min, sec].map((n) => (n < 10 ? "0" + n : n)).join(":");

    return formatted;
  };

  const durationDisplay = formatDurationDisplay(duration);
  const elapsedDisplay = formatDurationDisplay(currrentProgress);

  const handleBufferProgress: React.ReactEventHandler<HTMLAudioElement> = (
    e
  ) => {
    const audio = e.currentTarget;
    const dur = audio.duration;
    if (dur > 0) {
      for (let i = 0; i < audio.buffered.length; i++) {
        if (
          audio.buffered.start(audio.buffered.length - 1 - i) <
          audio.currentTime
        ) {
          const bufferedLength = audio.buffered.end(
            audio.buffered.length - 1 - i
          );
          setBuffered(bufferedLength);
          break;
        }
      }
    }
  };

  const onPrev = () => {
    try {
      if (aktuelLied === 0) {
        setAktuelLied(aktuelLied);
      } else {
        setAktuelLied((prev) => (prev - 1) % hola.length);
      }

      audioRef.current?.pause();
      const timeout = setTimeout(() => {
        if (audioRef) {
          audioRef.current?.play();
        }
      }, 500);
      return () => {
        clearTimeout(timeout);
      };
    } catch (error) {
      console.log(`onPrev ${error}`);
    }
  };


  const onNext = async () => {
    try {
      setAktuelLied((prev) => (prev + 1) % hola.length);

      audioRef.current?.pause();
      const timeout = setTimeout(() => {
        if (audioRef) {
          //  audioRef.current?.play();
        }
      }, 500);
      return () => {
        clearTimeout(timeout);
      };
    } catch (error) {
      console.log(`onNext ${error}`);
    }
  };

  const audioRef = React.useRef<HTMLAudioElement>(null);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      audioRef.current?.play();
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    getLied();
  }, [tosearch]);

  useEffect(() => {
    getLied();

    audioRef.current?.pause();

    const timeout = setTimeout(() => {
      if (audioRef && isPlaying) {
        audioRef.current?.play();
      }
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [id]);

  // useEffect(() => {
  //   if (audio === "") {
  //     audioRef.current?.pause();
  //   } else audioRef.current?.play();
  // }, [audio]);

  useEffect(() => {
    if (vorgehen === 1) {
      if (audioRef.current) {
        audioRef.current.currentTime = audioRef.current.currentTime + 10;
      }

      setTimeout(() => setVorgehen(0), 500);
    } else if (vorgehen === -1) {
      if (audioRef.current) {
        audioRef.current.currentTime = audioRef.current.currentTime - 10;
      }
      setTimeout(() => setVorgehen(0), 500);
    }
  }, [vorgehen]);

  return (
    <div>
      {
        level === "" ? <div/> :
      <div>
      <MediaQuery minWidth={1224}>
        <LiedView
          level={level}
          data={data}
          setDuration={setDuration}
          audioRef={audioRef}
          setIsReady={setIsReady}
          setIsPlaying={setIsPlaying}
          isReady={isReady}
          togglePlayPause={togglePlayPause}
          isPlaying={isPlaying}
          setCurrrentProgress={setCurrrentProgress}
          handleBufferProgress={handleBufferProgress}
          duration={duration}
          currrentProgress={currrentProgress}
          buffered={buffered}
          songIndex={songIndex}
          songCount={songCount}
          durationDisplay={durationDisplay}
          elapsedDisplay={elapsedDisplay}
          audio={audio}
          setAudio={setAudio}
          setOpenModal={setOpenModalEdit}
          setOpenModalKommentare={setOpenModalKommentare}
          onPrev={onPrev}
          functionTenMinus={functionTenMinus}
          functionTenMore={UsehandleButtonClick}
          onNext={onNext}
          vorgehen={vorgehen}
        />
      </MediaQuery>
      <MediaQuery maxWidth={1224}>
        <LiedMobileView
          data={data}
          setDuration={setDuration}
          audioRef={audioRef}
          setIsReady={setIsReady}
          setIsPlaying={setIsPlaying}
          isReady={isReady}
          togglePlayPause={togglePlayPause}
          isPlaying={isPlaying}
          setCurrrentProgress={setCurrrentProgress}
          handleBufferProgress={handleBufferProgress}
          duration={duration}
          currrentProgress={currrentProgress}
          buffered={buffered}
          songIndex={songIndex}
          songCount={songCount}
          durationDisplay={durationDisplay}
          elapsedDisplay={elapsedDisplay}
          audio={audio}
          setAudio={setAudio}
          setOpenModal={setOpenModalEdit}
          setOpenModalKommentare={setOpenModalKommentare}
          onPrev={onPrev}
          functionTenMinus={functionTenMinus}
          functionTenMore={UsehandleButtonClick}
          onNext={onNext}
          vorgehen={vorgehen}
        />
      </MediaQuery>

      <Editieren
        openModal={openModalEdit}
        setOpenModal={setOpenModalEdit}
        aktuelLied={aktuelLied}
        data={data}
        id={tosearch?.toString()}
        setAktuelLied={setAktuelLied}
      />

      <Kommentare
        openModal={openModalKommentare}
        setOpenModal={setOpenModalKommentare}
        aktuelLied={parseInt(tosearch)}
        data={data}
        level={levelKommentare}
        specificAudio={audio}
        kommentarrolle={kommentarrolle}
      />
      </div>
      }
    </div>
  );
};

export default Lied;

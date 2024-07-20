import React, { useEffect, useState } from "react";
import PlayerView from "./PlayerView";
import Modal from "./modal";
import { Hola, audioPlayerProps } from "../interfaces";
import Kommentare from "../Kommentare/kommentare";

interface Playerinfo {
  id: string;
  wechselLied?: boolean;
  data: Hola[];
  aktuelLied: number;
  setAktuelLied: React.Dispatch<React.SetStateAction<number>>;
}

const Player: React.FC<Playerinfo> = (
  { id, wechselLied, data, setAktuelLied, aktuelLied },
  props: audioPlayerProps
) => {
  const { songIndex, songCount } = props;

  const [openModal, setOpenModal] = useState(false);
  const [duration, setDuration] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currrentProgress, setCurrrentProgress] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [kommentareModal, setKommentareModal] = useState(false);
  const [level, setLevel] = useState("");

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
      setAktuelLied((prev) => (prev - 1) % data.length);
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
      console.log(`onNext ${error}`);
    }
  };
  const onNext = async () => {
    try {
      setAktuelLied((prev) => (prev + 1) % data.length);
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

  const modalFunction = async () => {
    setOpenModal(!openModal);
    setLevel("normal");
  };

  console.log(aktuelLied);

  useEffect(() => {
    setAktuelLied(parseInt(id));

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

  return (
    <div>
      <PlayerView
        boolean={openModal}
        hideFunction={modalFunction}
        data={data}
        modalFunction={modalFunction}
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
        wechselLied={wechselLied}
        onPrev={onPrev}
        onNext={onNext}
        songIndex={songIndex}
        songCount={songCount}
        aktuelLied={aktuelLied}
        durationDisplay={durationDisplay}
        elapsedDisplay={elapsedDisplay}
        openModal2={kommentareModal}
        setOpenModal2={setKommentareModal}
      />

    </div>
  );
};

export default Player;

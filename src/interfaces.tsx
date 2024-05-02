export interface Hola {
  lenght(lenght: any): void;

  id?: number;
  name?: string;
  create_at?: Date;
  description?: string;
  favorite?: boolean;
  img?: string;
  audios?: string[];
  etappe?: string;
  liedtext?: string;
}

export interface KommentareInfo {
  map(arg0: (data2: any) => void): any;
  id?: number;
  name?: string;
  created_at?: Date;
  description?: string;
  lied_id?: number;
  audio_id: string;
}

export interface audioPlayerProps {
  currentSong?: { title: string; src: string };
  songIndex: number;
  songCount: number;
  onNext: () => void;
  onPrev: () => void;
}

export interface Playerinterface {
  data: Hola[];
  modalFunction: () => Promise<void>;
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
  wechselLied?: boolean;
  onNext: () => void;
  onPrev: () => void;
  songIndex: number;
  songCount: number;
  aktuelLied: number;
  durationDisplay: string;
  elapsedDisplay: string;
  boolean: boolean;
  hideFunction: () => Promise<void>;
  openModal2: boolean;
  setOpenModal2: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface Modalinterface {
  data: Hola[];
  modalFunction: () => Promise<void>;
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
  wechselLied?: boolean;
  onNext: () => void;
  onPrev: () => void;
  songIndex: number;
  songCount: number;
  aktuelLied: number;
  durationDisplay: string;
  elapsedDisplay: string;
  boolean: boolean;
  hideFunction: () => Promise<void>;
  isZoomed: boolean;
  setIsZoomed: React.Dispatch<React.SetStateAction<boolean>>;
}

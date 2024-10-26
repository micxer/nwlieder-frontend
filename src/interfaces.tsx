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
  liturgisch?: string[];
  thematisch?: string[];
  secondary_images?: string[];
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
  lenght(lenght: any): void;

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


export interface LiedViewInterface {
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
  vorgehen: number;
  currrentProgress: number;
  buffered: number;
  songIndex: number;
  songCount: number;
  durationDisplay: string;
  elapsedDisplay: string;
  audio: string;
  functionTenMinus: () => void;
  functionTenMore: () => void;
  setAudio: React.Dispatch<React.SetStateAction<string>>;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModalKommentare: React.Dispatch<React.SetStateAction<boolean>>;
  level: string;
  onPrev: () => (() => void) | undefined;
  onNext: () => Promise<(() => void) | undefined>;
  setInformationsModal: React.Dispatch<React.SetStateAction<boolean>>;
  informationsModal: boolean;
  all_images: string[];
}
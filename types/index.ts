import { StaticImageData } from 'next/image';
import { Dispatch, SetStateAction } from 'react';

type TracksData = {
  name: string;
  artist: string;
  img: string;
};

export type PhotoCardData = {
  id: number;
  name: string;
  age: number;
  desc: string;
  photos: string[];
};

export type PhotoCardProps = {
  data: PhotoCardData;
  active: boolean;
  removeCard: (id: number, action: 'right' | 'left') => void;
  // getExit: (setState: Dispatch<SetStateAction<number>>) => void;
  // exitX: number;
  // setExitX: (newExit: number) => void;
};

export type IActionBtnsProps = {
  triggerSwipeLeft: () => void;
  triggerSwipeRight: () => void;
  removeCard: (id: number, action: 'right' | 'left') => void;
  
  // id: number;
};
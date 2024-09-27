import { StaticImageData } from 'next/image';
import { Dispatch, SetStateAction } from 'react';
import { DogType } from '@/model/dog-model';
import { Schema } from 'mongoose';

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
  data: DogType;
  active: boolean;
  onDeck: boolean;
  removeCard: (id: Schema.Types.ObjectId, action: 'right' | 'left') => void;
};

export type IActionBtnsProps = {
  triggerSwipeLeft: () => void;
  triggerSwipeRight: () => void;
  removeCard: (id: Schema.Types.ObjectId, action: 'right' | 'left') => void;
};
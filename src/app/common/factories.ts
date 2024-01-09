import { IMusic } from './../Interfaces/IMusics';
import { IArtist } from "../Interfaces/IArtist";

export function newArtist(): IArtist {
  return {
    id: '',
    imageUrl: '',
    name: '',
  };
}

export function newMusic(): IMusic{
  return {
    id: '',
    title: '',
    artists: [],
    album: {
      id: '',
      imageUrl: '',
      name: ''
    },
    time: ''
  }
}
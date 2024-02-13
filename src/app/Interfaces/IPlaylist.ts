import { IMusic } from "./IMusics";

export interface IPlaylist{
    id: string,
    name: string,
    imageUrl: string,
    musics?: IMusic[]
}